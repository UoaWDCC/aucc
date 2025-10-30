# AUCC Deployment Guide

> **Complete deployment and infrastructure guide for the AUCC website**  
> Covering local development, staging, production, and infrastructure management

## 📋 Overview

The AUCC website uses a multi-tier deployment strategy with:

- **Local Development**: Hot-reloaded development environment
- **Preview Deployments**: Pull request preview environments via Fly.io
- **Staging Environment**: Full testing environment on Fly.io
- **Production Environment**: Live deployment on Fly.io
- **Infrastructure**: AWS resources managed via Terraform

## 🏗 Infrastructure Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Fly.io Sydney] --> B[Next.js Application]
        B --> C[Neon PostgreSQL]
        B --> D[AWS S3 Storage]
        D --> E[CloudFront CDN]
    end

    subgraph "Staging Environment"
        F[Fly.io Sydney] --> G[Dockerized App]
        G --> H[Neon PostgreSQL]
        G --> D
    end

    subgraph "Infrastructure Management"
        I[Terraform] --> J[AWS Resources]
        J --> D
        J --> E
        J --> K[IAM Policies]
    end

    subgraph "Secret Management"
        L[Infisical] --> M[Environment Variables]
        M --> A
        M --> F
    end
```

## 🔧 Environment Configuration

### Environment Variables

All environments require these variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# Payload CMS Configuration
PAYLOAD_SECRET="your-32-character-secret-key"
SERVER_URL="https://your-domain.com"

# AWS S3 Storage
S3_BUCKET="your-s3-bucket-name"
S3_ACCESS_KEY_ID="AKIA..."
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_REGION="ap-southeast-2"

# CloudFront CDN
NEXT_PUBLIC_CF_URL="https://your-cloudfront-url.cloudfront.net"

# API Security
API_KEY="your-api-key"

# Optional: Skip validation for build environments
SKIP_ENV_VALIDATION="true"
```

### Environment-Specific Values

| Variable             | Local                   | Staging                        | Production                        |
| -------------------- | ----------------------- | ------------------------------ | --------------------------------- |
| `SERVER_URL`         | `http://localhost:3000` | `https://aucc-staging.fly.dev` | `https://aucc-production.fly.dev` |
| `S3_BUCKET`          | `aucc-dev-media`        | `aucc-staging-media`           | `aucc-production-media`           |
| `NEXT_PUBLIC_CF_URL` | Dev CDN URL             | Staging CDN URL                | Production CDN URL                |

## 🚀 Deployment Environments

### 1. Local Development

**Purpose**: Developer workstations and testing

**Setup**:

```bash
# Clone repository
git clone https://github.com/UoaWDCC/aucc.git
cd aucc

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with development values

# Start development server
pnpm dev
```

**Features**:

- Hot module reloading via Turbopack
- Real-time TypeScript checking
- Instant feedback on code changes
- Access to staging database and S3 bucket

**Access**: <http://localhost:3000>

### 2. Preview Environments (Pull Requests)

**Purpose**: Testing and review of pull request changes

**Trigger**: Automatically created for every pull request

**Platform**: Fly.io (aucc-preview-pr-{number}.fly.dev)

**Features**:

- Isolated environment per PR
- Full application functionality
- Shared staging database
- Automatic cleanup when PR closed

**Configuration**: `.github/workflows/deploy-preview.yml`

```yaml
# Automatic PR preview deployment
name: Deploy Preview App
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]
# Creates: https://aucc-preview-pr-123.fly.dev
```

### 3. Staging Environment

**Purpose**: Pre-production testing and validation

**Platform**: Fly.io Sydney region

**Deployment**: Manual via GitHub Actions workflow

**Configuration**: `fly.staging.toml`

```toml
app = 'aucc-staging'
primary_region = 'syd'

[build]
  dockerfile = "Dockerfile"
  swap_size_mb = 256

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  cpu_kind = 'shared'
  cpus = 1
  memory = '256mb'
```

**Deployment Command**:

```bash
# Manual staging deployment
gh workflow run deploy-staging.yml
```

**Access**: <https://aucc-staging.fly.dev>

### 4. Production Environment

**Purpose**: Live website serving end users

**Platform**: Fly.io Sydney region

**Deployment**: Automatic on push to `main` branch via GitHub Actions

**Configuration**: `fly.toml` (production configuration)

**Features**:

- Auto-scaling based on traffic
- Rolling deployments with zero downtime
- Built-in health checks
- Automatic HTTPS/SSL certificates

**Build Configuration**:

```toml
app = 'aucc-production'
primary_region = 'syd'

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1

[[vm]]
  cpu_kind = 'shared'
  cpus = 2
  memory = '512mb'
```

**Deployment Commands**:

```bash
# Production deployment
flyctl deploy --app aucc-production

# Check production status
flyctl status --app aucc-production

# View production logs
flyctl logs --app aucc-production
```

**Access**: <https://aucc-production.fly.dev> (or custom domain)

**Access**: <https://aucc.org.nz> (when configured)

## 🏗 Infrastructure Management

### AWS Infrastructure (Terraform)

**Location**: `/terraform` directory

**Resources Managed**:

- S3 buckets for media storage
- CloudFront distributions for CDN
- IAM users and policies
- Origin Access Control (OAC) configurations

**File Structure**:

```text
terraform/
├── main.tf              # Main infrastructure configuration
├── prod.tfvars          # Production variables
├── staging.tfvars       # Staging variables
└── README.md           # Terraform documentation
```

### Terraform Configuration

**Initialize Terraform**:

```bash
cd terraform
terraform init
```

**Plan Deployment**:

```bash
# Staging environment
terraform plan -var-file="staging.tfvars"

# Production environment
terraform plan -var-file="prod.tfvars"
```

**Apply Changes**:

```bash
# Staging
terraform apply -var-file="staging.tfvars"

# Production (requires confirmation)
terraform apply -var-file="prod.tfvars"
```

### Infrastructure Components

#### S3 Media Buckets

```hcl
resource "aws_s3_bucket" "media_bucket" {
  bucket = "aucc-payload-bucket-${var.environment}"

  tags = {
    Name        = "Payload CMS Media Bucket"
    Environment = var.environment
  }
}
```

**Features**:

- Public access blocked for security
- CORS configuration for CMS uploads
- Versioning enabled for data protection

#### CloudFront CDN

```hcl
resource "aws_cloudfront_distribution" "media_distribution" {
  origin {
    domain_name              = aws_s3_bucket.media_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  # Optimized cache behavior for images
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    compress         = true
    cache_policy_id  = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  }
}
```

**Benefits**:

- Global content delivery
- Automatic image compression
- Edge caching for performance
- HTTPS encryption by default

#### IAM Configuration

```hcl
resource "aws_iam_user" "payload_cms_user" {
  name = "aucc-payload-cms-s3-user-${var.environment}"
}

resource "aws_iam_policy" "payload_cms_s3_policy" {
  name = "aucc-payload-cms-s3-policy-${var.environment}"

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
```

## 🔄 Deployment Workflows

### GitHub Actions Workflows

**Location**: `.github/workflows/`

#### 1. Build Test (`build.yml`)

**Trigger**: All pull requests and pushes

**Purpose**: Validate code quality and buildability

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
      - name: Setup pnpm & Node.js
      - name: Install dependencies
      - name: Run linting
      - name: Run tests
      - name: Build application
```

#### 2. Deploy Preview (`deploy-preview.yml`)

**Trigger**: Pull request events

**Purpose**: Create isolated preview environments

```yaml
- name: Deploy PR app to Fly.io
  uses: superfly/fly-pr-review-apps@latest
  with:
    name: aucc-preview-pr-${{ github.event.number }}
    config: fly.preview.toml
```

#### 3. Deploy Staging (`deploy-staging.yml`)

**Trigger**: Manual workflow dispatch

**Purpose**: Deploy to staging environment

```yaml
- name: Deploy
  run: >-
    flyctl deploy --remote-only --config fly.staging.toml
    --build-secret DATABASE_URL="${{ env.DATABASE_URL }}"
    --build-secret PAYLOAD_SECRET="${{ env.PAYLOAD_SECRET}}"
    # ... other secrets
```

### Secret Management

**Platform**: Infisical (centralized secret management)

**Configuration**:

```yaml
- name: Get Environment Secrets
  uses: Infisical/secrets-action@v1.0.9
  with:
    method: 'universal'
    client-id: ${{ secrets.INFISICAL_CLIENT_ID }}
    client-secret: ${{ secrets.INFISICAL_CLIENT_SECRET }}
    domain: 'https://app.infisical.com'
    env-slug: 'staging' # or 'dev', 'production'
    project-slug: 'aucc-website'
```

## 🐳 Docker Configuration

### Dockerfile Structure

**Multi-stage Build**:

```dockerfile
# Stage 1: Dependencies
FROM node:22.14.0-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:22.14.0-alpine AS builder
WORKDIR /app
ENV STANDALONE_OUTPUT "true"
# Build secrets mounted for SSG
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=PAYLOAD_SECRET \
    # ... build with secrets
    pnpm build

# Stage 3: Runtime
FROM node:22.14.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Build Secrets

Required secrets for build process:

- `DATABASE_URL`: For Payload CMS schema validation
- `PAYLOAD_SECRET`: For CMS initialization
- `S3_*`: For S3 plugin configuration
- `NEXT_PUBLIC_CF_URL`: For static asset URLs

## 📊 Monitoring & Observability

### Vercel Analytics (Production)

**Metrics Tracked**:

- Core Web Vitals (LCP, FID, CLS)
- Page load performance
- Function execution times
- Build and deployment status

**Access**: Vercel Dashboard → Analytics

### Fly.io Monitoring (Staging)

**Metrics Available**:

- Application health checks
- Resource utilization (CPU, memory)
- Request/response metrics
- Error rates and logs

**Access**: Fly.io Dashboard → Monitoring

### Error Tracking

**Production**: Vercel's built-in error tracking
**Staging**: Fly.io logs and metrics
**Development**: Console logging and Next.js error overlay

## 🔐 Security Considerations

### Environment Security

**Secret Management**:

- Never commit secrets to version control
- Use Infisical for centralized secret management
- Rotate secrets regularly
- Use least-privilege IAM policies

**Network Security**:

- HTTPS enforced on all environments
- CloudFront security headers
- S3 bucket public access blocked
- Origin Access Control for CloudFront

### Build Security

**Docker Security**:

- Multi-stage builds to minimize attack surface
- Non-root user in production container
- Security-scanned base images
- Minimal runtime dependencies

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Failures

**Symptoms**: Build process fails during CI/CD

**Common Causes**:

- Missing environment variables
- TypeScript compilation errors
- Dependency conflicts
- Out of memory during build

**Solutions**:

```bash
# Check environment variables
echo $DATABASE_URL

# Clear Next.js cache
rm -rf .next

# Update dependencies
pnpm update

# Increase build memory (Dockerfile)
ENV NODE_OPTIONS="--max-old-space-size=4096"
```

#### Database Connection Issues

**Symptoms**: Application fails to connect to database

**Debugging**:

```bash
# Test database connection
psql $DATABASE_URL

# Check connection pooling
# Monitor active connections in Neon dashboard

# Verify environment variables
env | grep DATABASE_URL
```

#### S3/CloudFront Issues

**Symptoms**: Images not loading or upload failures

**Debugging**:

```bash
# Test S3 access
aws s3 ls s3://your-bucket-name --profile your-profile

# Check CloudFront distribution status
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID

# Verify CORS configuration
curl -H "Origin: https://your-domain.com" \
     -H "Access-Control-Request-Method: PUT" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-cloudfront-url.cloudfront.net
```

#### Memory Issues (Fly.io)

**Symptoms**: Application crashes with OOM errors

**Solutions**:

```toml
# Increase memory in fly.toml
[[vm]]
  memory = '512mb'  # or higher

# Add swap for builds
[build]
  swap_size_mb = 512
```

### Health Checks

#### Application Health

```bash
# Check application status
curl https://your-domain.com/api/health

# Verify CMS admin access
curl https://your-domain.com/admin

# Test database connectivity
curl https://your-domain.com/api/ping
```

#### Infrastructure Health

```bash
# Terraform state check
terraform state list

# AWS resource verification
aws s3 ls
aws cloudfront list-distributions

# Fly.io app status
flyctl status --app your-app-name
```

## 📈 Performance Optimization

### Build Optimization

**Next.js Configuration**:

```javascript
// next.config.mjs
export default withPayload({
  output: process.env.STANDALONE_OUTPUT === 'true' ? 'standalone' : undefined,
  transpilePackages: ['@t3-oss/env-nextjs'],
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CF_URL
          ? new URL(process.env.NEXT_PUBLIC_CF_URL).hostname
          : '*.cloudfront.net',
      },
    ],
  },
})
```

**Caching Strategy**:

- CloudFront: 7-day TTL for images
- Next.js: ISR for dynamic content
- Browser: Aggressive caching for static assets

### Database Optimization

**Connection Pooling**:

- Neon's built-in connection pooling
- Optimal connection limits per environment
- Proper connection cleanup

**Query Optimization**:

- Indexed fields in Payload collections
- Efficient pagination patterns
- Cached query results

## 🔄 Maintenance Procedures

### Regular Maintenance Tasks

#### Weekly

- [ ] Review deployment logs for errors
- [ ] Monitor performance metrics
- [ ] Check security alerts

#### Monthly

- [ ] Update dependencies
- [ ] Review and rotate secrets
- [ ] Audit IAM permissions
- [ ] Performance optimization review

#### Quarterly

- [ ] Infrastructure cost review
- [ ] Security audit
- [ ] Backup verification
- [ ] Disaster recovery testing

### Update Procedures

#### Dependency Updates

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Test thoroughly
pnpm test && pnpm build
```

#### Infrastructure Updates

```bash
# Update Terraform providers
terraform init -upgrade

# Plan and apply changes
terraform plan -var-file="prod.tfvars"
terraform apply -var-file="prod.tfvars"
```

## 📚 Additional Resources

### Documentation Links

- [Vercel Deployment Docs](https://vercel.com/docs/deployments)
- [Fly.io Deployment Guide](https://fly.io/docs/getting-started/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Internal Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [ONBOARDING.md](./ONBOARDING.md) - Developer setup
- [README_HANDOVER.md](../README_HANDOVER.md) - Complete handover guide

### Support Contacts

- **DevOps**: Tech Lead (Phawat Saengsiripongpun)
- **Infrastructure**: WDCC Infrastructure Team
- **AWS Support**: Via AWS Console
- **Vercel Support**: Via Vercel Dashboard

---

_This deployment guide is maintained by the AUCC development team. For updates or questions about deployment procedures, please contact the technical team lead._
