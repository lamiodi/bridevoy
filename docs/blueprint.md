# Website Blueprint: BrideVoy

**Project:** Luxury chauffeur landing page and booking experience  
**Market:** Lagos, Nigeria  
**Experience Type:** Single-page marketing site with guided reservation flow  
**Tagline:** The Art of Grand Arrival

---

## 1. Project Overview

### 1.1 Brand Positioning
- **Brand:** BrideVoy
- **Offer:** Premium chauffeur-led transportation for weddings, executive occasions, proposals, airport pickups, and VIP movement.
- **Core Promise:** Calm coordination, elegant presentation, punctual movement, and a polished luxury arrival experience.
- **Primary Vehicle Story:** Mercedes-Benz S-Class chauffeur service.

### 1.2 Core Objectives
1. **Luxury Presence:** Present BrideVoy as a refined, premium Lagos chauffeur brand.
2. **Lead Capture:** Convert visitors through a clear booking wizard and strong CTA placement.
3. **Trust Building:** Use polished visuals, structured booking steps, and clear caution-fee messaging.
4. **Fast Contact Path:** Keep WhatsApp and direct booking entry visible throughout the experience.

### 1.3 Brand Expression
- Primary visual tone remains dark, minimal, and editorial.
- The live accent color is a soft champagne tone: **`#f9ffd6`**.
- Accent usage is reserved for CTAs, hover states, progress indicators, and editorial highlights.

---

## 2. Target Audience

### Primary Audience
- Affluent couples planning weddings in Lagos.
- Wedding planners and coordinators managing high-touch event logistics.

### Secondary Audience
- Executive and VIP clients needing discreet, premium transport.
- Clients booking proposals, airport movement, or private occasion transfers.

### Key Expectations
- Professional presentation
- Reliability in Lagos traffic
- Comfortable luxury vehicle experience
- Fast response and clear next steps

---

## 3. Current Site Architecture

### 3.1 Navigation Model
The current client-approved experience is a **single-page site**, not a multi-page platform.

### 3.2 Section Order
1. **Preloader**
2. **Navbar**
3. **Hero**
4. **About BrideVoy**
5. **Why Choose Us**
6. **Mission & Vision**
7. **How It Works**
8. **FAQ**
9. **Booking Wizard**
10. **Footer Contact Block**
11. **Sticky WhatsApp Button**
12. **First-Visit Intro Card** (non-blocking bottom sheet, shown only on first visit / after dismissal TTL)

### 3.3 Primary CTAs
- **Reserve Your Date** in hero
- **Reserve Your Date** inside navigation
- **Reserve Your Date** in footer
- **Sticky WhatsApp** for instant conversation
- **Reserve Your Date** inside the first-visit intro card

---

## 4. Detailed Section Specifications

### 4.1 Hero Section
- Large typographic brand statement with the BRIDEVOY wordmark in the background.
- Center-stage Mercedes-Benz hero image.
- Left-side CTA driving users to the booking form.
- Supporting vehicle descriptor content: Mercedes-Benz S-580 AMG, quiet luxury, comfort, and style positioning.
- Layout is intentionally editorial and asymmetrical on desktop, then stacks into a centered mobile composition.

### 4.2 About Section
- Dark luxury section introducing BrideVoy as a premium chauffeur experience for weddings and executive occasions.
- Reinforces comfort, discretion, punctuality, and event-level coordination.
- Includes supporting vehicle image, signature asset, and a live-count style trust metric for weddings completed.

### 4.3 Packages & Pricing (Localized)
The current approved implementation does **not** use a dedicated public pricing table.  
Instead, package logic is represented through **duration-based booking selection** inside the reservation flow.

- **Duration Options:** 6-hour, 8-hour, and 12-hour bookings.
- **Localized Positioning:** The service language and flow are tailored to Lagos luxury events where timing, routing, and coordination matter.
- **Add-ons Available:** Champagne Upgrade, Security Escort, Floral Upgrade, Extra Stop.
- **Fixed Notice:** A mandatory **N300,000 caution fee** is displayed clearly inside the booking flow.
- **Commercial Model:** Final invoice and exact pricing are handled after form submission rather than through an upfront package grid.

### 4.4 Why Choose Us
- Four trust pillars communicate punctuality, discretion, vehicle preparation, and wedding coordination.
- Center image anchors the section visually while feature cards sit left and right on larger screens.
- Mobile layout stacks all content for easier scanning.

### 4.5 Mission & Vision
- Full-width atmospheric image background with dark overlay.
- Two floating white cards define the brand mission and vision.
- Desktop layout overlaps the next section intentionally for a premium editorial feel.
- Mobile layout converts this overlap into a stacked flow for clarity and responsiveness.

### 4.6 How It Works
- Four-step customer journey:
  1. Share Your Date
  2. Confirm Your Route
  3. Choose Your Duration
  4. Secure Your Booking
- Desktop uses an alternating timeline composition.
- Mobile switches to a vertically stacked card pattern with large step numbers.

### 4.7 FAQ
- Accordion-style question and answer block.
- Focuses on inclusions, booking lead time, caution fee visibility, and standby flexibility.
- Built for fast scanning and low-friction reassurance.

### 4.8 Booking Wizard
- Four-step guided reservation form.
- Collects event type, date, time, route details, booking duration, add-ons, and client contact details.
- Ends with a reservation request submission and a success-state confirmation message.
- Messaging states clearly that the caution fee applies and payment confirmation is required to secure the date.

### 4.9 Footer Contact Section
- Repeats the reservation CTA for users who reach the end of the page.
- Positions BrideVoy as a Lagos booking desk for weddings, proposals, airport pickups, and VIP movement.
- Includes Instagram access and footer navigation.

### 4.10 Sticky WhatsApp CTA
- Persistent floating WhatsApp button remains visible while browsing.
- Gives users an immediate conversation path without interrupting the main page flow.

### 4.11 First-Visit Intro Card
- A lightweight, non-blocking bottom sheet introduces BrideVoy on first visit.
- Uses editorial imagery, concise copy, and a single primary CTA to reserve a date.
- Can be dismissed with a close button, Escape key, or a "Maybe Later" action.
- Does not block the rest of the page or interrupt scrolling.

---

## 5. Reservation Flow

### 5.1 Booking Logic
The implemented booking flow is a **4-step wizard**:

#### Step 1 - Event
- Event type
- Event date
- Pickup time

#### Step 2 - Route
- Pickup address
- Drop-off address

#### Step 3 - Duration
- 6-hour, 8-hour, or 12-hour booking selection
- Optional add-ons
- Caution-fee notice

#### Step 4 - Client Details
- Full name
- Email address
- WhatsApp number
- Special requests

### 5.2 Validation Rules
- Event date cannot be in the past.
- Pickup time is required.
- Pickup and drop-off addresses are required.
- Name, email, and phone are required before submission.

### 5.3 Submission Behavior
- Form submits reservation data to Formspree.
- Successful submission shows a thank-you confirmation state.
- Current confirmation copy tells users that payment confirmation is still required before the date is secured.

---

## 6. Responsive Behavior

### 6.1 Navigation
- Desktop uses a horizontal nav layout.
- Mobile switches to a full-screen overlay menu with an accessible toggle button.

### 6.2 Section Adaptation
- Hero content compresses and centers on small screens.
- About, Why Choose Us, and Footer move from side-by-side layouts to stacked layouts.
- Mission/Vision cards stop overlapping and flow vertically on smaller screens.
- How It Works changes from alternating timeline to vertical mobile cards.
- Booking wizard keeps actions full-width on mobile for easier tapping.
- The first-visit intro card stays as a bottom sheet across breakpoints and stacks its image/copy on smaller screens.

### 6.3 Accessibility and Motion
- Skip links are present.
- Reduced-motion preference disables most animation-heavy behavior.
- Smooth anchor navigation supports section-based browsing.

---

## 7. Functional Requirements

### 7.1 Frontend Behavior
- Section-based landing page experience
- Animated reveals using Framer Motion
- Scroll-triggered section transitions
- Mobile navigation overlay
- Sticky WhatsApp contact CTA
- First-visit intro card with timed reveal and dismissal persistence

### 7.2 Booking System
- Guided 4-step form
- Inline validation and error handling
- Add-on selection
- Formspree submission endpoint
- Success state after submission

### 7.3 Content and Brand Requirements
- Visual tone must stay premium, minimal, and editorial.
- Language should stay calm, confident, and luxury-focused.
- Lagos context should remain visible in service framing and logistics language.

---

## 8. Technical Stack

| Layer | Technology | Current Use |
| :--- | :--- | :--- |
| Frontend | React 18 | Main application framework |
| Build Tool | Vite 5 | Development and production builds |
| Styling | Tailwind CSS + custom CSS | Layout, spacing, typography, responsive behavior |
| Motion | Framer Motion | Section reveals, menu transitions, CTA animation |
| Form Handling | Native React state | Wizard flow, validation, submission state |
| Form Delivery | Formspree | Reservation submission endpoint |
| Hosting | Static hosting compatible | Vercel / Netlify style deployment |

---

## 9. Content Notes

### 9.1 What the Current Site Emphasizes
- Luxury chauffeur identity
- Mercedes S-Class positioning
- Calm and elegant booking experience
- Wedding and executive mobility in Lagos

### 9.2 What the Current Site Does Not Yet Expose Publicly
- Full package price cards
- Live availability
- Payment dashboard
- Admin dashboard
- Client dashboard
- Automated invoice workflow inside the frontend itself

These can remain future enhancements, but they are **not part of the current client-approved page logic**.

---

## 10. Future Enhancement Opportunities

1. Add a dedicated packages section if the business wants public pricing later.
2. Replace placeholder WhatsApp, Instagram, and Formspree values with production details.
3. Add invoice automation after submission if the operation moves beyond simple lead capture.
4. Add analytics and conversion tracking once campaign traffic begins.
