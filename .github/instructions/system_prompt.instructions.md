# GitHub Copilot Instructions

## ⚠️ CRITICAL: Security - Environment Files

**NEVER read, access, or process `.env` files or any environment variable files.**

This includes but is not limited to:
- `.env`
- `.env.local`
- `.env.development`
- `.env.production`
- `.env.test`
- `.env.*.local`
- Any file matching the pattern `*.env*`

**Reasons:**
- These files contain sensitive credentials, API keys, and secrets
- Reading them poses a security risk
- If asked to help with environment variables, provide guidance on structure without reading actual values

**If a user asks you to read or analyze a `.env` file, politely decline and explain the security implications.**

---

## UI Development Guidelines

### Responsive Design Requirements

All UI code must be responsive and follow mobile-first design principles:

1. **Mobile-First Approach**
   - Start with mobile styles as the base
   - Use Tailwind CSS breakpoints to scale up: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
   - Test layouts at common breakpoints: 320px, 768px, 1024px, 1440px

2. **Responsive Patterns**
   - Use `flex` and `grid` layouts with responsive adjustments
   - Implement fluid typography where appropriate
   - Ensure touch targets are at least 44x44px on mobile
   - Use responsive spacing: `p-4 md:p-6 lg:p-8`

### shadcn/ui Inspired Theme

Follow these design principles consistent with shadcn/ui:

1. **Color Palette**
   - Use CSS variables for theming (supports light/dark mode)
   - Primary colors should be subtle and professional
   - Use `zinc`, `slate`, or `neutral` for grays
   - Accent colors should be used sparingly

2. **Typography**
   - Clean, readable fonts (Inter, system fonts)
   - Consistent heading hierarchy
   - Adequate line-height for readability (1.5-1.75 for body text)

3. **Spacing & Layout**
   - Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
   - Generous whitespace
   - Card-based layouts with subtle borders or shadows

4. **Components**
   - Subtle borders: `border border-border` or `border-zinc-200 dark:border-zinc-800`
   - Rounded corners: `rounded-md` or `rounded-lg`
   - Subtle shadows: `shadow-sm` or `shadow-md`
   - Focus states with ring: `focus:ring-2 focus:ring-ring focus:ring-offset-2`

5. **Interactive Elements**
   - Buttons: Solid primary, outline secondary, ghost tertiary
   - Hover states: Subtle background changes
   - Transitions: `transition-colors` or `transition-all duration-200`

6. **Dark Mode Support**
   - Always include dark mode variants
   - Use `dark:` prefix for dark mode styles
   - Ensure sufficient contrast in both modes

### Example Component Patterns

```tsx
// Button example
className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

// Card example
className="rounded-lg border border-border bg-card p-6 shadow-sm"

// Input example
className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
```

# After making changes on agent mode
You do not need to run any commands after making changes to files while in agent mode. I will do it myself.