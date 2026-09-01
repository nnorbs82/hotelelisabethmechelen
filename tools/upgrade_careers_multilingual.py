#!/usr/bin/env python3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
pages = root / '.pages.yml'
text = pages.read_text(encoding='utf-8')
old = '''  - name: careers
    label: Careers
    type: collection
    path: redesign-site/content/careers
    exclude: [.gitkeep]
    format: json
    filename:
      template: "{primary}.json"
      field: false
    subfolders: false
    view:
      primary: title
      fields: [title, department, type, status, order]
      sort: [order, title]
      default: { sort: order, order: asc }
    fields:
      - { name: id, label: Internal ID, type: string, hidden: true }
      - { name: order, label: Display order, type: number }
      - name: status
        label: Website status
        type: select
        required: true
        options:
          values:
            - { name: active, label: Active }
            - { name: inactive, label: Inactive }
      - { name: title, label: Job title, type: string, required: true }
      - name: type
        label: Employment type
        type: select
        options:
          values: [Full-time, Part-time, Contract, Temporary, Internship]
      - { name: department, label: Department, type: string }
      - { name: location, label: Location, type: string }
      - { name: description, label: Description, type: text }
      - { name: requirements, label: Requirements, type: text }
      - name: image
        label: Optional job image
        type: image
        options: { media: career_images, extensions: [jpg, jpeg, png, webp] }
'''
new = '''  - name: careers
    label: Careers
    type: collection
    path: redesign-site/content/careers
    exclude: [.gitkeep]
    format: json
    filename:
      template: "{primary}.json"
      field: false
    subfolders: false
    view:
      primary: title_en
      fields: [title_en, department_en, type, status, order]
      sort: [order, title_en]
      default: { sort: order, order: asc }
    fields:
      - { name: id, label: Internal ID, type: string, hidden: true }
      - { name: order, label: Display order, type: number }
      - name: status
        label: Website status
        type: select
        required: true
        options:
          values:
            - { name: active, label: Active }
            - { name: inactive, label: Inactive }
      - { name: title_en, label: "Job title - English", type: string, required: true }
      - { name: title_nl, label: "Job title - Dutch", type: string }
      - { name: title_fr, label: "Job title - French", type: string }
      - { name: title_es, label: "Job title - Spanish", type: string }
      - { name: title_de, label: "Job title - German", type: string }
      - name: type
        label: Employment type
        type: select
        options:
          values: [Full-time, Part-time, Contract, Temporary, Internship]
      - { name: department_en, label: "Department - English", type: string }
      - { name: department_nl, label: "Department - Dutch", type: string }
      - { name: department_fr, label: "Department - French", type: string }
      - { name: department_es, label: "Department - Spanish", type: string }
      - { name: department_de, label: "Department - German", type: string }
      - { name: location_en, label: "Location - English", type: string }
      - { name: location_nl, label: "Location - Dutch", type: string }
      - { name: location_fr, label: "Location - French", type: string }
      - { name: location_es, label: "Location - Spanish", type: string }
      - { name: location_de, label: "Location - German", type: string }
      - { name: description_en, label: "Description - English", type: text }
      - { name: description_nl, label: "Description - Dutch", type: text }
      - { name: description_fr, label: "Description - French", type: text }
      - { name: description_es, label: "Description - Spanish", type: text }
      - { name: description_de, label: "Description - German", type: text }
      - { name: requirements_en, label: "Requirements - English", type: text }
      - { name: requirements_nl, label: "Requirements - Dutch", type: text }
      - { name: requirements_fr, label: "Requirements - French", type: text }
      - { name: requirements_es, label: "Requirements - Spanish", type: text }
      - { name: requirements_de, label: "Requirements - German", type: text }
      - name: image
        label: Optional job image
        type: image
        options: { media: career_images, extensions: [jpg, jpeg, png, webp] }
'''
if old not in text:
    raise SystemExit('Careers CMS block not found')
pages.write_text(text.replace(old, new, 1), encoding='utf-8')

js = root / 'redesign-site' / 'assets' / 'careers.js'
source = js.read_text(encoding='utf-8')
source = source.replace("location:'Location'},", "location:'Location',fullTime:'Full-time',partTime:'Part-time',contract:'Contract',temporary:'Temporary',internship:'Internship'},")
source = source.replace("location:'Locatie'},", "location:'Locatie',fullTime:'Voltijds',partTime:'Deeltijds',contract:'Contract',temporary:'Tijdelijk',internship:'Stage'},")
source = source.replace("location:'Lieu'},", "location:'Lieu',fullTime:'Temps plein',partTime:'Temps partiel',contract:'Contrat',temporary:'Temporaire',internship:'Stage'},")
source = source.replace("location:'Ubicación'},", "location:'Ubicación',fullTime:'Tiempo completo',partTime:'Tiempo parcial',contract:'Contrato',temporary:'Temporal',internship:'Prácticas'},")
source = source.replace("location:'Ort'}", "location:'Ort',fullTime:'Vollzeit',partTime:'Teilzeit',contract:'Vertrag',temporary:'Befristet',internship:'Praktikum'}")
anchor = "  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[key]||item?.[`${key}_en`]||'';\n"
addition = anchor + "  const employmentType=value=>({\n    'Full-time':t().fullTime,'Part-time':t().partTime,'Contract':t().contract,'Temporary':t().temporary,'Internship':t().internship\n  }[value]||value||'');\n"
if anchor not in source:
    raise SystemExit('Careers localized helper not found')
source = source.replace(anchor, addition, 1)
source = source.replace("      const type=localized(job,'type');", "      const type=employmentType(job.type);")
js.write_text(source, encoding='utf-8')
print('Careers CMS and frontend upgraded for five-language vacancies.')
