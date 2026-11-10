# Hotel Elisabeth content QA

This file tracks source-content contradictions that should be resolved before production launch. It is not displayed on the website.

## Resolved during migration

- City Suite `maxOccupancy` was `14`, while the same room record says the suite has one double bed plus a 2-person sofa bed and explicitly describes bookings for 3 to 4 guests. It has been corrected to `4`.

## Requires hotel review before launch

- Check-in/check-out wording is inconsistent between the current Hotel Info source and the existing Terms & Conditions source. Hotel Info currently states check-in from 15:00 and check-out by 11:00. The Terms source states check-in from 14:00 and weekday check-out at 10:00 / weekend at 11:00. These source texts should be reconciled before production.
- The Hotel Info traffic text inherited a malformed `ttps://www.mechelen.be/autoluw` URL in EN/NL. The redesign should only publish a corrected verified link during final content QA rather than silently relying on the malformed source string.
- Privacy Policy and Terms & Conditions currently have source-approved EN/NL/FR content only. ES/DE remain on English fallback until reviewed legal translations are supplied or approved.
