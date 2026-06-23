#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
create_article.py
仅使用 Python 标准库，遍历 article/ 文件夹下的 HTML 文件，
提取标题、日期、引言，输出 JSON。（中文输出）
"""

import os
import re
import json

def extract_meta_from_html(file_path):
    """从单个 HTML 文件提取标题、日期、引言（使用正则）"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 提取 <h1> 内部 HTML
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if not h1_match:
        return None
    h1_inner = h1_match.group(1)

    # 2. 提取日期（class="pub-date" 的 span）
    date_match = re.search(
        r'<span\s+class="pub-date"[^>]*>\s*[\u2014\u2013]?\s*(.*?)\s*</span>',
        h1_inner, re.DOTALL
    )
    date_str = date_match.group(1).strip() if date_match else ''

    # 3. 清除 HTML 标签，得到纯标题
    title = re.sub(r'<[^>]+>', '', h1_inner).strip()
    if date_str and date_str in title:
        title = title.replace(date_str, '').strip().rstrip('\u2014').strip()

    # 4. 提取 h1 之后的第一个 <p> 作为引言
    h1_end = h1_match.end()
    after_h1 = content[h1_end:]
    p_match = re.search(r'<p[^>]*>(.*?)</p>', after_h1, re.DOTALL)
    description = ''
    if p_match:
        desc_raw = p_match.group(1)
        description = re.sub(r'<[^>]+>', '', desc_raw).strip()

    # 5. 相对路径
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
        print("错误：找不到 'article' 文件夹")
        return

    for filename in sorted(os.listdir(article_dir)):
        if not filename.endswith('.html'):
            continue
        file_path = os.path.join(article_dir, filename)
        meta = extract_meta_from_html(file_path)
        if meta:
            results.append(meta)
            print(f"✓ {filename} → {meta['title']}")
        else:
            print(f"✗ {filename} → 无法提取元数据")

    output_file = 'articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\n✅ 完成！共处理 {len(results)} 个文件，结果已保存至 {output_file}")

if __name__ == '__main__':
    main()