#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extract_article_meta_no_deps.py
Extract title, date, and introduction from HTML files under article/ folder.
No external dependencies required.
"""

import os
import re
import json

def extract_meta_from_html(file_path):
    """Extract metadata from a single HTML file using regex."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Extract <h1> inner HTML
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if not h1_match:
        return None
    h1_inner = h1_match.group(1)

    # 2. Extract date from <span class="pub-date">
    date_match = re.search(
        r'<span\s+class="pub-date"[^>]*>\s*[\u2014\u2013]?\s*(.*?)\s*</span>',
        h1_inner, re.DOTALL
    )
    date_str = date_match.group(1).strip() if date_match else ''

    # 3. Clean title by removing all HTML tags
    title = re.sub(r'<[^>]+>', '', h1_inner).strip()
    if date_str and date_str in title:
        title = title.replace(date_str, '').strip().rstrip('\u2014').strip()

    # 4. Find the first <p> after </h1> as description
    h1_end = h1_match.end()
    after_h1 = content[h1_end:]
    p_match = re.search(r'<p[^>]*>(.*?)</p>', after_h1, re.DOTALL)
    description = ''
    if p_match:
        desc_raw = p_match.group(1)
        description = re.sub(r'<[^>]+>', '', desc_raw).strip()

    # 5. Relative path
    rel_path = os.path.relpath(file_path).replace('\\', '/')

    return {
        "title": title,
        "path": rel_path,
        "description": description,
        "date": date_str
    }

def main():
    article_dir = 'article'
    results = []

    if not os.path.isdir(article_dir):
        print("Error: Cannot find 'article' folder.")
        return

    for filename in sorted(os.listdir(article_dir)):
        if not filename.endswith('.html'):
            continue
        file_path = os.path.join(article_dir, filename)
        meta = extract_meta_from_html(file_path)
        if meta:
            results.append(meta)
            print(f"[OK] {filename} -> {meta['title']}")
        else:
            print(f"[FAIL] {filename} -> cannot extract metadata.")

    output_file = 'articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nDone! Processed {len(results)} files. Output saved to {output_file}")

if __name__ == '__main__':
    main()