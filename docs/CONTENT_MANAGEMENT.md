# AUCC Content Management Guide

> **Complete guide for content managers using the AUCC website CMS**  
> Step-by-step instructions for creating and managing website content via Payload CMS

## 📋 Getting Started

### Accessing the Admin Panel

**URL**: [your-domain.com/admin](http://localhost:3000/admin)

**Login Process**:

1. Navigate to the admin panel URL
2. Enter your email address and password
3. Click "Sign In"
4. You'll be redirected to the main dashboard

### Dashboard Overview

The admin panel provides access to:

- **Collections**: Main content types (Events, Rivers, Trip Reports, etc.)
- **Globals**: Site-wide settings and page configurations
- **Media Library**: Image and file management
- **User Management**: Admin and editor accounts

## 📊 Content Collections

### 🎯 Events Management

**Purpose**: Manage club events, trips, and activities

**Accessing Events**:

1. Click "Events" in the left sidebar
2. View all events in a table format
3. Click "Create New" to add an event
4. Click any existing event to edit

#### Creating a New Event

**Required Fields**:

- **Title**: Event name (e.g., "Grade 3 Rangitata River Trip")
- **Status**: Choose "Published" to make visible on website
- **Start Time**: Event start date and time
- **End Time**: Event end date and time (optional)
- **Location**: Meeting point or destination
- **Description**: Detailed event information
- **Event Type**: Select "Trip" or "Other"
- **Featured Image**: Main event photo

**Trip-Specific Fields** (appears when Event Type = "Trip"):

- **River**: Select associated river from dropdown
- **Tickets Information**: Registration and pricing details

**Step-by-Step Process**:

1. Click "Create New" in Events collection
2. Fill in the title and basic information
3. Set status to "Published" when ready to go live
4. Add start/end times using the date picker
5. Write a compelling description with event details
6. Select "Trip" if it's a paddling trip, "Other" for meetings/social events
7. Choose the river for trip events
8. Upload a high-quality featured image
9. Add ticket information if registration is required
10. Click "Save" to create the event

#### Event Status Options

| Status        | Description      | Visibility           |
| ------------- | ---------------- | -------------------- |
| **Draft**     | Work in progress | Hidden from website  |
| **Published** | Live content     | Visible on website   |
| **Archived**  | Past events      | Hidden but preserved |

#### Best Practices for Events

- **Use descriptive titles**: Include difficulty level and river name for trips
- **High-quality images**: Use landscape orientation, minimum 1200px wide
- **Complete descriptions**: Include what to bring, experience level, costs
- **Accurate timing**: Use NZDT timezone for all dates
- **Regular updates**: Archive past events monthly

### 🏞 Rivers Management

**Purpose**: Maintain database of paddling locations and river information

#### River Information Fields

**Basic Information**:

- **Name**: River name (e.g., "Rangitata River")
- **Grade**: Difficulty rating (1-5 numerical scale)
- **Location**: General area/region
- **Featured Image**: Representative river photo
- **Description**: Detailed river information

**Geographic Data**:

- **Put In**: GPS coordinates for launch point
  - Latitude (decimal degrees)
  - Longitude (decimal degrees)
- **Take Out**: GPS coordinates for exit point
  - Latitude (decimal degrees)
  - Longitude (decimal degrees)

#### Adding a New River

1. Navigate to "Rivers" collection
2. Click "Create New"
3. Enter river name and difficulty grade
4. Upload a quality featured image
5. Add put-in and take-out coordinates
6. Write comprehensive description including:
   - Access information
   - Hazards and safety considerations
   - Seasonal flow information
   - Permit requirements
7. Save the river entry

#### River Grade Guidelines

| Grade | Difficulty   | Description                   |
| ----- | ------------ | ----------------------------- |
| **1** | Beginner     | Moving water, few obstacles   |
| **2** | Novice       | Easy rapids, wide passages    |
| **3** | Intermediate | Rapids with irregular waves   |
| **4** | Advanced     | Intense rapids, precise moves |
| **5** | Expert       | Long, violent rapids          |

### 📝 Trip Reports Management

**Purpose**: Community-generated content about completed trips

#### Trip Report Fields

**Basic Information**:

- **Title**: Descriptive report title
- **Status**: Draft or Published
- **Authors**: Select from executive members
- **Date Published**: When the trip occurred
- **Related Event**: Link to original event (optional)
- **Featured Image**: Main trip photo

**Content**:

- **Content**: Full trip report using rich text editor
- **Gallery**: Additional trip photos

#### Creating a Trip Report

1. Access "Trip Reports" collection
2. Click "Create New"
3. Add descriptive title (e.g., "Epic Rangitata Adventure - March 2025")
4. Select author(s) from executive members
5. Set the date the trip occurred
6. Link to related event if available
7. Upload featured image
8. Write detailed content using the rich text editor
9. Add gallery images from the trip
10. Save as draft or publish immediately

#### Rich Text Editor Features

The content editor supports:

- **Headings**: H1, H2, H3 for structure
- **Text formatting**: Bold, italic, underline
- **Lists**: Bullet points and numbered lists
- **Links**: Internal and external links
- **Images**: Embedded photos with captions
- **Quotes**: Highlighted quote blocks

#### Trip Report Writing Tips

- **Engaging opening**: Start with interesting hook
- **Chronological structure**: Follow trip timeline
- **Include details**: Weather, water levels, highlights
- **Safety information**: Mention any hazards or incidents
- **Photos**: Include diverse shots (action, scenic, group)
- **Conclusion**: Summarize experience and recommendations

### 👥 Executive Profiles (Execs)

**Purpose**: Display current club leadership and contact information

#### Executive Fields

- **Name**: Full name
- **Pronouns**: Preferred pronouns (optional)
- **Role**: Position title (e.g., "President", "Trip Coordinator")
- **Email**: Contact email address
- **Image**: Professional headshot

#### Managing Executive Profiles

1. Navigate to "Execs" collection
2. Add new executives for each academic year
3. Update contact information as needed
4. Remove or archive past executives
5. Ensure photos are professional and consistent

### 📷 Gallery Management

**Purpose**: Showcase club photos and activities

#### Gallery Features

- **Image**: Upload high-resolution photos
- **Tags**: Categorize photos for easy filtering
- **Automatic organization**: Images appear on relevant pages

#### Adding Gallery Images

1. Access "Gallery" collection
2. Click "Create New"
3. Upload high-quality image
4. Add relevant tags (river names, event types, etc.)
5. Save to add to gallery

### 🏷 Tags Management

**Purpose**: Categorize and organize content across collections

#### Using Tags

Tags help organize content and improve navigation:

- **River names**: "Rangitata", "Shotover", "Clutha"
- **Event types**: "Social", "Training", "Competition"
- **Difficulty levels**: "Beginner", "Intermediate", "Advanced"
- **Regions**: "Canterbury", "Otago", "West Coast"

## 🌐 Global Settings

Global settings control site-wide content and page configurations.

### Events Global Settings

**Location**: Globals → Events Global

**Content**:

- **Header Image**: Banner image for events page
- **Intro Text**: Welcome text for events section

### Trip Reports Global Settings

**Location**: Globals → Trip Reports Global

**Content**:

- **Header Image**: Banner for trip reports page
- **Intro Text**: Introduction to trip reports section

### Rivers Global Settings

**Location**: Globals → Rivers Global

**Content**:

- **Header Image**: Banner for rivers guide page
- **Intro Text**: Introduction to rivers section

### Gear Hire Global Settings

**Location**: Globals → Gear Hire Global

**Content**:

- **Header Image**: Banner for gear hire page
- **Intro Text**: Information about equipment rental

## 📁 Media Library Management

### Uploading Images

1. Navigate to "Media" in sidebar
2. Click "Upload" or drag files into upload area
3. Select images from your device
4. Wait for upload to complete
5. Add alt text for accessibility

### Image Requirements

**Technical Specifications**:

- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 1200px wide for featured images
- **Quality**: High resolution, well-lit photos
- **Orientation**: Landscape preferred for banners

**Content Guidelines**:

- **Action shots**: Show club activities and adventures
- **Scenic photos**: Highlight beautiful New Zealand rivers
- **Group photos**: Include diverse club members
- **Safety focus**: Show proper equipment and techniques

### Image Organization

**Alt Text**: Always add descriptive alt text for accessibility

- ✅ Good: "Kayakers navigating Grade 3 rapids on Rangitata River"
- ❌ Poor: "River image" or leaving blank

**File Naming**: Use descriptive names before uploading

- ✅ Good: "rangitata-trip-march-2025.jpg"
- ❌ Poor: "IMG_1234.jpg"

## 👤 User Management

### User Roles

**Admin**: Full access to all content and settings

- Create, edit, delete all content
- Manage other users
- Access global settings

**Editor**: Content management permissions

- Create and edit assigned content types
- Upload media files
- Cannot manage users or global settings

### Managing User Accounts

**Adding New Users** (Admin only):

1. Navigate to "Users" collection
2. Click "Create New"
3. Enter name and email address
4. Set temporary password
5. Assign appropriate role
6. Save user account

**Updating User Information**:

1. Find user in Users collection
2. Update name, email, or role as needed
3. Reset password if requested
4. Save changes

## 🔧 Content Workflow

### Publication Workflow

**Draft → Review → Publish Process**:

1. **Create Content**: Start with draft status
2. **Internal Review**: Share with team members
3. **Revisions**: Make necessary changes
4. **Final Check**: Verify all information is accurate
5. **Publish**: Change status to "Published"
6. **Promotion**: Share on social media if applicable

### Content Calendar

**Recommended Schedule**:

- **Events**: Add 2-4 weeks before event date
- **Trip Reports**: Publish within 1 week of trip
- **River Information**: Update seasonally
- **Executive Profiles**: Update annually

### Quality Checklist

Before publishing content, verify:

- [ ] All required fields completed
- [ ] High-quality images uploaded
- [ ] Text proofread for errors
- [ ] Links working correctly
- [ ] Alt text added to images
- [ ] Appropriate tags assigned
- [ ] Contact information current

## 🚨 Troubleshooting

### Common Issues

#### Can't Upload Images

**Problem**: Upload fails or times out
**Solutions**:

- Check image file size (max 10MB)
- Verify internet connection
- Try different image format
- Refresh browser and try again

#### Content Not Appearing on Website

**Problem**: Published content not visible
**Solutions**:

- Verify status is set to "Published"
- Check publication date is current or past
- Clear browser cache
- Contact technical support

#### Lost Work

**Problem**: Content disappeared while editing
**Solutions**:

- Check "Versions" tab for auto-saves
- Look in drafts for saved progress
- Contact admin for assistance

#### Permission Errors

**Problem**: Can't access certain sections
**Solutions**:

- Verify user role and permissions
- Contact admin to update access level
- Clear browser cookies and re-login

### Getting Help

**Technical Support Contact**:

- **Primary**: Tech Lead (Phawat Saengsiripongpun)
- **Secondary**: WDCC Development Team
- **Emergency**: Project Manager (David Zhu)

**Documentation Resources**:

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [AUCC Website Architecture Guide](./ARCHITECTURE.md)
- [Developer Onboarding Guide](./ONBOARDING.md)

## 📖 Content Best Practices

### Writing Guidelines

**Tone and Voice**:

- Friendly and welcoming
- Informative but accessible
- Safety-conscious
- Inclusive of all skill levels

**Content Structure**:

- Use clear headings
- Keep paragraphs short (3-4 sentences)
- Include specific details (dates, times, locations)
- Add action items and next steps

### SEO Considerations

**Title Optimization**:

- Include keywords (river names, event types)
- Keep titles under 60 characters
- Make titles descriptive and engaging

**Content Optimization**:

- Use headings to structure content
- Include relevant keywords naturally
- Add internal links to related content
- Optimize images with descriptive alt text

### Accessibility Guidelines

**Content Accessibility**:

- Use descriptive link text
- Provide alt text for all images
- Structure content with proper headings
- Use simple, clear language

**Image Accessibility**:

- Alt text describes image content
- Avoid "image of" or "picture of"
- Include important text from images
- Use empty alt text for decorative images

## 📊 Content Analytics

### Performance Monitoring

**Popular Content**:

- Monitor which trip reports get most views
- Track event registration patterns
- Identify most visited river pages

**User Engagement**:

- Review time spent on content pages
- Monitor social media shares
- Track contact form submissions

### Content Optimization

**Based on Analytics**:

- Update popular river information regularly
- Create more content on high-performing topics
- Improve or remove low-performing content
- Optimize images and loading times

---

_This content management guide is designed to help AUCC team members effectively manage website content. For technical support or questions about CMS functionality, please contact the development team._
