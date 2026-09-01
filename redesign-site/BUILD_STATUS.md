# Hotel Elisabeth redesign site

This directory is the permanent development build for the approved Hotel Elisabeth redesign.

- Development branch: `elisabeth-redesign`
- Production branch `main` remains untouched at the protected legacy production checkpoint.
- Visual architecture complete for Home, Rooms, Facilities, Packages, Meetings, Info, Attractions, Group Request, Careers, Hotel Policies, Privacy and Terms.
- Five-language interface: EN / NL / FR / ES / DE.
- CMS: Pages CMS configuration is present in `.pages.yml`.
- Editable hotel content is stored under `redesign-site/content/`.
- Frontend reads generated static indexes under `redesign-site/content/generated/`.
- CMS edits automatically rebuild browser-facing indexes through `.github/workflows/rebuild-redesign-content.yml`.
- Rooms, packages, facilities, meetings, attractions, amenities, careers, homepage, hotel information and legal content are represented in the CMS model.
- Public room, package, facility, meeting, attraction and homepage media have been migrated into Git-managed `images/elisabeth/` folders.
- Legacy Firebase Storage URLs have been removed from the active CMS content and generated redesign indexes.
- Production assembly is handled by `tools/build_production_site.py`.
- Production validation checks canonical routes, SEO metadata, internal references, Mews booking, meeting/group enquiry integrations, and rejects any Firebase Storage dependency in the assembled output.
- Current multilingual content audit: Rooms, Packages, Facilities, Meetings, Attractions, Hotel Info and Homepage have complete EN/NL/FR/ES/DE content coverage. Privacy Policy and Terms & Conditions still require Spanish and German legal translations.
- Firebase remains untouched only as a legacy backup until final launch approval and post-launch verification.
- No production cutover or change to `main`, CNAME or the live GitHub Pages site is permitted without explicit final approval.
