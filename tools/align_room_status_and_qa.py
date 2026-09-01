#!/usr/bin/env python3
from pathlib import Path
import json

root=Path(__file__).resolve().parents[1]
pages=root/'.pages.yml'
text=pages.read_text(encoding='utf-8')
old='''                - { name: available, label: Visible / available }\n                - { name: unavailable, label: Hidden / unavailable }'''
new='''                - { name: available, label: Visible / available }\n                - { name: offline, label: Hidden / offline }\n                - { name: unavailable, label: Hidden / unavailable }'''
if old not in text:
    raise SystemExit('Room status options anchor not found')
pages.write_text(text.replace(old,new,1),encoding='utf-8')

# Correct the internally contradictory City Suite occupancy typo. The same source
# description explicitly defines bookings for 3-4 guests and a double bed + 2-person sofa bed.
city_suite=root/'redesign-site/content/rooms/room_1769698293173.json'
data=json.loads(city_suite.read_text(encoding='utf-8'))
if data.get('maxOccupancy') == 14:
    data['maxOccupancy']=4
city_suite.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

qa=root/'redesign-site/CONTENT_QA.md'
qa.write_text('''# Hotel Elisabeth content QA\n\nThis file tracks source-content contradictions that should be resolved before production launch. It is not displayed on the website.\n\n## Resolved during migration\n\n- City Suite `maxOccupancy` was `14`, while the same room record says the suite has one double bed plus a 2-person sofa bed and explicitly describes bookings for 3 to 4 guests. It has been corrected to `4`.\n\n## Requires hotel review before launch\n\n- Check-in/check-out wording is inconsistent between the current Hotel Info source and the existing Terms & Conditions source. Hotel Info currently states check-in from 15:00 and check-out by 11:00. The Terms source states check-in from 14:00 and weekday check-out at 10:00 / weekend at 11:00. These source texts should be reconciled before production.\n- The Hotel Info traffic text inherited a malformed `ttps://www.mechelen.be/autoluw` URL in EN/NL. The redesign should only publish a corrected verified link during final content QA rather than silently relying on the malformed source string.\n- Privacy Policy and Terms & Conditions currently have source-approved EN/NL/FR content only. ES/DE remain on English fallback until reviewed legal translations are supplied or approved.\n''',encoding='utf-8')
print('Aligned room status options, corrected City Suite occupancy, and recorded content QA flags.')
