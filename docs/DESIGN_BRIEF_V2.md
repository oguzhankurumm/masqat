# Design Brief v2: Masq Lounge Premium UI (2026)

## 1. Vision
To transform the "Masq Lounge QR Menu" into a visually immersive, editorial-grade digital experience that feels like a native app. The design will shift from a functional utility to a "seductive" interface that enhances the lounge atmosphere.

## 2. Visual Language

### Color Palette
*   **Background:** Deep Charcoal `zinc-950` (#09090b) with subtle radial gradients to add depth.
*   **Surface:** Layered darks.
    *   `Surface 1`: `zinc-900` (#18181b) - Cards
    *   `Surface 2`: `zinc-800` (#27272a) - Modals/Sheets
*   **Primary Accent:** Electric Violet `violet-500` (#8b5cf6) to `violet-600` for primary actions.
*   **Secondary Accent:** Warm Gold `amber-400` (#fbbf24) for special highlights (Signature dishes, prices).
*   **Text:**
    *   Headings: White (#fafafa)
    *   Body: Zinc-400 (#a1a1aa)
    *   Muted: Zinc-600 (#52525b)

### Typography
*   **Font:** **Space Grotesk** (Variable)
*   **Usage:**
    *   Headings: Tight tracking (`-0.02em` to `-0.04em`), uppercase for sections.
    *   Body: Regular tracking, high readability.
    *   Price: Monospace or tabular nums for alignment.

### Shapes & Spacing
*   **Radius:** `xl` (1rem/16px) to `2xl` (1.5rem/24px) for cards. `full` (9999px) for buttons/pills.
*   **Spacing:** Generous. 24px (1.5rem) minimum padding inside cards.
*   **Borders:** Thin, subtle. `white/5` or `white/10`. No harsh lines.

### Effects
*   **Glassmorphism:** Used sparingly on sticky headers and floating action buttons.
*   **Gradients:** "Spotlight" effects on card hover.
*   **Shadows:** Colored shadows (`shadow-violet-500/20`) for primary actions to create a "glow".

## 3. Component Patterns

### Cards (The "Lounge" Card)
*   **Image-Forward:** Images take up 50-60% of the card or are used as full backgrounds with gradient overlays.
*   **Interaction:** "Lift" on hover (`-translate-y-1`), subtle border lighten.
*   **Content:** Minimal text. Title + Price are prominent. Ingredients hidden or truncated.

### Navigation (Mobile-First)
*   **Sticky Header:** Minimal height, glass effect.
*   **Category Pills:** Horizontal scroll, active state has a "glow".
*   **Search:** Collapsible or persistent pill.

### Product Detail (The "Showcase")
*   **Hero:** Full-width top image with bottom fade.
*   **Typography:** Large, editorial title.
*   **Layout:** Content scrolls *over* the bottom of the image.

## 4. UX Improvements
*   **Thumb Zone:** All primary interactions (Add, Close, Navigate) in the bottom 50% of the screen.
*   **Feedback:** Toast notifications for all actions.
*   **Empty States:** Helpful, visual instructions instead of "No data".

## 5. Admin Interface
*   **Cleanliness:** Reduce visual noise. Remove unnecessary borders.
*   **Focus:** Content-first. Tables have relaxed density.
*   **Actions:** Clear primary vs. secondary actions.
