#!/usr/bin/env python3
"""Lightweight static accessibility checks for assembled Hotel Elisabeth HTML."""
from __future__ import annotations

import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.html_lang = ""
        self.has_viewport = False
        self.has_description = False
        self.ids: list[str] = []
        self.images_without_alt: list[str] = []
        self.unsafe_blank_links: list[str] = []
        self.main_ids: list[str] = []
        self.skip_links: list[str] = []
        self.h1_count = 0
        self.label_for: set[str] = set()
        self.label_depth = 0
        self.controls: list[tuple[str, str, bool]] = []
        self.button_stack: list[dict[str, object]] = []
        self.unnamed_buttons: list[str] = []

    @staticmethod
    def attrs_dict(attrs):
        return {key: value if value is not None else "" for key, value in attrs}

    def handle_starttag(self, tag, attrs):
        data = self.attrs_dict(attrs)
        element_id = data.get("id", "")
        if element_id:
            self.ids.append(element_id)

        if tag == "html":
            self.html_lang = data.get("lang", "").strip()
        elif tag == "meta":
            if data.get("name", "").lower() == "viewport":
                self.has_viewport = bool(data.get("content", "").strip())
            if data.get("name", "").lower() == "description":
                self.has_description = bool(data.get("content", "").strip())
        elif tag == "img":
            if "alt" not in data:
                self.images_without_alt.append(data.get("src", "<unknown image>"))
        elif tag == "a":
            href = data.get("href", "")
            if "skip-link" in data.get("class", "").split():
                self.skip_links.append(href)
            if data.get("target", "").lower() == "_blank":
                rel = set(data.get("rel", "").lower().split())
                if not {"noopener", "noreferrer"}.issubset(rel):
                    self.unsafe_blank_links.append(href or "<empty href>")
        elif tag == "main":
            self.main_ids.append(element_id)
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "label":
            self.label_depth += 1
            if data.get("for"):
                self.label_for.add(data["for"])
        elif tag in {"input", "select", "textarea"}:
            if tag == "input" and data.get("type", "text").lower() in {"hidden", "submit", "button", "reset"}:
                return
            accessible = bool(data.get("aria-label", "").strip() or data.get("aria-labelledby", "").strip())
            self.controls.append((tag, element_id, accessible or self.label_depth > 0))
        elif tag == "button":
            named_by_attr = bool(
                data.get("aria-label", "").strip()
                or data.get("aria-labelledby", "").strip()
                or data.get("title", "").strip()
            )
            self.button_stack.append({"id": element_id or data.get("class", "<button>"), "named": named_by_attr, "text": []})

    def handle_endtag(self, tag):
        if tag == "label" and self.label_depth:
            self.label_depth -= 1
        elif tag == "button" and self.button_stack:
            button = self.button_stack.pop()
            text = "".join(button["text"]).strip()
            if not button["named"] and not text:
                self.unnamed_buttons.append(str(button["id"]))

    def handle_data(self, data):
        if self.button_stack:
            self.button_stack[-1]["text"].append(data)


def validate_page(path: Path) -> list[str]:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    errors: list[str] = []

    if not parser.html_lang:
        errors.append("missing html lang attribute")
    if not parser.has_viewport:
        errors.append("missing viewport meta")
    if not parser.has_description:
        errors.append("missing meta description")

    duplicates = [value for value, count in Counter(parser.ids).items() if count > 1]
    if duplicates:
        errors.append(f"duplicate ids: {', '.join(sorted(duplicates))}")
    if parser.images_without_alt:
        errors.append(f"images without alt: {', '.join(parser.images_without_alt)}")
    if parser.unsafe_blank_links:
        errors.append(f"target=_blank links missing noopener+noreferrer: {', '.join(parser.unsafe_blank_links)}")

    if parser.main_ids.count("main-content") != 1:
        errors.append("expected exactly one <main id=\"main-content\">")
    if "#main-content" not in parser.skip_links:
        errors.append("missing skip link to #main-content")
    if parser.h1_count != 1:
        errors.append(f"expected exactly one h1, found {parser.h1_count}")

    for tag, control_id, labelled in parser.controls:
        if labelled:
            continue
        if control_id and control_id in parser.label_for:
            continue
        errors.append(f"unlabelled {tag}: {control_id or '<no id>'}")
    if parser.unnamed_buttons:
        errors.append(f"buttons without accessible name: {', '.join(parser.unnamed_buttons)}")

    return errors


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
    pages = sorted(root.glob("*.html"))
    if not pages:
        print(f"No HTML pages found in {root}", file=sys.stderr)
        return 1

    failures = []
    for page in pages:
        errors = validate_page(page)
        if errors:
            failures.append((page.name, errors))

    if failures:
        for name, errors in failures:
            print(f"{name}:", file=sys.stderr)
            for error in errors:
                print(f"  - {error}", file=sys.stderr)
        return 1

    print(f"Accessibility shell validated for {len(pages)} production pages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
