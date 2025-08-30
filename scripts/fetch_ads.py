#!/usr/bin/env python3
"""
Fetch publications from NASA ADS and write _data/publications.json

Usage:
  ADS_TOKEN=... python scripts/fetch_ads.py --author 'author:"Najafi-Ziyazi,Mahdi"'

Notes:
  - Requires: requests
  - ADS API docs: https://api.adsabs.harvard.edu/
"""

import argparse
import json
import os
import sys
from datetime import datetime

import requests


API_URL = "https://api.adsabs.harvard.edu/v1/search/query"


def fetch_ads(author_query: str, token: str, rows: int = 200):
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "q": author_query,
        "fl": "title,author,abstract,year,doi,bibcode,pub,pubdate",
        "rows": rows,
        "sort": "date desc",
    }
    r = requests.get(API_URL, headers=headers, params=params, timeout=30)
    r.raise_for_status()
    data = r.json()
    docs = data.get("response", {}).get("docs", [])
    result = []
    for d in docs:
        title = (d.get("title") or [""])[0]
        authors = d.get("author") or []
        abstract = d.get("abstract") or ""
        venue = d.get("pub") or None
        year = d.get("year")
        pubdate = d.get("pubdate") or None
        bibcode = d.get("bibcode") or None
        dois = d.get("doi") or []
        url = f"https://ui.adsabs.harvard.edu/abs/{bibcode}/abstract" if bibcode else None
        # Normalize pubdate
        if pubdate:
            try:
                # ADS pubdate is often YYYY-MM-DD or YYYY-MM
                if len(pubdate) == 7:
                    pubdate += "-01"
                datetime.fromisoformat(pubdate)
            except Exception:
                pubdate = None

        result.append(
            {
                "title": title,
                "authors": authors,
                "abstract": abstract,
                "venue": venue,
                "year": year,
                "pubdate": pubdate,
                "bibcode": bibcode,
                "doi": dois,
                "url": url,
            }
        )
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--author", required=True, help="ADS query for author, e.g. author:\"Last, First\"")
    parser.add_argument("--out", default="_data/publications.json", help="Output JSON path")
    args = parser.parse_args()

    token = os.getenv("ADS_TOKEN")
    if not token:
        print("ERROR: ADS_TOKEN environment variable is not set", file=sys.stderr)
        return 2

    pubs = fetch_ads(args.author, token)
    # Write pretty JSON
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(pubs, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(pubs)} publications to {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

