# Hotel Elisabeth production readiness

## Completed

- All redesign work remains isolated from the live `main` branch.
- All public room, package, facility, meeting and attraction photography used by the redesign has been migrated from Firebase Storage to Git-managed media.
- Dynamic hotel content is editable through Pages CMS source records and automatically rebuilt into static website indexes.
- Public hotel content is populated in EN/NL/FR/ES/DE for rooms, packages, amenities, facilities, meetings, hotel information and attractions.
- Homepage package picks obey the CMS `showInOurPicks` field.
- Mobile/reduced-motion variants exist for the major designer interactions.
- Keyboard skip navigation, focus visibility and form autofill hints are implemented.
- Preview pages remain `noindex,nofollow`.

## Must be resolved or explicitly approved before production cutover

1. Reconcile the source conflict between Hotel Info and Terms & Conditions for check-in/check-out times.
2. Review/approve Spanish and German legal translations for Privacy Policy and Terms & Conditions, or explicitly approve English legal fallback for those two languages.
3. Perform live end-to-end test submissions of both Meeting Request and Group Request to confirm the EmailJS inbox/template delivery.
4. Perform final Mews booking tests in all five languages, including date/guest handoff from the custom booking bar.
5. Decide final analytics/consent implementation. The redesign should not load non-essential analytics before consent.
6. At final cutover only: move the approved redesign to production routes, remove preview `noindex`, add production canonical/hreflang/structured data/sitemap, correct final hotel schema fields, and update hosting/domain configuration if needed.
7. Keep the current Firebase project intact until after the new production site has been verified and the rollback window has passed.
