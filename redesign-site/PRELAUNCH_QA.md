# Hotel Elisabeth pre-launch QA

## Completed

- Multilingual guest-facing content audited across EN, NL, FR, ES and DE.
- Canonical policies enforced: check-in 15:00, check-out 11:00 every day, security deposit €200.
- Hotel star-rating claims removed and guarded by validation.
- Homepage package visibility and guest-facing supporting copy reviewed.
- Homepage opening slideshow now contains five images, with the Cathedral View room image first and multilingual alt text for all five supported languages.
- Pages CMS editing flow tested end-to-end on `elisabeth-redesign`: a homepage text change was saved, rebuilt into generated content, verified in preview and restored successfully.
- Pages CMS media management tested end-to-end: a new homepage WebP image was uploaded into the Git-managed media library and successfully consumed by the CMS-driven slideshow.
- Hotel Information services and general facilities aligned across all supported languages.
- Homepage shared-space feature corrected to Courtyard, Lobby, Patio and Bar, with localized labels and supporting copy across EN, NL, FR, ES and DE.
- Low-traffic access URL, hours and camera guidance repaired.
- Meeting-room parking copy no longer states a fixed number of parking spaces.
- Meetings final presentation reviewed and approved in preview: cinematic two-space experience related to the Rooms visual language, with a prominent Oud Huys / Rooftop selector, fixed in-view photo navigation, full-screen image viewing, planning-details drawer and direct request CTA.
- Package, meeting-room, room and attraction content audited for stale or contradictory information.
- City Suite bathtub amenity corrected after room-detail verification.
- Current Visit Mechelen links and time-sensitive attraction guidance refreshed.
- Meeting date picker uses browser-local date handling.
- Group Request exposes active step state to assistive technology and uses an accessible form-status error for telephone validation.
- Keyboard focus styling added across interactive controls.
- Homepage slideshow and meeting gallery respect reduced-motion preferences.
- Mobile menu moves focus into the open navigation, contains keyboard focus while open and returns focus on Escape.
- Language selector exposes expanded state and controlled-menu relationship.
- Production accessibility validation checks page language, viewport, meta descriptions, duplicate IDs, image alt attributes, safe new-tab links, skip/main structure, H1 structure, labelled controls and accessible button names.
- Missing meta descriptions corrected on Careers, Hotel Policies, Privacy Policy and Terms & Conditions.
- Mews booking links and EmailJS meeting/group integrations remain covered by production validation.
- Firebase Storage is absent from the active production assembly.
- Final mobile visual QA completed across the redesign after the Home, Hotel Information and Meetings horizontal-drift fixes. Shared mobile viewport containment now protects all guest-facing redesign pages while preserving intentional component scrollers, and the final phone check was approved on 1 September 2026.
- Privacy Policy and Terms & Conditions revised across EN, NL, FR, ES and DE following management confirmation: rate-plan-specific cancellation rules, group agreement terms, €24 parking periods from 14:00 to 14:00, consumer-law-safe liability wording, and tokenized payment-card handling with no full card storage by the hotel or PMS.
- Existing Google Analytics property retained behind a multilingual consent interface. Google Analytics is not loaded before consent, optional analytics can be rejected without affecting site access, and visitors can reopen Privacy settings to withdraw or grant consent later.

## Still required before launch

- Final visual/read sign-off of the revised Privacy Policy, Terms & Conditions and privacy-consent interface.
- Explicit launch approval before any change to `main`, CNAME, GitHub Pages or Firebase.
- Post-launch verification before retiring the legacy Firebase backup.
