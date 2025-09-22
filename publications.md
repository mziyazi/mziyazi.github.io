---
layout: default
title: Publications
permalink: /publications/
---

<main id="main" class="wrap">
  <section id="publications">
    <h1>Publications</h1>
    {% assign pubs = site.data.publications %}
    {% if pubs and pubs.size > 0 %}
      {% assign groups = pubs | group_by: 'year' | sort: 'name' | reverse %}
      {% for g in groups %}
        <h2 class="year">{{ g.name }}</h2>
        <div class="card">
          <div class="list">
            {% for p in g.items %}
            <div class="pub">
              <h3>
                {% if p.url %}
                  <a href="{{ p.url }}" target="_blank" rel="noopener">{{ p.title }}</a>
                {% else %}
                  {{ p.title }}
                {% endif %}
              </h3>
              <div class="meta">
                {% if p.authors %}
                  {% assign total_authors = p.authors | size %}
                  {% capture authors_display %}
                    {% for a in p.authors limit:15 %}
                      {{ a }}{% if forloop.last == false %}, {% endif %}
                    {% endfor %}
                  {% endcapture %}
                  {% if total_authors > 15 %}
                    <details class="authors">
                      <summary>
                        {{ authors_display | strip }}, et al.
                        <span class="toggle-show">(show full author list)</span>
                        <span class="toggle-hide">(hide)</span>
                      </summary>
                      <div class="authors-full">{{ p.authors | join: ', ' }}</div>
                    </details>
                  {% else %}
                    {{ authors_display | strip }}
                  {% endif %}
                  —
                {% endif %}
                {% if p.venue %}<em>{{ p.venue }}</em>{% endif %}
                {% if p.year %}, {{ p.year }}{% endif %}
              </div>
              <div class="badges">
                {% if p.bibcode %}
                  <a class="badge" href="{{ p.url }}" target="_blank" rel="noopener">ADS</a>
                  <a class="badge" href="https://ui.adsabs.harvard.edu/link_gateway/{{ p.bibcode }}/PUB_PDF" target="_blank" rel="noopener">PDF</a>
                {% endif %}
                {% if p.doi and p.doi.size > 0 %}
                  <a class="badge" href="https://doi.org/{{ p.doi | first }}" target="_blank" rel="noopener">DOI</a>
                {% endif %}
              </div>
              {% if p.abstract %}
              <details class="abstract">
                <summary>Abstract</summary>
                <p>{{ p.abstract }}</p>
              </details>
              {% else %}
              <p class="muted">Abstract not available.</p>
              {% endif %}
            </div>
            {% endfor %}
          </div>
        </div>
      {% endfor %}
    {% else %}
      <p>No publications found yet.</p>
    {% endif %}
  </section>
</main>
