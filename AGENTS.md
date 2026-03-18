# Agent Guidelines for admin-dashboard

## Project Overview

This is a Next.js 16 (App Router) admin dashboard project with TypeScript, Tailwind CSS v4, shadcn/ui v4, and React 19.

## Build/Lint/Test Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run Biome linter
npm run lint:fix     # Fix auto-fixable issues
npm run format       # Format all files with Biome
```

**Note:** No test framework (Jest, Vitest, etc.) is currently configured. If adding tests, use Vitest with React Testing Library.

## Code Style Guidelines

### General

- Use TypeScript strict mode (enabled in tsconfig.json)
- Prefer functional components with hooks over class components
- Use React Server Components (RSC) by default; add `"use client"` only when needed for interactivity

### TypeScript Conventions

- Enable strict mode checks
- Define explicit return types for functions when beneficial
- Use `type` for simple type aliases, `interface` for object shapes that may be extended
- Import types explicitly: `import type { SomeType } from "module"`

### Imports

**Order (recommended):**
1. External libraries (react, next, etc.)
2. Internal aliases (@/components, @/lib, etc.)
3. Relative imports (./components, ../utils, etc.)

**Path aliases available:**
- `@/*` → `./src/*`
- `@/components` → `./src/components`
- `@/lib/utils` → `./src/lib/utils`
- `@/components/ui` → `./src/components/ui`
- `@/lib` → `./src/lib`
- `@/hooks` → `./src/hooks`

### File Naming

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities/hooks: `camelCase.ts` (e.g., `useAuth.ts`, `formatDate.ts`)
- Config files: `kebab-case.ext` (e.g., `biome.json`)

### Component Patterns

This project uses shadcn/ui with the "New York" style. Follow these patterns:

```tsx
// Component file structure
import * as React from "react"
import { someCva, type VariantProps } from "class-variance-authority"
import { SomeRadixPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// Define variants with cva
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", secondary: "..." },
      size: { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

// Component with VariantProps
function Component({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof componentVariants>) {
  return (
    <div
      data-slot="component"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

### Styling

- Use Tailwind CSS v4 for all styling
- Use design tokens (e.g., `bg-primary`, `text-destructive`) from CSS variables
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes
- Support dark mode via `dark:` prefix

### Error Handling

- Use try/catch for async operations
- Display user-friendly error messages
- Log errors appropriately for debugging

### Naming Conventions

- Components: PascalCase (`UserCard`, `DashboardLayout`)
- Functions/hooks: camelCase (`useAuth`, `fetchUserData`)
- Constants: UPPER_SNAKE_CASE for true constants
- CSS variables: kebab-case (`--background`, `--primary-foreground`)
- Props interfaces: `ComponentNameProps` (e.g., `ButtonProps`)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & Tailwind
├── components/
│   ├── ui/                # shadcn/ui components
│   │   └── button.tsx
│   └── ...                # Feature-specific components
└── lib/
    └── utils.ts           # Utility functions (cn, etc.)
```

## Key Dependencies

- **next**: 16.1.7
- **react**: 19.2.3
- **tailwindcss**: v4 (CSS-first config)
- **shadcn**: 4.0.8
- **radix-ui**: 1.4.3
- **lucide-react**: Icons
- **zod**: Schema validation
- **axios**: HTTP client
- **class-variance-authority**: Component variants
- **clsx** + **tailwind-merge**: Class merging

## Adding shadcn/ui Components

Use the shadcn CLI to add components:
```bash
npx shadcn@latest add [component-name]
```

## Linting & Formatting

This project uses **Biome** for linting and formatting (replaces ESLint + Prettier).

### Commands
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix auto-fixable issues
- `npm run format` - Format all files

### Configuration

Biome is configured via `biome.json` with:
- JSON parser for config files
- JavaScript/TypeScript support for src files
- React JSX support
- Next.js plugin integration

### Rules
- Enable import sorting
- Enforce consistent formatting
- Enable recommended TypeScript rules
