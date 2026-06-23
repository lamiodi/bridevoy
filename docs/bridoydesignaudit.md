# BrideVoy ✦ — Comprehensive Design-to-Development Audit

**Project:** BrideVoy Luxury Wedding Chauffeur Platform  
**Audit Date:** 27 May 2026  
**Source:** Figma Design → Blueprint.md + Existing Codebase  
**Status:** Active Development (Vite + React 18 + Tailwind CSS 3)

---

## 1. Design System Specification

### 1.1 Color Palette

| Token | Hex | CSS Variable | Usage |
|:---|:---|:---|:---|
| Primary Black | `#171717` | `--primary-black` | Headlines, navbar, footer bg, CTAs |
| Primary White | `#FCFCFC` | `--primary-white` | Page background, card backgrounds |
| FAQ Green | `#D4FF00` | `--faq-green` | Accordion headers, price-preview accent |
| Gray Placeholder | `#D9D9D9` | `--gray-placeholder` | Wizard progress bar, form borders |
| Text Gray | `#555` / `#666` | — (inline) | Body text, subtitles |
| Muted Gray | `#888` / `#999` | — (inline) | Footer text, disabled states |
| Border Gray | `#CCC` / `#DDD` / `#EAEAEA` | — (inline) | Divider lines, card borders |
| Dark Overlay | `#171717/70` | — (inline) | Mission/Vision background scrim |

> [!WARNING]
> **Blueprint Mismatch:** The blueprint specifies Gold (`#D4AF37`) and Champagne (`#F7E7CE`) as brand colors, but **neither appears anywhere in the codebase**. The implementation uses a neon-green accent (`#D4FF00`) instead. This is a **critical brand identity divergence** that needs a design decision.

### 1.2 Typography

| Role | Font | Weight | Tailwind Token | CSS Variable |
|:---|:---|:---|:---|:---|
| Headings | Cinzel | 400, 600, 700 | `font-heading` | `--font-heading` |
| Body | Raleway | 300, 400, 500, 600 | `font-body` | `--font-body` |

> [!NOTE]
> The blueprint specifies **Playfair Display** for headings and **Inter** for body text, but the implementation uses **Cinzel** and **Raleway** instead. This is an intentional deviation — Cinzel provides a more premium, engraved feel that suits a luxury chauffeur brand better than Playfair.

### 1.3 Typography Scale (Desktop → Mobile)

| Element | Desktop | Tablet (≤1024) | Mobile (≤768) | Small (≤480) | Mini (≤360) |
|:---|:---|:---|:---|:---|:---|
| Hero Title | `9vw` / `clamp(84px,22vw,280px)` | — | `14vw` | `16vw` | `18vw` |
| Section H2 | `32px` | — | `24px` | `20px` | `18px` / `16px` |
| Card H3 | `24px` | — | `20px` | `18px` | — |
| Body Text | `15px` | — | `13px` | `12px` | — |
| Nav Links | `13px` | — | `18px` (mobile menu) | — | `16px` |
| Footer Watermark | `10vw` | — | `12vw` | `14vw` | — |

---

## 2. Layout Architecture & Dimensions

### 2.1 Section Padding Map

| Section | Desktop Padding | Tablet (≤1024) | Mobile (≤768) | Small (≤480) |
|:---|:---|:---|:---|:---|
| Navbar | `30px 80px` | `_ 40px` | `20px 20px` | `15px 15px` |
| Hero | `60px 80px 40px` | `_ 40px` | `40px 20px 30px` | `30px 15px 20px` |
| About | `100px 80px 40px` | `_ 40px` | `60px 20px 30px` | `40px 15px 25px` |
| Why Choose Us | `100px 80px` | `_ 40px` | `60px 20px` | `40px 15px` |
| How It Works | `100px 80px` | `_ 40px` | `60px 20px` | `40px 15px` |
| FAQ | `100px 80px` | `_ 40px` | `60px 20px` | `40px 15px` |
| Booking | `100px 80px` | `80px 40px` | `60px 20px` | `40px 15px` |
| Footer | `60px 80px 30px` | `_ 40px` | `40px 20px 20px` | `30px 15px 15px` |

### 2.2 Container Widths

| Container | Max Width |
|:---|:---|
| Content wrappers | `1200px` |
| Hero car image | `1100px` (CSS) / `1200px` (JSX) |
| Hero bottom details | `1400px` |
| FAQ accordion | `760px` (CSS) / `800px` (JSX) |
| Booking form | `700px` |
| Mission content | `1000px` |
| Timeline (How It Works) | `1000px` |

### 2.3 Logo Block Dimensions

| Breakpoint | Logo BG Width | Logo BG Height | Logo Img Height |
|:---|:---|:---|:---|
| Desktop | `220px` (CSS) / `180px` (JSX) | `180px` / `240px` | `70px` / `90px` |
| Mobile (≤768) | `150px` | `120px` | `50px` |
| Small (≤480) | `120px` | `100px` | `40px` |

---

## 3. Component Inventory & Specifications

### 3.1 Navigation Bar

```
┌─────────────────────────────────────────────────────────┐
│ ┌──────────┐                                            │
│ │ ■ LOGO ■ │  ──── line ──── HOME  FLEET  PACKAGES ...  │
│ │ (on blk) │                              [CONTACT US]  │
│ └──────────┘                                            │
└─────────────────────────────────────────────────────────┘
```

- **Position:** `absolute`, `top-0`, `z-50`
- **Horizontal line:** `1px solid #CCC` at `top: 90px` behind nav links
- **Nav links:** Sit ON the line with `bg-[#FCFCFC]` padding to mask the line underneath
- **CTA button:** `border: 1px solid gray-800`, hover inverts to dark bg
- **Mobile:** Hamburger button at same `top: 90px`, full-screen overlay menu

### 3.2 Hero Section

```
┌───────────────────────────────────────────┐
│                 BRIDEVOY                   │  ← Gradient text (fades to bg)
│            ┌──────────────┐               │
│            │  🚗 S-CLASS   │               │  ← Car image, z-10
│            └──────────────┘               │
│ ─────────────── line ──────────────────── │  ← Full-width horizontal line
│ [BOOK RIDE]  ●Mercedes●    BV101          │
│              pill-badge    S-Class Fleet   │
└───────────────────────────────────────────┘
```

**Key Specs:**
- Hero title: Gradient `#111 → #999 → #FCFCFC` with `background-clip: text`
- Title font: `clamp(84px, 22vw, 280px)`
- Car image: `max-width: 1200px`, `scale(1.02)`, `drop-shadow-2xl`
- Pill badge: `bg-[#111]`, `rounded-[40px]`, contains Mercedes logo circle + text
- "BOOK RIDE" and "BV101" masked against the horizontal line with white bg padding

### 3.3 About Section

- **Background:** `#171717` (dark)
- **Layout:** Two-column (`lg:flex-row`), stacks on mobile
- **Ornamental line:** Vertical `diamond → line → dot` on left (desktop only)
- **Signature image:** Uses `invert brightness-0` filter for dark background
- **Stats:** Right-aligned text under car image

### 3.4 Why Choose Us Section

- **Layout:** Three-column → Center image flanked by feature lists
- **Divider:** `line — diamond — line` centered above heading
- **Feature items:** `max-width: 280px`, bottom border accent `60px wide`
- **Mobile:** Center image moves to top (`order: -1`)

### 3.5 Mission & Vision Section

- **Background:** Full-bleed `bridge-bg.png` with `bg-[#171717]/70` overlay
- **Cards:** Overflow downward by `280px` (absolutely positioned `-bottom-[280px]`)
- **Card style:** White, `shadow-2xl`, `4px` left border accent in `#171717`

> [!IMPORTANT]
> The Mission/Vision cards overflow into the "How It Works" section below. The "How It Works" section compensates with `py-32` (128px top padding) plus a spacer. This is a fragile coupling — any content changes in either section may break the visual alignment.

### 3.6 How It Works (Timeline)

- **Desktop:** Alternating left/right cards connected by horizontal lines to a center vertical line
- **Numbers:** `text-7xl` (desktop) / `text-6xl` (mobile), white bg to mask vertical line
- **Cards:** `max-w-[360px]`, `border: 1px solid #DDD`, `shadow-lg`
- **Mobile:** Stacked vertically, center-aligned (no vertical line)

### 3.7 FAQ Accordion

- **Accent:** `#D4FF00` (neon green) header background
- **Expand:** `max-height` transition from `0` to `300px`
- **Icon:** `+` rotates `45deg` on open (becomes `×`)
- **Content bg:** White `#FCFCFC`

### 3.8 Booking Wizard (4-Step Form)

- **Container:** `max-width: 700px`, `shadow: 0 10px 40px rgba(0,0,0,0.05)`
- **Progress bar:** Horizontal steps with active underline indicator
- **Step transition:** `fadeIn` animation (opacity + translateY)
- **Price preview:** Left border accent in `--faq-green`
- **Form action:** Formspree (`https://formspree.io/f/YOUR_FORM_ID`) — **placeholder, not configured**
- **Mobile:** Button group stacks vertically (`flex-direction: column-reverse`)

### 3.9 Footer

- **Layout:** Logo left, contact card right → stacks on mobile
- **Contact card:** `bg-white/5`, `border: white/10`, `backdrop-blur-sm`
- **Footer links:** Centered, `font-heading`, `tracking-[0.2em]`
- **Watermark:** `BRIDEVOY©` at `12vw`, color `#444`

---

## 4. Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|:---|:---|:---|
| `≤1024px` | Tablet | Reduced padding, about stacks, columns collapse |
| `≤768px` | Mobile | Hamburger menu, hero stacks, timeline linearizes, footer stacks |
| `≤480px` | Small phone | Further padding/font reductions, tighter spacing |
| `≤360px` | Mini phone | Final font-size floor adjustments only |

---

## 5. Interactive Behaviors

| Interaction | Implementation | Status |
|:---|:---|:---|
| Hamburger menu toggle | React state `isMenuOpen`, full-screen overlay | ✅ Working |
| Body scroll lock on menu | `document.body.style.overflow = 'hidden'` | ✅ Working |
| Smooth scroll to anchors | Global click listener, `scrollIntoView` | ✅ Working |
| FAQ accordion | State-driven `max-height` + icon rotation | ✅ Working |
| Booking wizard steps | Multi-step form with validation per step | ✅ Working |
| Real-time price calculator | DOM-based addon checkbox aggregation | ⚠️ Works but anti-pattern |
| Form submission | Formspree integration (async fetch) | ❌ Placeholder ID |
| CTA hover effects | `transition-colors duration-300` | ✅ Working |
| Hero title gradient | CSS `background-clip: text` | ✅ Working |

> [!WARNING]
> **Anti-pattern Alert:** The `handleAddonChange` function uses `document.getElementById` and `document.querySelectorAll` directly instead of React state/refs. This bypasses React's virtual DOM and can cause state synchronization issues.

---

## 6. Asset Inventory & Optimization

### 6.1 Image Assets (in `/public`)

| File | Size | Format | Usage | Production Ready? |
|:---|:---|:---|:---|:---|
| `hero-car-chatgpt.png` | 2.49 MB | PNG | Hero section car | ❌ Too large |
| `mercedes-rear-chatgpt.png` | 2.26 MB | PNG | Why Choose Us center | ❌ Too large |
| `bridge-bg.png` | 2.18 MB | PNG | Mission/Vision bg | ❌ Too large |
| `Picsart_26-05-25_06-46-39-833.png` | 7.45 MB | PNG | Mercedes logo pill | ❌ **Critically large** |
| `Picsart_26-05-25_16-14-51-803.png` | 1.16 MB | PNG | Unused? | ❌ Audit needed |
| `Gemini_Generated_Image_32xckm32xckm32xc.png` | 1.33 MB | PNG | Signature image | ❌ Too large |
| `Gemini_Generated_Image_hzfwcohzfwco.png` | 473 KB | PNG | Logo/Favicon | ⚠️ Acceptable |
| `HEROSECTIONCARDESK.png` | 907 KB | PNG | Possibly unused | ❌ Audit needed |
| `S580.png` | 669 KB | PNG | Possibly unused | ❌ Audit needed |
| `b306a64.png` | 607 KB | PNG | Possibly unused | ❌ Audit needed |
| `b306a642-beb9-4553-b.png` | 622 KB | PNG | About section car | ⚠️ Acceptable |

> [!CAUTION]
> **Total asset weight: ~19.7 MB** — This is catastrophic for performance, especially targeting Nigerian 4G networks as stated in the blueprint. The `Picsart_26-05-25_06-46-39-833.png` file alone is **7.45 MB** for what appears to be a small circular logo.

### 6.2 Required Optimizations

1. **Convert all PNGs to WebP** with AVIF fallback using `<picture>` elements
2. **Resize the Mercedes logo pill image** from 7.45 MB to ≤50 KB (it displays at 64×64px)
3. **Add responsive `srcset`** for the hero car and bridge background
4. **Implement lazy loading** on below-fold images (`loading="lazy"`)  
5. **Remove unused assets** (`HEROSECTIONCARDESK.png`, `S580.png`, `b306a64.png`, `Picsart_26-05-25_16-14-51-803.png`)

---

## 7. Design-to-Code Gap Analysis

### 7.1 Blueprint vs. Implementation — Missing Sections

| Blueprint Section | Status | Notes |
|:---|:---|:---|
| Homepage (Hero) | ✅ Implemented | With modifications to layout |
| About | ✅ Implemented | — |
| Why Choose Us | ✅ Implemented | Content differs from blueprint data |
| Mission/Vision | ✅ Implemented | — |
| How It Works | ✅ Implemented | — |
| FAQ | ✅ Implemented | — |
| Booking Wizard | ✅ Implemented | Formspree placeholder only |
| Footer / Contact | ✅ Implemented | — |
| **Fleet Page** | ❌ Missing | Blueprint specifies 360° tour, Day/Night toggle |
| **Packages Page** | ❌ Missing | No dedicated pricing page with full details |
| **Weddings Portfolio** | ❌ Missing | Blueprint specifies gallery/categories |
| **Corporate Page** | ❌ Missing | Executive services section |
| **Gallery** | ❌ Missing | Visual social proof section |
| **Journal/Blog** | ❌ Missing | SEO authority content |
| **Client Dashboard** | ❌ Missing | Booking status tracking |
| **Admin Dashboard** | ❌ Missing | Payment verification panel |
| **Live Availability Strip** | ❌ Missing | Dynamic status banner |
| **WhatsApp Concierge** | ❌ Missing | Sticky floating button |
| **Trust Metrics Counters** | ❌ Missing | Animated "150+ Weddings" counters |

### 7.2 Dual Styling System Conflict

> [!WARNING]
> The project uses **both Tailwind CSS classes (inline in JSX)** and **vanilla CSS files (style.css, booking-style.css)**. This creates:
> - **Specificity conflicts** between Tailwind utilities and custom CSS
> - **Duplicate responsive breakpoints** (Tailwind's default breakpoints vs. custom media queries)
> - **Maintenance burden** — developers must check two systems for any style change
> - The `style.css` file (1580 lines) appears to be a **legacy version** of the design, while `App.jsx` uses Tailwind classes for the same components

### 7.3 SEO & Meta Issues

| Check | Status | Issue |
|:---|:---|:---|
| Title tag | ✅ | Present and descriptive |
| Meta description | ✅ | Present |
| OG tags | ✅ | Present |
| Twitter cards | ✅ | Present |
| Favicon | ⚠️ | Using full-size PNG instead of proper favicon set |
| Google Analytics | ❌ | Placeholder ID `G-XXXXXXXXXX` |
| Structured data (Schema.org) | ❌ | No JSON-LD for LocalBusiness/Service |
| Canonical URL | ❌ | Missing |
| robots.txt | ❌ | Missing |
| sitemap.xml | ❌ | Missing |

### 7.4 Technical Stack Deviation

| Blueprint Spec | Actual Implementation | Gap |
|:---|:---|:---|
| Next.js 15 | Vite 5 + React 18 | Different framework (no SSR/SSG) |
| Supabase (PostgreSQL) | None | No database layer |
| Sanity CMS | None | No CMS integration |
| Resend / SendGrid | Formspree (placeholder) | No transactional email system |
| PostHog + GA4 | GA4 placeholder only | No analytics operational |
| Vercel hosting | Vercel + Netlify configs | Dual deployment configs |

---

## 8. Accessibility Gaps

| Issue | Severity | Location |
|:---|:---|:---|
| No `aria-expanded` on FAQ buttons | Medium | FAQ accordion |
| No `role="region"` on accordion panels | Medium | FAQ accordion |
| No focus trap in mobile menu | High | Mobile overlay |
| No `aria-label` on social icon link | Low | Footer (has it in JSX, missing in CSS version) |
| Form inputs missing `aria-describedby` for errors | Medium | Booking form |
| Color contrast: `#D4FF00` on white | High | FAQ text on green bg may fail WCAG AA |
| No skip-to-content link | Medium | Page-wide |
| Hamburger spans have no screen reader text | Medium | Mobile nav |

---

## 9. Step-by-Step Implementation Plan

### Phase 1: Asset Optimization & Cleanup (Priority: CRITICAL)

- [ ] **1.1** Compress and convert all images to WebP (target: <200KB each, logo <50KB)
- [ ] **1.2** Remove unused assets (`HEROSECTIONCARDESK.png`, `S580.png`, `b306a64.png`)
- [ ] **1.3** Generate proper favicon set (16×16, 32×32, apple-touch-icon)
- [ ] **1.4** Add `loading="lazy"` to all below-fold images
- [ ] **1.5** Resolve brand color: choose Gold (`#D4AF37`) OR Green (`#D4FF00`) — not both

### Phase 2: Codebase Unification (Priority: HIGH)

- [ ] **2.1** Choose ONE styling approach: migrate fully to Tailwind OR fully to vanilla CSS
- [ ] **2.2** Remove the legacy `style.css` if staying with Tailwind (or vice versa)
- [ ] **2.3** Refactor `handleAddonChange` to use React state instead of DOM queries
- [ ] **2.4** Break `App.jsx` (609 lines) into components: `Navbar`, `Hero`, `About`, `WhyChooseUs`, `MissionVision`, `HowItWorks`, `FAQ`, `BookingWizard`, `Footer`
- [ ] **2.5** Move hardcoded data (FAQ items, journey steps, nav links) into a constants file

### Phase 3: Missing Features — Core (Priority: HIGH)

- [ ] **3.1** Configure Formspree with real form ID (or integrate Resend for invoicing)
- [ ] **3.2** Add WhatsApp floating button (sticky, `position: fixed`, bottom-right)
- [ ] **3.3** Replace GA placeholder with actual Measurement ID
- [ ] **3.4** Add animated trust metrics counters to hero section
- [ ] **3.5** Implement live availability strip/banner

### Phase 4: SEO & Performance (Priority: MEDIUM)

- [ ] **4.1** Add JSON-LD structured data (LocalBusiness + Service schema)
- [ ] **4.2** Add `robots.txt` and `sitemap.xml`
- [ ] **4.3** Add canonical URL meta tag
- [ ] **4.4** Implement proper heading hierarchy audit (currently two `<h1>` elements)
- [ ] **4.5** Add preload hints for critical fonts and hero image

### Phase 5: Accessibility Hardening (Priority: MEDIUM)

- [ ] **5.1** Add `aria-expanded`, `aria-controls` to FAQ accordion
- [ ] **5.2** Implement focus trap in mobile menu overlay
- [ ] **5.3** Add skip-to-content link
- [ ] **5.4** Verify color contrast ratios (especially `#D4FF00` on white)
- [ ] **5.5** Add `aria-describedby` to form inputs for validation messages

### Phase 6: Missing Pages — Expansion (Priority: LOWER)

- [ ] **6.1** Fleet page with vehicle showcase
- [ ] **6.2** Dedicated Packages page with full pricing details
- [ ] **6.3** Gallery / Portfolio page
- [ ] **6.4** Corporate services page
- [ ] **6.5** Journal/Blog section for SEO

### Phase 7: Backend & Infrastructure (Priority: FUTURE)

- [ ] **7.1** Evaluate migration to Next.js 15 (per blueprint) vs. staying with Vite
- [ ] **7.2** Set up Supabase for booking data persistence
- [ ] **7.3** Build admin dashboard for booking management
- [ ] **7.4** Implement transactional email system (Resend) for invoices
- [ ] **7.5** Client dashboard for booking status tracking

---

## 10. Quality Metrics Checklist

| Metric | Target | Current |
|:---|:---|:---|
| Lighthouse Performance | >90 | ❌ Likely <50 (19MB assets) |
| Lighthouse Accessibility | >90 | ⚠️ ~70 (missing ARIA) |
| Lighthouse SEO | >90 | ⚠️ ~75 (missing schema, robots) |
| First Contentful Paint | <1.5s | ❌ Likely >3s |
| Largest Contentful Paint | <2.5s | ❌ Likely >5s (7.4MB image) |
| Total Page Weight | <2MB | ❌ ~19.7MB |
| Mobile Usability | Pass | ⚠️ Mostly works, some overflow issues |
| WCAG 2.1 AA Compliance | Full | ❌ Multiple gaps |

---

> [!TIP]
> **Quick Wins for Immediate Impact:**
> 1. Compress the `Picsart_26-05-25_06-46-39-833.png` (7.4MB → <50KB) — this alone cuts page weight by 38%
> 2. Convert hero car image to WebP — saves ~1.5MB
> 3. Add `loading="lazy"` to all images except hero — immediate perceived performance boost
> 4. Configure the Formspree form ID — makes booking functional immediately
