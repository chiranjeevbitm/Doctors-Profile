# Design System Document: The Clinical Atelier

## 1. Overview & Creative North Star
**Creative North Star: "The Empathetic Authority"**

To design for Dr. Deepak Kumar is to balance the precision of a surgeon with the warmth of a caregiver. This design system rejects the "stiff" corporate medical template in favor of a **High-End Editorial** experience. We move beyond standard grids by embracing **intentional asymmetry** and **tonal layering**. 

The system utilizes a "Breathing Room" philosophy—using expansive white space and high-contrast typography scales to guide the eye. By layering surfaces rather than boxing them in, we create a digital environment that feels open, transparent, and sophisticated. It is not just a website; it is a digital sanctuary of health and trust.

---

## 2. Colors: Tonal Depth & Soul
The palette is rooted in a deep `primary` navy (#184275) for authority, balanced by `secondary` sky blues and `tertiary` teal accents to signify vitality.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through background color shifts. Use `surface-container-low` (#f2f4f6) for a section background to distinguish it from the main `background` (#f7f9fb). This creates a seamless, high-end feel that feels "carved" rather than "drawn."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine paper. 
- **Base:** `surface` (#f7f9fb)
- **Primary Content Areas:** `surface-container-low` (#f2f4f6)
- **Interactive Cards/Floating Elements:** `surface-container-lowest` (#ffffff)
- **Nested Detail Trays:** `surface-container-high` (#e6e8ea)

### The "Glass & Gradient" Rule
To inject "soul" into the clinical setting, use subtle gradients for Hero backgrounds and primary CTAs. Transition from `primary` (#184275) to `primary_container` (#34598e) at a 135-degree angle. For floating navigation or modals, apply **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop-blur to allow colors to bleed through organically.

---

## 3. Typography: Editorial Authority
The typography uses a dual-font strategy: **Manrope** for high-impact display moments and **Inter** for functional, high-readability data.

*   **Display & Headlines (Manrope):** These are your "Editorial Voice." Use `display-lg` (3.5rem) for hero statements with tight letter-spacing (-0.02em) to command attention. The geometric nature of Manrope provides the "Modern" edge.
*   **Titles & Body (Inter):** Inter is the "Functional Voice." It provides a clinical, neutral clarity. 
*   **The Hierarchy of Trust:** Large, bold headlines (`headline-lg`) paired with generous line-height (1.6) in `body-lg` creates an approachable, easy-to-digest reading experience for patients who may be under stress.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "heavy" for a medical context. We use **Tonal Layering** to convey importance.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#ffffff) card atop a `surface-container-low` (#f2f4f6) background. The subtle 2% difference in luminosity creates a "soft lift."
*   **Ambient Shadows:** For high-priority floating elements (e.g., "Book Appointment" fab), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(25, 28, 30, 0.06);`. The shadow color is a tint of `on-surface` to mimic natural light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility on inputs, use `outline-variant` (#c2c6d4) at **15% opacity**. Never use 100% opaque lines.
*   **Glassmorphism Depth:** Layer semi-transparent `surface_container_lowest` elements over teal `tertiary` accents to create a "frosted teal" glow, adding a premium, tactile quality.

---

## 5. Components: Soft Precision

### Buttons
*   **Primary:** A gradient from `primary` to `primary_container`. `Border-radius: 0.75rem (md)`. No shadow on rest; a soft ambient shadow on hover.
*   **Secondary:** Ghost style. No background, `primary` text, and a `Ghost Border` (outline-variant at 20%) that becomes 100% opaque on hover.
*   **Tertiary:** `tertiary` text (#004949) with no border, used for low-emphasis actions like "Learn More."

### Input Fields
*   **Structure:** Use `surface_container_low` as the fill. 
*   **Focus State:** Transition the background to `surface_container_lowest` and add a 2px `primary` bottom-border (not a full box) for a sophisticated "form" feel.
*   **Radius:** Always `0.5rem (DEFAULT)`.

### Cards & Lists
*   **Strict Rule:** No divider lines. Use `1.5rem (xl)` of vertical white space to separate list items. 
*   **Medical Cards:** Use `surface-container-lowest` with `1rem (lg)` rounded corners. If multiple cards are used, stagger them slightly in a masonry-lite layout to break the rigid grid.

### Specialized Medical Components
*   **The "Patient Pulse" Chip:** Use `tertiary_fixed` (#93f2f2) backgrounds with `on_tertiary_fixed` (#002020) text for status indicators (e.g., "Available Today").
*   **The Health Gradient Progress Bar:** For patient recovery or goal tracking, use a gradient from `secondary` (#0c6780) to `tertiary_container` (#006363).

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. A left-aligned headline with a right-aligned image that overlaps the next section's background color.
*   **Do** use `surface-dim` (#d8dadc) for footer backgrounds to anchor the experience.
*   **Do** prioritize Inter for all data-heavy tables or medical results.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#191c1e) for text to maintain a softer, premium contrast.
*   **Don't** use the `full` (9999px) roundedness for anything other than small chips or tags. It looks too "bubbly" and diminishes the professional authority.
*   **Don't** use more than one "Glass" element per screen to avoid visual clutter and performance lag.