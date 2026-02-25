# Page Design Specification (Desktop-first)

## Global Styles (Design Tokens)
- Background: light grey (e.g., #F3F4F6)
- Surface/cards: white (#FFFFFF) with subtle border (#E5E7EB) and soft shadow
- Text: near-black (#111827) + muted text (#4B5563)
- Accent (buttons/links): deep blue or contractor-friendly color (e.g., #1D4ED8)
- Typography scale:
  - H1 40–48px, H2 28–32px, H3 20–22px, Body 16–18px
- Buttons:
  - Primary: solid accent background, white text, 10–12px vertical padding, 16–20px horizontal padding
  - Hover: darken accent 5–10%, show focus ring for keyboard navigation
- Links: accent color, underline on hover
- Layout container: max-width 1100–1200px, centered, 24–32px side padding
- Section spacing: 72–96px vertical padding per section

## Page: One-page Website

### Layout
- Use a stacked vertical layout (single column sections) with a consistent centered content container.
- Use CSS Grid for card layouts (Services, Gallery) and Flexbox for nav alignment.
- Desktop-first rules:
  - Services: 3-column card grid; collapses to 2/1 columns at smaller breakpoints.
  - Gallery: 3–4 column image grid; collapses responsively.

### Meta Information
- Title: “Painting Contractor | Interior & Exterior Painting”
- Description: “Professional painting services. View services, gallery, and contact us for a quote.”
- Open Graph:
  - og:title, og:description aligned with above
  - og:type: website
  - og:image: representative hero/gallery image

### Page Structure (Top → Bottom)
1. Sticky Top Navigation
2. Home (Hero)
3. About
4. Services
5. Gallery
6. Contact + Fixed-bottom Contact Form (anchored to page content)

### Sections & Components

#### 1) Sticky Top Navigation
- Left: brand/name
- Right: anchor links: Home, About, Services, Gallery, Contact
- Behavior:
  - Stays at top while scrolling
  - Active/hover state indicates interactivity

#### 2) Home (Hero)
- Left aligned headline (H1) + short value statement
- Primary CTA button: “Request a Quote” (scrolls to Contact)
- Optional supporting line: service area / availability

#### 3) About
- Two-column layout on desktop:
  - Column A: short story/credentials
  - Column B: highlights list (e.g., “Clean lines”, “On-time”, “Licensed/insured” if you choose to display)

#### 4) Services
- Grid of service cards (3 across on desktop)
- Each card:
  - Service name (H3)
  - 1–2 line description

#### 5) Gallery
- Responsive image grid with consistent aspect ratio thumbnails
- Clicking an image (optional) can open a simple lightbox; if omitted, show static images only

#### 6) Contact
- Content area:
  - Basic contact details (phone/email/service area)
  - Short “What to include” hint text

##### Fixed-bottom Contact Form (Fixed to bottom of page content)
- Placement: visually docked at the bottom of the page content (below Contact details).
- Recommended behavior to match “fixed” without hiding content:
  - Use a bottom-docked bar inside the page container via `position: sticky; bottom: 0;`.
  - Add bottom padding to the page content equal to the form height to prevent overlap.
- Fields (minimal): Name, Email/Phone, Message
- Actions:
  - Primary “Send” button
  - Inline validation messages (required fields)
- Visual treatment:
  - White surface, subtle shadow/border to separate from the grey background
  - Keeps the form easy to locate while the user is near the bottom of the page
