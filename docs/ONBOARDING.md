# AUCC Developer Onboarding Guide

> **Welcome to the AUCC development team!** This guide will help you get up and running with the Auckland University Canoe Club website project.

## 📋 Prerequisites Checklist

Before you begin, ensure you have the following installed and configured:

### Required Software

- [ ] **Node.js** 22.14.0 (managed with Volta - see installation below)
- [ ] **pnpm** 10.5.2+ (package manager)
- [ ] **Git** (version control)
- [ ] **VS Code** (recommended editor with extensions)

### Development Tools

- [ ] **VS Code Extensions**:
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Tailwind CSS IntelliSense
  - [ ] TypeScript Importer
  - [ ] Auto Rename Tag
  - [ ] GitLens

### Accounts & Access

- [ ] **GitHub** account with access to `UoaWDCC/aucc` repository
- [ ] **Vercel** account (for deployment monitoring)
- [ ] **AWS Console** access (for infrastructure - if needed)
- [ ] **Neon** dashboard access (for database monitoring - if needed)

## 🚀 Quick Setup (5 minutes)

### 1. Install Node.js with Volta

```bash
# Install Volta (Node.js version manager)
curl https://get.volta.sh | bash

# Install the project's Node.js version
volta install node@22.14.0

# Verify installation
node --version  # Should output v22.14.0
```

### 2. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/UoaWDCC/aucc.git
cd aucc

# Install dependencies (this will automatically use the correct Node.js version)
pnpm install

# Copy environment template
cp .env.example .env.local
```

### 3. Configure Environment Variables

Edit `.env.local` with the following minimum configuration for local development:

```bash
# Database (Use the shared development database)
DATABASE_URL="postgresql://username:password@host:5432/database"

# Payload CMS
PAYLOAD_SECRET="your-32-character-secret-key-ask-team-lead"
SERVER_URL="http://localhost:3000"

# AWS S3 (Use development bucket)
S3_BUCKET="aucc-dev-media"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_REGION="ap-southeast-2"

# CloudFront CDN
NEXT_PUBLIC_CF_URL="https://dev-cdn.aucc.org.nz"

# API Security
API_KEY="development-api-key"
```

> **🔒 Security Note**: Ask your team lead for the actual development environment values. Never commit `.env.local` to Git.

### 4. Start Development

```bash
# Start the development server
pnpm dev

# Open your browser
# Frontend: http://localhost:3000
# Admin Panel: http://localhost:3000/admin
```

## 🏗 Project Structure Walkthrough

Let's explore the key directories you'll be working with:

### Frontend Development

```text
src/app/(frontend)/
├── _components/           # 🔧 Shared components (Navbar, Footer)
├── about/                # 📄 About page
├── events/               # 📅 Events & trips functionality
├── home/                 # 🏠 Homepage components
├── rivers/               # 🏞 River guides
└── trip-reports/         # 📝 Community trip reports
```

**When to edit**: Adding new pages, modifying page layouts, updating UI components

### Component Development

```text
src/components/
├── Button/               # 🔘 Reusable button component
├── Map/                  # 🗺 Interactive map components
├── PayloadImage/         # 🖼 Optimized image component
├── RichText/             # 📝 Content rendering
└── ui/                   # 🎨 Base UI components
```

**When to edit**: Creating reusable components, updating design system

### Content Management

```text
src/collections/
├── events.ts             # 📅 Event content schema
├── media.ts              # 🖼 File upload configuration
├── rivers.ts             # 🏞 River information schema
├── trip-reports.ts       # 📝 Trip report schema
└── users.ts              # 👤 User authentication
```

**When to edit**: Adding new content types, modifying data structures

### Data Layer

```text
src/queries/
├── events.ts             # 📅 Event data fetching
├── rivers.ts             # 🏞 River data queries
├── trip-reports.ts       # 📝 Trip report queries
└── __tests__/            # 🧪 Query tests
```

**When to edit**: Adding new data fetching logic, optimizing queries

## 🛠 Development Workflow

### Daily Development Commands

```bash
# Development
pnpm dev                    # Start dev server with hot reload
pnpm build                  # Test production build locally
pnpm start                  # Start production server locally

# Code Quality
pnpm lint                   # Check for linting errors
pnpm lint --fix             # Auto-fix linting issues
pnpm format                 # Format code with Prettier

# Testing
pnpm test                   # Run all tests
pnpm test:coverage          # Run tests with coverage report
pnpm test --watch           # Run tests in watch mode

# CMS Development
pnpm payload generate:types # Generate TypeScript types from CMS
pnpm payload migrate        # Run database migrations

# Component Development
pnpm storybook              # Start Storybook for component development
```

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes and commit
git add .
git commit -m "feat: add new component for trip reports"

# 3. Push and create PR
git push origin feature/your-feature-name

# 4. Create Pull Request on GitHub
# 5. After review approval, merge to main
```

### Commit Message Conventions

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat: add new trip report card component
fix: resolve image loading issue in gallery
docs: update README with setup instructions
style: improve responsive design for mobile
refactor: simplify event query logic
test: add unit tests for river utilities
```

## 🧪 Testing Your Changes

### 1. Local Testing Checklist

Before pushing changes, ensure:

- [ ] `pnpm lint` passes without errors
- [ ] `pnpm test` all tests pass
- [ ] `pnpm build` builds successfully
- [ ] Manual testing in browser works
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Admin panel functions correctly (if CMS changes)

### 2. Component Testing

If you're working on UI components:

```bash
# Start Storybook for visual testing
pnpm storybook

# Navigate to http://localhost:6006
# Test your component in isolation
```

### 3. CMS Testing

If you're working on Payload CMS features:

1. Navigate to <http://localhost:3000/admin>
2. Test content creation/editing
3. Verify frontend displays content correctly
4. Check TypeScript types are generated: `pnpm payload generate:types`

## 🎨 Design System & Styling

### Tailwind CSS Guidelines

We use Tailwind CSS with consistent patterns:

```typescript
// ✅ Good: Organized utility classes
<div className="flex items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button variant="primary" size="md">Action</Button>
</div>

// ❌ Avoid: Unorganized or conflicting classes
<div className="p-6 bg-white flex rounded-lg items-center shadow-md gap-4 justify-between">
```

### Component Patterns

Follow our established component patterns:

```typescript
// Standard component structure
import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface ComponentProps {
  title: string
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Component({
  title,
  children,
  variant = 'primary',
  className
}: ComponentProps) {
  return (
    <div className={cn(
      'base-styles',
      variant === 'primary' && 'primary-styles',
      variant === 'secondary' && 'secondary-styles',
      className
    )}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

## 🗃 Working with Payload CMS

### Adding New Content Types

1. **Create Collection Schema**:

```typescript
// src/collections/new-content.ts
import type { CollectionConfig } from 'payload'

export const NewContent: CollectionConfig = {
  slug: 'new-content',
  admin: {
    useAsTitle: 'title',
    description: 'Manage new content items',
  },
  access: {
    read: () => true, // Public read access
    create: authenticated, // Admin only create
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
```

2. **Register in Configuration**:

```typescript
// src/payload.config.ts
import { NewContent } from './collections/new-content'

export default buildConfig({
  collections: [
    // ...existing collections
    NewContent,
  ],
})
```

3. **Generate Types**:

```bash
pnpm payload generate:types
```

4. **Create Query Functions**:

```typescript
// src/queries/new-content.ts
export const getNewContent = unstable_cache(
  async function (params = {}) {
    const payload = await getPayloadClient()
    return await payload.find({
      collection: 'new-content',
      ...params,
    })
  },
  ['new-content'],
  { tags: [cacheTags.newContent] },
)
```

### Content Editor Guidelines

When working with the CMS admin panel:

1. **Test content creation** after making schema changes
2. **Verify relationships** work correctly (media uploads, references)
3. **Check permissions** for different user roles
4. **Test content rendering** on the frontend

## 🚀 Deployment & Environment

### Development Environment

- **Local**: <http://localhost:3000>
- **Staging**: Automatically deployed from `develop` branch
- **Production**: Manually deployed from `main` branch

### Environment Variables by Environment

```bash
# Local Development
SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_CF_URL="https://dev-cdn.aucc.org.nz"

# Staging
SERVER_URL="https://aucc-staging.vercel.app"
NEXT_PUBLIC_CF_URL="https://staging-cdn.aucc.org.nz"

# Production
SERVER_URL="https://aucc.org.nz"
NEXT_PUBLIC_CF_URL="https://cdn.aucc.org.nz"
```

### Deployment Process

1. **Feature Development**: Work on feature branch
2. **Pull Request**: Create PR to `develop` branch
3. **Review**: Team review and approval
4. **Staging**: Automatic deployment for testing
5. **Production**: Manual deployment after staging approval

## 🐛 Common Issues & Solutions

### Issue: "Module not found" errors

**Solution**:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Restart dev server
pnpm dev
```

### Issue: TypeScript errors after CMS changes

**Solution**:

```bash
# Regenerate Payload types
pnpm payload generate:types

# Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Issue: Environment variables not loading

**Solution**:

1. Check `.env.local` exists and has correct values
2. Restart development server
3. Ensure variables start with `NEXT_PUBLIC_` for client-side access

### Issue: Database connection errors

**Solution**:

1. Verify `DATABASE_URL` in `.env.local`
2. Check network connection
3. Ask team lead for current development database credentials

## 📚 Learning Resources

### Project-Specific

- **README**: [README.md](../README.md) - Project overview
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- **Handover Docs**: [README_HANDOVER.md](../README_HANDOVER.md) - Detailed guide

### Technology Documentation

- **Next.js 15**: <https://nextjs.org/docs>
- **Payload CMS**: <https://payloadcms.com/docs>
- **Tailwind CSS**: <https://tailwindcss.com/docs>
- **TypeScript**: <https://www.typescriptlang.org/docs>
- **React 19**: <https://react.dev/reference/react>

### Development Tools

- **VS Code**: <https://code.visualstudio.com/docs>
- **Git**: <https://git-scm.com/doc>
- **pnpm**: <https://pnpm.io/motivation>

## 🤝 Getting Help

### Team Communication

1. **GitHub Issues**: For bugs and feature requests
2. **Pull Request Comments**: For code review discussions
3. **Team Meetings**: Weekly sync meetings
4. **WDCC Discord**: For quick questions and collaboration

### Escalation Path

1. **First**: Check this documentation and existing issues
2. **Second**: Ask fellow developers on the team
3. **Third**: Contact the Tech Lead (Phawat Saengsiripongpun)
4. **Fourth**: Reach out to the Project Manager (David Zhu)

### Code Review Process

1. **Self Review**: Check your own code before requesting review
2. **Automated Checks**: Ensure CI/CD passes (linting, tests, build)
3. **Peer Review**: At least one team member approval required
4. **Tech Lead Review**: For architectural changes or major features

## 🎯 Your First Task

Ready to contribute? Here's a suggested first task to get familiar with the codebase:

### Beginner Task: Add Your Profile to About Page

1. **Find the exec collection**: Look at `src/collections/execs.ts`
2. **Add your profile**: Use the admin panel at <http://localhost:3000/admin>
3. **Update the About page**: Modify `src/app/(frontend)/about/_components/`
4. **Test your changes**: Ensure it displays correctly
5. **Create a PR**: Follow the git workflow above

This task will help you understand:

- How Payload CMS works
- How frontend components consume CMS data
- The development workflow
- Code review process

## 🏆 Best Practices Checklist

Before considering yourself fully onboarded, ensure you can:

- [ ] Set up the development environment without help
- [ ] Create and modify components following project patterns
- [ ] Work with Payload CMS (create collections, add content)
- [ ] Write and run tests for your changes
- [ ] Follow the git workflow and create proper pull requests
- [ ] Debug common issues independently
- [ ] Use Storybook for component development
- [ ] Understand the project architecture and data flow

## 🎉 Welcome to the Team!

Congratulations on completing the onboarding process! You're now ready to contribute to the AUCC website. Remember:

- **Ask questions**: The team is here to help you succeed
- **Share knowledge**: Help onboard future team members
- **Have fun**: We're building something great for the AUCC community!

---

_This onboarding guide is a living document. If you find gaps or have suggestions for improvement, please update it and share with the team._
