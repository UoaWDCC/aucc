terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "ap-southeast-2"
}

variable "environment" {
  type        = string
  description = "Environment for the CMS"

  validation {
    condition     = can(regex("^(staging|production)$", var.environment))
    error_message = "Environment must be either 'staging' or 'production'"
  }
}

variable "default_ttl" {
  description = "Default TTL for CloudFront cache"
  default     = 86400
}

variable "price_class" {
  type = string
  description = "Price class for CloudFront distribution"

  validation {
    condition     = can(regex("^(PriceClass_100|PriceClass_200|PriceClass_All)$", var.price_class))
    error_message = "Price class must be one of 'PriceClass_100', 'PriceClass_200', or 'PriceClass_All'"
  }
}

variable "cors_allowed_origins" {
  type        = list(string)
  description = "List of allowed origins for CORS configuration"
}

locals {
  s3_origin_id = "aucc-payload-cms-media-origin"
}

# S3 bucket for payload media content
resource "aws_s3_bucket" "media_bucket" {
  bucket = "aucc-payload-bucket=${var.environment}"

  tags = {
    Name        = "Payload CMS Media Bucket"
    Environment = var.environment
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CORS configuration for CMS uploads
resource "aws_s3_bucket_cors_configuration" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    allowed_origins = var.cors_allowed_origins
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Create Origin Access Control for CloudFront
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "aucc-payload-cms-oac"
  description                       = "OAC for AUCC Payload CMS media bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.media_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.media_distribution.arn
          }
        }
      }
    ]
  })
}

# CloudFront distribution optimized for media content
resource "aws_cloudfront_distribution" "media_distribution" {
  origin {
    domain_name              = aws_s3_bucket.media_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "AUCC Payload CMS Media Distribution"
  default_root_object = "index.html"

  # Replace with your actual domain
  # aliases = ["media.yourdomain.com"]

  # Default cache behavior optimized for images
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    compress = true

    cache_policy_id          = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
    origin_request_policy_id = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # CORS-S3Origin

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = var.default_ttl
    max_ttl                = 31536000 # 1 year max cache
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = var.environment
    Service     = "AUCC-PayloadCMS"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    # For production with custom domain:
    # acm_certificate_arn      = "arn:aws:acm:us-east-1:xxxx:certificate/xxxx"
    # ssl_support_method       = "sni-only"
    # minimum_protocol_version = "TLSv1.2_2021"
  }
}

# IAM user for Payload CMS to access S3 bucket
resource "aws_iam_user" "payload_cms_user" {
  name = "aucc-payload-cms-s3-user-${var.environment}"
  
  tags = {
    Name        = "AUCC Payload CMS S3 User"
    Environment = var.environment
  }
}

# Access keys for the IAM user
resource "aws_iam_access_key" "payload_cms_user" {
  user = aws_iam_user.payload_cms_user.name
}

# IAM policy for Payload CMS S3 access
resource "aws_iam_policy" "payload_cms_s3_policy" {
  name        = "aucc-payload-cms-s3-policy-${var.environment}"
  description = "Policy for AUCC Payload CMS to access S3 media bucket"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.media_bucket.arn,
          "${aws_s3_bucket.media_bucket.arn}/*"
        ]
      }
    ]
  })
}

# Attach policy to IAM user
resource "aws_iam_user_policy_attachment" "payload_cms_user_policy" {
  user       = aws_iam_user.payload_cms_user.name
  policy_arn = aws_iam_policy.payload_cms_s3_policy.arn
}

# Output the CloudFront domain name
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.media_distribution.domain_name
}

# Output the access key credentials for Payload CMS configuration
output "payload_cms_access_key_id" {
  value     = aws_iam_access_key.payload_cms_user.id
  sensitive = false
}

output "payload_cms_secret_access_key" {
  value     = aws_iam_access_key.payload_cms_user.secret
  sensitive = true
}
