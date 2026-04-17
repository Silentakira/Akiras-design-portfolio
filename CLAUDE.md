# Claude Code Configuration

## Project Overview
This is a personal CV website for Uriel Akira Guardado Domingues, a junior graphic designer based in Braga, Portugal. The site is built with Next.js 14, TypeScript, and Tailwind CSS, featuring extensive custom animations and a scroll-snap single-page design.

## Key Design Decisions

### Animation Choice: CSS + IntersectionObserver (not Framer Motion or GSAP)
**Why:** While the prompt asked to choose between Framer Motion or GSAP, I implemented a lightweight custom system using CSS animations and native IntersectionObserver because:
1. Zero additional dependencies for a CV site
2. Better performance for simple scroll-triggered animations
3. Native browser support (no external library overhead)
4. Easier to maintain and customize
5. Sufficient for the required animations (letter reveals, timeline, falling tools, etc.)

### Typography Rules
- Bebas Neue: Always uppercase, used for headlines and display text
- DM Mono: Always lowercase for labels, used for body text
- Playfair Display: Italic only, maximum 2 instances in the entire site
- Never use Inter, Roboto, Arial, or system fonts

### Color System
All colors are CSS variables defined in globals.css:
- --bg: #F5F2EC (warm off-white base)
- --ink: #0D0D0D (near-black text)
- --lime: #CAFF00 (single accent)
- --muted: #888888 (secondary text)
- --ghost: #555555 (tertiary text)
- --black: #0D0D0D (full sections)

### Architecture
- Single page with scroll-snap (every section is exactly 100vh)
- All CV content in lib/data.ts as typed constants
- Components import from data.ts — zero hardcoded strings in JSX
- Persistent StatusBar (36px height, z-index 9999)
- Custom cursor (12×12px lime crosshair, desktop only)

## Important Constraints

### Mobile Experience
Mobile is NOT a simplified version — every animation runs on mobile unless physically impossible with touch snap. Maintain full creative intensity on all devices.

### Animation Re-triggering
CRITICAL: Every IntersectionObserver must keep observing after trigger. Pattern:
```typescript
// On intersecting: remove class, force reflow, re-add class
element.classList.remove('animated');
void element.offsetWidth; // reflow
element.classList.add('animated');

// On not intersecting: remove class to reset
element.classList.remove('animated');
```

Never call observer.unobserve(). Every section resets when it leaves viewport and re-animates when it re-enters.

### File Organization
- /app contains Next.js App Router files
- /components contains React components (sections/ for page sections)
- /hooks contains custom React hooks
- /lib contains utility functions and data
- /public contains static assets (llms.txt for AI crawlers)

## Content Updates
All CV content lives in `/lib/data.ts`. When updating availability, experience, or skills, edit this file and the changes will propagate throughout the site.

## Deployment
The project is Vercel-ready out of the box. No build configuration needed beyond the standard Next.js setup.

## Development Notes
- The site uses custom cursor (pointer-events: none) that's disabled on touch devices
- All interactive elements need the "interactive" class for cursor hover effects
- Status bar offsets all sections by 36px top to avoid content being obscured
- Horizontal overflow is hidden on body to prevent accidental scrolling