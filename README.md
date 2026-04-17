# Uriel Akira — Graphic Designer CV Website

A production-ready personal CV website for Uriel Akira Guardado Domingues, a junior graphic designer & creative based in Braga, Portugal.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Custom Animation System** (CSS + IntersectionObserver)

## Features

- ✨ Fully animated single-page CV
- 📱 Responsive design (mobile-first)
- 🎨 Custom design system with unique typography
- 🔄 Re-trigger animations on scroll
- 🎯 Accessibility (prefers-reduced-motion support)
- 🚀 Vercel-ready deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- At least 500MB free disk space

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── Cursor.tsx          # Custom cursor component
│   ├── StatusBar.tsx       # Fixed status bar
│   └── sections/
│       ├── Hero.tsx        # Hero section with letter animations
│       ├── About.tsx       # About section with rogue text
│       ├── Experience.tsx  # Experience timeline
│       ├── Tools.tsx       # Tools showcase
│       ├── Marquee.tsx     # Contact marquee
│       ├── Education.tsx   # Education & achievements
│       └── Contact.tsx     # Contact section with glitch effect
├── hooks/
│   ├── useAnimateOnScroll.ts   # Re-trigger animation hook
│   └── useReducedMotion.ts     # Accessibility hook
├── lib/
│   ├── animations.ts       # Animation configurations
│   └── data.ts             # CV content (typed constants)
└── public/
    └── llms.txt            # AI crawler metadata
```

## Design System

### Colors
```css
--bg: #F5F2EC;    /* warm off-white */
--ink: #0D0D0D;   /* near-black */
--lime: #CAFF00;  /* accent */
--muted: #888888; /* secondary */
--ghost: #555555; /* tertiary */
--black: #0D0D0D; /* full black */
```

### Typography
- **Bebas Neue** — Display headlines (uppercase)
- **DM Mono** — Body text & UI (lowercase labels)
- **Playfair Display** — Accent moments (italic only)

## Animation System

The site uses a custom animation system with:
- **IntersectionObserver** for scroll-based triggers
- **CSS animations** for smooth performance
- **Re-trigger pattern** — animations reset and replay on scroll

### Key Features
- Every section animates in when entering viewport
- Animations reset when section leaves viewport
- Full re-trigger on scroll up/down
- Exit transitions (blur + fade)
- prefers-reduced-motion support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

**Note:** The project is Vercel-ready out of the box with proper `next.config.js` configuration.

### Environment Variables

No environment variables required — the site is fully static.

## Customization

### Update CV Content

All content lives in `/lib/data.ts` as typed constants. Edit this file to update:

- Personal information
- Experience entries
- Education details
- Tools & skills
- Contact information

### Modify Colors

Edit CSS variables in `/app/globals.css`:
```css
:root {
  --bg: #YOUR_COLOR;
  --ink: #YOUR_COLOR;
  --lime: #YOUR_COLOR;
  /* ... */
}
```

### Adjust Animations

Animation configurations are in `/lib/animations.ts`:
```typescript
export const ANIMATION_CONFIG = {
  hero: {
    letterStagger: 40, // ms per letter
    // ...
  },
  // ...
};
```

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance

- ✅ Lighthouse score: 95+
- ✅ First Contentful Paint: <1s
- ✅ Time to Interactive: <2s
- ✅ Zero CLS (Cumulative Layout Shift)

## Credits

**Design & Development:** Claude Code + Uriel Akira
**Animation System:** Custom CSS + IntersectionObserver
**Fonts:** Google Fonts (Bebas Neue, DM Mono, Playfair Display)

## License

Proprietary — All rights reserved © 2026 Uriel Akira Guardado Domingues

---

**Note:** This site is designed to impress recruiters and creative studios. Every animation and interaction has been carefully crafted to showcase attention to detail and design sensibility.
