# AUCC Component Documentation

> **Comprehensive guide to the AUCC website component library**  
> Reusable components following consistent design patterns and accessibility standards

## 📋 Component Overview

The AUCC website uses a systematic component architecture with the following organization:

```text
src/components/                 # Shared, reusable components
├── Button/                    # ✅ Styled button component with variants
├── GradeBadge.tsx            # ✅ River difficulty indicators
├── Map/                      # ✅ Interactive Leaflet map components
├── PayloadImage/             # ✅ Optimized CMS image component
├── RecentContent.tsx         # ✅ Latest content display
├── RichText/                 # ✅ CMS rich text renderer
├── TripsCard/                # ✅ Event/trip information cards
└── ui/                       # ✅ Base UI primitives
```

## 🎨 Design System

### Component Standards

All components follow these standards:

- **TypeScript**: Full type safety with interfaces
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach
- **Consistent**: Unified styling with Tailwind CSS
- **Testable**: Storybook stories and unit tests

### Styling Architecture

Components use a consistent styling approach:

```typescript
// Standard styling pattern
const componentStyles = cn(
  'base-styles', // Layout and structure
  'responsive-styles', // Breakpoint variations
  variant && variantStyles, // Component variants
  className, // Consumer overrides
)
```

## 🔘 Button Component

**Location**: `src/components/Button/index.tsx`

### Purpose

Provides consistent, accessible button styling across the application with multiple variants and sizes.

### API

```typescript
interface ButtonProps {
  intent?: 'primary' | 'outline' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  color?: 'cream' | 'abyss' | 'algae' | 'grass'
  href?: string // Makes button a Link component
  onClick?: () => void // Click handler for button elements
  disabled?: boolean // Disabled state
  children: React.ReactNode // Button content
  className?: string // Additional styling
}
```

### Usage Examples

```typescript
// Primary button (default)
<Button>Get Started</Button>

// Outline button with custom color
<Button intent="outline" color="abyss">
  Learn More
</Button>

// Large secondary button
<Button intent="secondary" size="lg">
  Join Event
</Button>

// Link button (renders as Next.js Link)
<Button href="/events" intent="ghost">
  View All Events
</Button>

// Button with click handler
<Button
  intent="primary"
  onClick={() => setModalOpen(true)}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Variants

| Intent      | Description              | Use Case           |
| ----------- | ------------------------ | ------------------ |
| `primary`   | Solid button with border | Main actions, CTAs |
| `outline`   | Transparent with border  | Secondary actions  |
| `secondary` | Uppercase, bold styling  | Emphasis actions   |
| `ghost`     | Minimal styling          | Subtle actions     |

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Focus States**: Visible focus indicators
- **Disabled States**: Proper disabled handling

## 🖼 PayloadImage Component

**Location**: `src/components/PayloadImage/index.tsx`

### Purpose

Optimized image component that integrates with Payload CMS media and provides responsive image loading with automatic size selection.

### API

```typescript
interface PayloadImageProps {
  media: Media | string | StaticImageData // CMS media object or URL
  src?: string // Fallback source
  alt?: string // Alt text (required for accessibility)
  fill?: boolean // Fill parent container
  sizes?: string // Responsive sizes attribute
  className?: string // Additional styling
  priority?: boolean // Prioritize loading
  placeholder?: 'blur' | 'empty' // Loading placeholder
  onLoad?: () => void // Load event handler
}
```

### Usage Examples

```typescript
// Basic CMS image
<PayloadImage
  media={tripReport.featuredImage}
  alt="Trip report featured image"
  className="aspect-video w-full"
/>

// Responsive image with custom sizes
<PayloadImage
  media={gallery.image}
  alt={gallery.description}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg"
/>

// Fill container image
<PayloadImage
  media={hero.backgroundImage}
  alt="Hero background"
  fill
  priority
  className="object-cover"
/>

// Fallback image with placeholder
<PayloadImage
  media={undefined}
  src="/fallback-image.jpg"
  alt="Default image"
  placeholder="blur"
/>
```

### Features

- **Automatic Size Selection**: Chooses optimal image size based on requested width
- **Next.js Integration**: Built on Next.js Image component for optimization
- **CMS Integration**: Direct integration with Payload CMS media objects
- **Responsive Loading**: Supports responsive image loading patterns
- **Fallback Handling**: Graceful fallback to placeholder images

### Performance Optimizations

- **Lazy Loading**: Images load as they enter viewport
- **Format Optimization**: Automatic WebP/AVIF format selection
- **Size Optimization**: Multiple sizes generated for responsive display
- **CDN Integration**: Served via CloudFront for global delivery

## 🏆 GradeBadge Component

**Location**: `src/components/GradeBadge.tsx`

### Purpose

Displays river difficulty grades with appropriate styling and color coding.

### API

```typescript
interface GradeBadgeProps {
  grade: string | number // River grade (e.g., "Grade 3", "3")
  size?: 'sm' | 'md' | 'lg' // Badge size
  className?: string // Additional styling
}
```

### Usage Examples

```typescript
// Standard grade badge
<GradeBadge grade="3" />

// Large grade badge with custom styling
<GradeBadge
  grade="Grade 4+"
  size="lg"
  className="shadow-lg"
/>
```

### Grade Color System

| Grade | Color  | Difficulty   |
| ----- | ------ | ------------ |
| 1-2   | Green  | Beginner     |
| 3     | Blue   | Intermediate |
| 4     | Orange | Advanced     |
| 5+    | Red    | Expert       |

## 🗺 Map Component

**Location**: `src/components/Map/`

### Purpose

Interactive map component using Leaflet for displaying river locations and trip routes.

### API

```typescript
interface MapProps {
  center?: [number, number] // Map center coordinates
  zoom?: number // Initial zoom level
  markers?: MapMarker[] // Points to display
  height?: string // Map container height
  className?: string // Additional styling
}

interface MapMarker {
  position: [number, number] // Marker coordinates
  title: string // Marker title
  description?: string // Popup content
  icon?: string // Custom marker icon
}
```

### Usage Examples

```typescript
// Basic map with single marker
<Map
  center={[-36.8485, 174.7633]} // Auckland coordinates
  zoom={13}
  markers={[{
    position: [-36.8485, 174.7633],
    title: "Auckland University",
    description: "Home of AUCC"
  }]}
  height="400px"
/>

// Multi-marker map for river locations
<Map
  center={centerCoordinates}
  zoom={10}
  markers={rivers.map(river => ({
    position: [river.latitude, river.longitude],
    title: river.name,
    description: river.description,
    icon: river.difficulty > 3 ? 'expert' : 'beginner'
  }))}
  className="rounded-lg shadow-md"
/>
```

### Features

- **Interactive Navigation**: Pan, zoom, and marker interactions
- **Custom Markers**: Support for custom marker icons and styles
- **Responsive Design**: Adapts to container size
- **Popup Information**: Rich popup content for markers
- **Server-Side Ready**: Properly handles SSR with dynamic imports

## 📝 RichText Component

**Location**: `src/components/RichText/`

### Purpose

Renders rich text content from Payload CMS with proper styling and formatting.

### API

```typescript
interface RichTextProps {
  content: any // Rich text content from CMS
  className?: string // Additional styling
  enableGutter?: boolean // Add content gutters
  enableProse?: boolean // Apply prose styling
}
```

### Usage Examples

```typescript
// Basic rich text rendering
<RichText content={article.content} />

// Rich text with prose styling
<RichText
  content={tripReport.description}
  enableProse
  className="max-w-none"
/>

// Rich text in constrained container
<RichText
  content={page.content}
  enableGutter
  className="container mx-auto"
/>
```

### Supported Content Types

- **Headings**: H1-H6 with proper hierarchy
- **Paragraphs**: Styled text blocks
- **Lists**: Ordered and unordered lists
- **Links**: Internal and external links
- **Images**: Embedded images with captions
- **Blockquotes**: Styled quote blocks
- **Code**: Inline and block code formatting

## 🎫 TripsCard Component

**Location**: `src/components/TripsCard/`

### Purpose

Displays event and trip information in a consistent card format with multiple layouts.

### Structure

```text
TripsCard/
├── TripsCard.tsx           # Main card component
├── TripsCardButtons.tsx    # Action buttons
├── TripsCardContent.tsx    # Content area
├── TripsCardDate.tsx       # Date display
├── TripsCardImage.tsx      # Image component
└── TripsCardLocation.tsx   # Location information
```

### API

```typescript
interface TripsCardProps {
  event: EventDTO // Event data from CMS
  variant?: 'default' | 'featured' | 'compact'
  orientation?: 'horizontal' | 'vertical'
  showButtons?: boolean // Show action buttons
  className?: string // Additional styling
}
```

### Usage Examples

```typescript
// Default trip card
<TripsCard event={upcomingTrip} />

// Featured card with horizontal layout
<TripsCard
  event={featuredTrip}
  variant="featured"
  orientation="horizontal"
  showButtons
/>

// Compact card for listings
<TripsCard
  event={trip}
  variant="compact"
  orientation="vertical"
  className="shadow-sm"
/>
```

### Sub-Components

#### TripsCardDate

```typescript
<TripsCardDate
  startTime={event.startTime}
  endTime={event.endTime}
  format="short" // 'short' | 'long' | 'time-only'
/>
```

#### TripsCardLocation

```typescript
<TripsCardLocation
  location={event.location}
  showDistance={true}
  className="text-sm"
/>
```

#### TripsCardButtons

```typescript
<TripsCardButtons
  event={event}
  showRegister={true}
  showDetails={true}
  variant="primary"
/>
```

## 🎛 UI Components (Base Components)

**Location**: `src/components/ui/`

### Skeleton Component

Loading placeholder component for content areas.

```typescript
interface SkeletonProps {
  className?: string
  animate?: boolean
}

// Usage
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-[125px] w-[250px] rounded-xl" />
```

## 📱 Responsive Design Patterns

### Breakpoint System

Components follow a consistent breakpoint system:

```typescript
// Tailwind breakpoints used across components
const breakpoints = {
  sm: '640px', // Mobile landscape
  md: '768px', // Tablet
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Responsive Patterns

```typescript
// Mobile-first responsive classes
className="
  w-full                    // Mobile: full width
  md:w-1/2                 // Tablet: half width
  lg:w-1/3                 // Desktop: third width
  p-4                      // Mobile: padding 4
  md:p-6                   // Tablet: padding 6
  lg:p-8                   // Desktop: padding 8
"
```

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

All components meet WCAG 2.1 AA standards:

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper HTML semantics

### Implementation Examples

```typescript
// Button with proper ARIA
<Button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClose}
>
  ×
</Button>

// Image with descriptive alt text
<PayloadImage
  media={image}
  alt="Kayakers navigating Grade 3 rapids on Rangitata River"
/>

// Interactive element with keyboard support
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Interactive Content
</div>
```

## 🧪 Testing Components

### Storybook Stories

Each component has Storybook stories for visual testing:

```typescript
// Button.stories.ts
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    intent: { control: 'select', options: ['primary', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export const Primary = {
  args: {
    children: 'Primary Button',
    intent: 'primary',
  },
}

export const AllVariants = () => (
  <div className="space-y-4">
    <Button intent="primary">Primary</Button>
    <Button intent="outline">Outline</Button>
    <Button intent="secondary">Secondary</Button>
    <Button intent="ghost">Ghost</Button>
  </div>
)
```

### Unit Tests

Components have comprehensive unit tests:

```typescript
// PayloadImage.test.tsx
describe('PayloadImage', () => {
  it('renders with CMS media object', () => {
    render(<PayloadImage media={mockMedia} alt="Test image" />)
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('falls back to placeholder when media is unavailable', () => {
    render(<PayloadImage media={null} alt="Test image" />)
    expect(screen.getByAltText('Test image')).toHaveAttribute('src', '/placeholder.jpg')
  })
})
```

## 🔄 Component Lifecycle

### Development Workflow

1. **Design**: Create design specifications and requirements
2. **Build**: Implement component with TypeScript and Tailwind
3. **Story**: Create Storybook stories for all variants
4. **Test**: Write unit tests for functionality
5. **Document**: Update this documentation
6. **Review**: Code review and accessibility audit
7. **Deploy**: Merge and deploy to Storybook

### Maintenance Guidelines

- **Version Control**: Follow semantic versioning for breaking changes
- **Backward Compatibility**: Maintain API compatibility when possible
- **Deprecation**: Provide migration guides for deprecated props
- **Performance**: Regular performance audits and optimizations

## 📐 Component Creation Guidelines

### Creating New Components

Follow this checklist when creating new components:

- [ ] **TypeScript Interface**: Define clear prop interfaces
- [ ] **Default Props**: Provide sensible defaults
- [ ] **Accessibility**: Include ARIA attributes and keyboard support
- [ ] **Responsive Design**: Mobile-first responsive patterns
- [ ] **Storybook Story**: Create comprehensive stories
- [ ] **Unit Tests**: Test all major functionality
- [ ] **Documentation**: Update this documentation
- [ ] **Performance**: Optimize for performance and bundle size

### File Structure Template

```text
NewComponent/
├── index.tsx              # Main component
├── NewComponent.test.tsx  # Unit tests
├── NewComponent.stories.ts # Storybook stories
└── README.md             # Component-specific docs
```

### Component Template

```typescript
import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const componentVariants = cva(
  'base-styles',
  {
    variants: {
      variant: {
        default: 'default-styles',
        alternate: 'alternate-styles',
      },
      size: {
        sm: 'small-styles',
        md: 'medium-styles',
        lg: 'large-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  children: React.ReactNode
  className?: string
  // Add specific props here
}

export function Component({
  children,
  variant,
  size,
  className,
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
```

## 🔗 Related Documentation

- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- **Onboarding**: [ONBOARDING.md](./ONBOARDING.md) - Developer setup
- **Handover**: [README_HANDOVER.md](../README_HANDOVER.md) - Complete handover guide
- **Storybook**: <http://localhost:6006> - Live component gallery

---

_This component documentation is maintained by the AUCC development team. For questions or updates, please refer to the team communication channels outlined in the onboarding guide._
