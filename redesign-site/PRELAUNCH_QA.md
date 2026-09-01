# Hotel Elisabeth pre-launch QA

## Completed

- Multilingual guest-facing content audited across EN, NL, FR, ES and DE.
- Canonical policies enforced: check-in 15:00, check-out 11:00 every day, security deposit €200.
- Hotel star-rating claims removed and guarded by validation.
- Homepage package visibility and guest-facing supporting copy reviewed.
- Hotel Information services and general facilities aligned across all supported languages.
- Low-traffic access URL, hours and camera guidance repaired.
- Meeting-room parking copy no longer states a fixed number of parking spaces.
- Meetings room presentation redesigned as a horizontal editorial gallery: room switching happens above one full-width image stage, the entire photo filmstrip and arrows stay inside the image, capacities are overlaid on the image and practical details open as an in-place drawer without expanding the page.
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

## Still required before launch

- Human visual review on desktop and mobile after the final QA snapshot.
- Final human/legal review of translated Privacy Policy and Terms & Conditions.
- Explicit launch approval before any change to `main`, CNAME, GitHub Pages or Firebase.
- Post-launch verification before retiring the legacy Firebase backup.
