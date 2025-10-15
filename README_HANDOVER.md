# 🧭 AUCC Website Developer Handover Documentation

> **Welcome to the Auckland University Canoe Club (AUCC) Website Project!**  
> This comprehensive guide will help you understand, maintain, and extend the AUCC website codebase.

## 📋 **Table of Contents**

1. [🧩 Project Overview](#-project-overview)
2. [🧱 Tech Stack](#-tech-stack)
3. [⚙️ Setup & Deployment](#️-setup--deployment)
4. [📂 Folder Structure](#-folder-structure)
5. [🧠 Design Principles & Conventions](#-design-principles--conventions)
6. [🪄 Common Workflows](#-common-workflows)
7. [🧰 Maintenance Tips](#-maintenance-tips)
8. [🧾 Known Issues & Future Improvements](#-known-issues--future-improvements)
9. [📞 Support & Resources](#-support--resources)

---

## 🧩 **Project Overview**

### **What is this project?**

The AUCC website is a modern, content-managed website for the Auckland University Canoe Club. It serves as the primary digital presence for:

- Event management and registration
- Trip reports and photo galleries
- River information and guides
- Executive team profiles
- Club membership and information

### **Architecture Overview**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js 15    │    │   Payload CMS    │    │  Neon Postgres  │
│   (Frontend)    │◄──►│   (Headless CMS) │◄──►│   (Database)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
          │                       │                       │
          ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│     Vercel      │    │   AWS S3 + CF    │    │   Terraform     │
│  (Deployment)   │    │  (Media Storage) │    │ (Infrastructure)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Data Flow**

1. **Content Management**: Admins create content via Payload CMS admin panel
2. **Data Storage**: Content stored in Neon Postgres, media in AWS S3
3. **Content Delivery**: Next.js fetches data at build/request time
4. **User Experience**: Static/dynamic pages served via Vercel Edge Network

---

## 🧱 **Tech Stack**

| Component              | Technology          | Version | Purpose                              |
| ---------------------- | ------------------- | ------- | ------------------------------------ |
| **Frontend Framework** | Next.js             | 15.2.3  | React-based SSR/SSG framework        |
| **Content Management** | Payload CMS         | 3.30.0  | Headless CMS with admin panel        |
| **Database**           | Neon Postgres       | Latest  | Serverless PostgreSQL database       |
| **Styling**            | Tailwind CSS        | 4.x     | Utility-first CSS framework          |
| **Image Storage**      | AWS S3 + CloudFront | N/A     | CDN-optimized media delivery         |
| **Deployment**         | Vercel              | N/A     | Edge deployment platform             |
| **Infrastructure**     | Terraform           | 1.2.0+  | Infrastructure as Code               |
| **Package Manager**    | pnpm                | 10.5.2  | Fast, disk space efficient           |
| **TypeScript**         | TypeScript          | 5.7.3   | Type safety and developer experience |

### **Key Dependencies**

```json
{
  "@payloadcms/db-postgres": "3.30.0",
  "@payloadcms/next": "3.30.0",
  "@payloadcms/richtext-lexical": "3.30.0",
  "@payloadcms/storage-s3": "3.30.0",
  "@t3-oss/env-nextjs": "^0.12.0",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.15"
}
```

---

## ⚙️ **Setup & Deployment**

### **Prerequisites**

- Node.js 18.20.2+ or 20.9.0+
- pnpm 10.5.2+
- Git
- VS Code (recommended)

### **Local Development Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/UoaWDCC/aucc.git
   cd aucc
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Copy `.env.example` to `.env.local` and configure:

   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/database"

   # Payload CMS
   PAYLOAD_SECRET="your-32-character-secret-key"
   SERVER_URL="http://localhost:3000"

   # AWS S3 Configuration
   S3_BUCKET="your-s3-bucket-name"
   S3_ACCESS_KEY_ID="your-access-key"
   S3_SECRET_ACCESS_KEY="your-secret-key"
   S3_REGION="ap-southeast-2"

   # CloudFront CDN
   NEXT_PUBLIC_CF_URL="https://your-cloudfront-url.cloudfront.net"

   # API Security
   API_KEY="your-api-key"
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Payload Admin: http://localhost:3000/admin

### **Production Deployment**

The project uses **Vercel** for deployment with automatic builds from the `main` branch.

**Environment Variables in Vercel:**
All environment variables from `.env.local` must be configured in Vercel dashboard.

**Build Command:** `pnpm run build`  
**Install Command:** `pnpm install`  
**Output Directory:** `.next` (default)

### **Infrastructure (AWS)**

AWS resources are managed via Terraform in the `/terraform` directory:

```bash
cd terraform
terraform init
terraform plan -var-file="prod.tfvars"
terraform apply -var-file="prod.tfvars"
```

**Key AWS Resources:**

- S3 bucket for media storage
- CloudFront distribution for CDN
- IAM user and policies for Payload CMS access

---

## 📂 **Folder Structure**

```
aucc/
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js 13+ App Router
│   │   ├── 📁 (frontend)/          # Public website routes
│   │   │   ├── 📁 _components/      # Shared frontend components
│   │   │   ├── 📁 about/           # About page
│   │   │   ├── 📁 events/          # Events listing & detail
│   │   │   ├── 📁 rivers/          # Rivers guide
│   │   │   ├── 📁 trip-reports/    # Trip reports
│   │   │   └── 📁 gallery/         # Photo gallery
│   │   ├── 📁 (payload)/           # CMS admin routes
│   │   └── 📁 api/                 # API endpoints
│   ├── 📁 collections/             # Payload CMS collections
│   ├── 📁 components/              # Reusable UI components
│   ├── 📁 globals/                 # Payload global settings
│   ├── 📁 lib/                     # Utilities and configuration
│   ├── 📁 queries/                 # Data fetching functions
│   └── 📁 assets/                  # Static images and icons
├── 📁 terraform/                   # AWS infrastructure
├── 📁 stories/                     # Storybook stories
├── 📄 package.json                 # Dependencies and scripts
├── 📄 payload.config.ts            # Payload CMS configuration
├── 📄 next.config.mjs              # Next.js configuration
└── 📄 tailwind.config.ts           # Tailwind CSS configuration
```

### **Key Directories Explained**

| Directory         | Purpose                | When to Edit               |
| ----------------- | ---------------------- | -------------------------- |
| `app/(frontend)/` | Public website pages   | Adding new pages or routes |
| `collections/`    | CMS content schemas    | Adding new content types   |
| `components/`     | Reusable UI components | Creating shared components |
| `queries/`        | Data fetching logic    | Adding new API calls       |
| `lib/`            | Utilities and config   | Adding helper functions    |

---

## 🧠 **Design Principles & Conventions**

### **File Naming Conventions**

```
✅ GOOD                           ❌ BAD
PascalCase for components         camelCase for components
kebab-case for pages             PascalCase for pages
camelCase for utilities          snake_case for utilities

Examples:
✅ EventCard.tsx                  ❌ eventCard.tsx
✅ about/page.tsx                ❌ About/Page.tsx
✅ formatDate.ts                 ❌ format_date.ts
```

### **Component Structure**

```tsx
// ✅ GOOD: Standard component structure
import { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import type { ComponentProps } from '@/types/shared'

interface ComponentNameProps extends ComponentProps {
  title: string
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export function ComponentName({
  title,
  children,
  variant = 'primary',
  className,
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        'base-styles',
        variant === 'primary' && 'primary-styles',
        className,
      )}
    >
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### **Import Organization**

```tsx
// ✅ GOOD: Organized imports
// 1. React imports
import { useEffect, useState } from 'react'
import Image from 'next/image'
// 2. Next.js imports
import Link from 'next/link'
// 3. Third-party libraries
import { cn } from 'clsx'

// 5. Internal components
import { Button } from '@/components/Button'
// 4. Internal utilities
import { formatDate } from '@/lib/utils/formatDate'
// 6. Types (last)
import type { Event } from '@/payload-types'
```

### **Styling Conventions**

```tsx
// ✅ GOOD: Tailwind classes organized
className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 mb-6',
  // Typography
  'text-lg font-semibold',
  // Colors & states
  'bg-white hover:bg-gray-50',
  // Responsive
  'md:p-6 lg:text-xl',
  // Conditional
  isActive && 'bg-blue-500 text-white',
  className // Always last
)}
```

### **TypeScript Best Practices**

```tsx
// ✅ GOOD: Proper typing
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'member'
}

// ✅ GOOD: Generic types for reusability
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// ✅ GOOD: Utility types for safety
type UserWithoutEmail = Omit<User, 'email'>
type CreateUserInput = Pick<User, 'name' | 'email' | 'role'>
```

---

## 🪄 **Common Workflows**

### **Adding a New Page**

1. **Create the page component**

   ```bash
   mkdir src/app/(frontend)/new-page
   touch src/app/(frontend)/new-page/page.tsx
   ```

2. **Add metadata and basic structure**

   ```tsx
   // src/app/(frontend)/new-page/page.tsx
   import type { Metadata } from 'next'

   export const metadata: Metadata = {
     title: 'New Page - AUCC',
     description: 'Description of the new page',
   }

   export default function NewPage() {
     return (
       <div>
         <h1>New Page</h1>
       </div>
     )
   }
   ```

3. **Add navigation link**
   ```tsx
   // src/app/(frontend)/_components/layout/Navbar.tsx
   <NavButton href="/new-page">New Page</NavButton>
   ```

### **Adding a New Payload Collection**

1. **Create collection schema**

   ```tsx
   // src/collections/new-collection.ts
   import type { CollectionConfig } from 'payload'

   export const NewCollection: CollectionConfig = {
     slug: 'new-collection',
     admin: {
       useAsTitle: 'title',
     },
     fields: [
       {
         name: 'title',
         type: 'text',
         required: true,
       },
       {
         name: 'content',
         type: 'richText',
       },
     ],
   }
   ```

2. **Register in payload.config.ts**

   ```tsx
   // src/payload.config.ts
   import { NewCollection } from './collections/new-collection'

   export default buildConfig({
     collections: [
       // ...existing collections
       NewCollection,
     ],
   })
   ```

3. **Generate TypeScript types**

   ```bash
   pnpm payload generate:types
   ```

4. **Create query function**

   ```tsx
   // src/queries/new-collection.ts
   import { getPayloadClient } from '@/lib/payload'
   import type { NewCollection } from '@/payload-types'

   export async function getNewCollectionItems() {
     const payload = await getPayloadClient()
     const result = await payload.find({
       collection: 'new-collection',
       limit: 50,
     })
     return result.docs
   }
   ```

### **Adding New Component**

1. **Create component file**

   ```bash
   mkdir src/components/NewComponent
   touch src/components/NewComponent/index.tsx
   ```

2. **Implement component**

   ```tsx
   // src/components/NewComponent/index.tsx
   import { cn } from '@/lib/utils/cn'

   interface NewComponentProps {
     title: string
     className?: string
   }

   export function NewComponent({ title, className }: NewComponentProps) {
     return <div className={cn('default-styles', className)}>{title}</div>
   }
   ```

3. **Export from components/index.ts** (if exists)
   ```tsx
   export { NewComponent } from './NewComponent'
   ```

### **Updating CMS Content**

1. **Access admin panel**: http://localhost:3000/admin
2. **Login with admin credentials**
3. **Navigate to desired collection**
4. **Create/edit content**
5. **Publish changes**

_Note: Content changes are reflected immediately in development, and after redeployment in production._

---

## 🧰 **Maintenance Tips**

### **Regular Maintenance Tasks**

#### **Weekly**

- [ ] Check for dependency updates: `pnpm outdated`
- [ ] Review and address build warnings
- [ ] Monitor website performance and loading times

#### **Monthly**

- [ ] Update dependencies: `pnpm update`
- [ ] Review and clean up unused imports/components
- [ ] Check CloudFront and S3 costs
- [ ] Review database performance metrics

#### **Quarterly**

- [ ] Major dependency updates (Next.js, Payload CMS)
- [ ] Security audit: `pnpm audit`
- [ ] Performance optimization review
- [ ] Infrastructure cost optimization

### **Database Migrations**

When Payload CMS schema changes, migrations might be needed:

```bash
# Generate migration
pnpm payload migrate:create

# Run migrations
pnpm payload migrate
```

### **Handling Schema Updates**

1. **Update collection schema** in `/src/collections/`
2. **Generate new types**: `pnpm payload generate:types`
3. **Test locally** with development data
4. **Deploy to staging** for testing
5. **Deploy to production** after validation

### **Performance Monitoring**

Key metrics to monitor:

- **Core Web Vitals**: LCP, FID, CLS
- **Build time**: Should be under 2 minutes
- **Bundle size**: Monitor `/build` output
- **Database queries**: Check for N+1 problems

Tools for monitoring:

- Vercel Analytics (built-in)
- Next.js built-in performance monitoring
- AWS CloudWatch for infrastructure

### **Backup Strategy**

1. **Database**: Neon provides automatic backups
2. **Media files**: S3 versioning enabled
3. **Code**: Git repository with multiple remotes recommended
4. **Environment variables**: Document securely in team password manager

---

## 🧾 **Known Issues & Future Improvements**

### **🚨 Critical Issues to Address**

1. **Performance Optimizations Needed**

   ```
   ⚠️  Gallery components using <img> instead of Next.js <Image>
   📍  Files: EventGalleryGrid.tsx, SpecificRiverGalleryGrid.tsx
   🔧  Fix: Replace with optimized Image component
   ```

2. **Code Quality Issues**

   ```
   ⚠️  Multiple unused imports and variables
   📍  Build warnings show 20+ instances
   🔧  Fix: Run eslint --fix and clean up manually
   ```

3. **Accessibility Gaps**

   ```
   ⚠️  Missing alt text on several images
   📍  NextAdventureFallback.tsx and others
   🔧  Fix: Add meaningful alt text for all images
   ```

4. **TODO Items in Code**
   ```
   📍  src/collections/events.ts:39 - Add sign-up form integration
   📍  src/app/(frontend)/tailwind.config.ts:18 - Custom prose styling
   📍  terraform/prod.tfvars:4 - Add production domain
   ```

### **🔮 Future Improvements**

#### **Short-term (Next 1-2 months)**

- [ ] **Mobile responsiveness audit** - Test all pages on mobile devices
- [ ] **Image optimization** - Implement proper lazy loading and WebP format
- [ ] **Error handling** - Add proper error boundaries and fallback UI
- [ ] **SEO optimization** - Add structured data and improve meta tags
- [ ] **Performance monitoring** - Set up analytics and performance tracking

#### **Medium-term (3-6 months)**

- [ ] **Search functionality** - Add search for events, trips, and rivers
- [ ] **User authentication** - Member login and personalized content
- [ ] **Email notifications** - Event reminders and club updates
- [ ] **Progressive Web App** - Add PWA capabilities for mobile experience
- [ ] **Content scheduling** - Auto-publish future events and trips

#### **Long-term (6+ months)**

- [ ] **Multi-language support** - Internationalization for diverse members
- [ ] **Advanced analytics** - User behavior tracking and insights
- [ ] **Payment integration** - Online membership fees and event payments
- [ ] **Mobile app** - React Native app for enhanced mobile experience
- [ ] **AI-powered features** - Auto-categorization of trip reports and photos

### **🔧 Technical Debt**

1. **Component organization** - Some components could be better organized
2. **Type safety** - A few `any` types in test files need proper typing
3. **Error handling** - Inconsistent error handling patterns across components
4. **Testing coverage** - Need more comprehensive component and integration tests

---

## 📞 **Support & Resources**

### **Documentation Links**

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Documentation](https://vercel.com/docs)

### **Key Commands Reference**

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm format                 # Format code with Prettier

# Payload CMS
pnpm payload generate:types # Generate TypeScript types
pnpm payload migrate        # Run database migrations

# Testing
pnpm test                   # Run tests
pnpm test:coverage          # Run tests with coverage

# Storybook
pnpm storybook              # Start Storybook dev server
pnpm build-storybook        # Build Storybook for production
```

### **Emergency Contacts & Resources**

- **Vercel Dashboard**: [AUCC Project Dashboard](https://vercel.com/dashboard)
- **AWS Console**: [S3 Bucket Management](https://aws.amazon.com/s3/)
- **Neon Dashboard**: [Database Management](https://neon.tech/)
- **Repository**: [GitHub - UoaWDCC/aucc](https://github.com/UoaWDCC/aucc)

### **Troubleshooting Common Issues**

#### **Build Failures**

1. Check environment variables are properly set
2. Run `pnpm install` to ensure dependencies are up to date
3. Clear Next.js cache: `rm -rf .next`
4. Check for TypeScript errors: `pnpm type-check`

#### **Database Connection Issues**

1. Verify `DATABASE_URL` in environment variables
2. Check Neon dashboard for database status
3. Ensure IP whitelist includes deployment servers

#### **Image Upload Problems**

1. Verify S3 credentials and bucket permissions
2. Check CloudFront distribution is active
3. Ensure `NEXT_PUBLIC_CF_URL` is correctly configured

#### **CMS Admin Access Issues**

1. Check `PAYLOAD_SECRET` environment variable
2. Verify user credentials in database
3. Clear browser cache and cookies

---

## 🎯 **Quick Start Checklist**

**For new developers joining the project:**

- [ ] Clone repository and install dependencies
- [ ] Set up environment variables (`.env.local`)
- [ ] Start development server and verify it works
- [ ] Access Payload CMS admin panel
- [ ] Make a small test change and see it reflected
- [ ] Read through this handover document
- [ ] Review the codebase structure
- [ ] Check out recent pull requests to understand current development
- [ ] Set up your development environment (VS Code extensions, etc.)
- [ ] Join the AUCC developer Slack/Discord channel

**Estimated setup time: 30-60 minutes**

---

## 📝 **Final Notes**

This AUCC website represents a solid foundation for the club's digital presence. The technology choices prioritize:

- **Developer Experience**: Modern tools and clear conventions
- **Performance**: Static generation and optimized delivery
- **Maintainability**: Clean architecture and comprehensive documentation
- **Scalability**: Headless CMS and cloud-native infrastructure

The codebase is production-ready with minor improvements needed. Focus on addressing the critical issues first, then gradually implementing the future improvements based on club priorities and user feedback.

**Remember**: The goal is not just to maintain the website, but to continuously improve the user experience for AUCC members and potential new members. Every change should consider the club's mission of promoting safe and enjoyable canoeing experiences.

Good luck, and feel free to contribute your own improvements to this documentation as you learn and grow with the project! 🚀

---

_Last updated: October 8, 2025_  
_Handover prepared by: Senior Full-Stack Development Team_
