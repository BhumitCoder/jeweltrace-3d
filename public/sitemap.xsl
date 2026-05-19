<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  exclude-result-prefixes="sitemap image xhtml mobile news">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex, follow"/>
        <title>XML Sitemap — JewelsReport</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #F8F5EF;
            color: #1a1a1a;
            min-height: 100vh;
          }

          /* ── Header ── */
          header {
            background: linear-gradient(135deg, #111 0%, #1e1a14 100%);
            border-bottom: 3px solid #B8922A;
            padding: 28px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }
          .brand { display: flex; align-items: center; gap: 14px; }
          .brand-icon {
            width: 48px; height: 48px;
            background: linear-gradient(135deg, #B8922A, #D4A843);
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px;
          }
          .brand-text h1 {
            font-size: 22px; font-weight: 700;
            color: #fff; letter-spacing: -0.01em;
          }
          .brand-text h1 span { color: #B8922A; }
          .brand-text p { font-size: 11px; color: #888; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 2px; }
          .badge {
            font-size: 11px; font-weight: 600;
            background: rgba(184,146,42,0.15);
            color: #D4A843;
            border: 1px solid rgba(184,146,42,0.3);
            border-radius: 20px;
            padding: 5px 14px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          /* ── Main wrapper ── */
          main { max-width: 980px; margin: 0 auto; padding: 40px 24px 80px; }

          /* ── Info bar ── */
          .info-bar {
            display: flex; flex-wrap: wrap; gap: 12px;
            margin-bottom: 32px;
          }
          .info-card {
            background: #fff;
            border: 1px solid #E8E0D0;
            border-radius: 12px;
            padding: 14px 20px;
            display: flex; align-items: center; gap: 10px;
            flex: 1; min-width: 180px;
          }
          .info-card .icon { font-size: 20px; }
          .info-card .label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.15em; }
          .info-card .value { font-size: 15px; font-weight: 600; color: #111; margin-top: 1px; }

          /* ── Section heading ── */
          .section-title {
            font-size: 11px; font-weight: 700;
            letter-spacing: 0.3em; text-transform: uppercase;
            color: #B8922A; margin-bottom: 12px;
          }

          /* ── URL table ── */
          .url-table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #E8E0D0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          }
          .url-table thead tr {
            background: linear-gradient(90deg, #111 0%, #1e1a14 100%);
          }
          .url-table thead th {
            padding: 14px 20px;
            text-align: left;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #B8922A;
          }
          .url-table thead th:last-child { text-align: center; }
          .url-table tbody tr {
            border-bottom: 1px solid #F0EBE0;
            transition: background 0.15s;
          }
          .url-table tbody tr:last-child { border-bottom: none; }
          .url-table tbody tr:hover { background: #FAF7F2; }
          .url-table td {
            padding: 16px 20px;
            font-size: 13.5px;
            vertical-align: middle;
          }
          .url-link {
            color: #B8922A;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          .url-link:hover { text-decoration: underline; }
          .pill {
            display: inline-block;
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.1em; text-transform: uppercase;
            padding: 3px 10px; border-radius: 20px;
          }
          .pill-high  { background: #FFF3E0; color: #B8922A; border: 1px solid #F5D78E; }
          .pill-med   { background: #F0F7FF; color: #3B82F6; border: 1px solid #BFDBFE; }
          .pill-low   { background: #F0FDF4; color: #16A34A; border: 1px solid #BBF7D0; }
          .pill-freq  { background: #F5F3FF; color: #7C3AED; border: 1px solid #DDD6FE; }
          .date { font-size: 12px; color: #777; white-space: nowrap; }
          .priority-bar-wrap { display: flex; align-items: center; gap: 8px; justify-content: center; }
          .priority-bar-bg { width: 60px; height: 6px; background: #EEE; border-radius: 99px; overflow: hidden; }
          .priority-bar { height: 100%; background: linear-gradient(90deg, #B8922A, #D4A843); border-radius: 99px; }

          /* ── Images block ── */
          .img-block {
            margin-top: 6px; padding-top: 8px;
            border-top: 1px dashed #E8E0D0;
          }
          .img-block p { font-size: 11px; color: #999; }
          .img-block strong { color: #555; }

          /* ── Sitemap index ── */
          .index-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 14px; margin-bottom: 32px;
          }
          .index-card {
            background: #fff;
            border: 1px solid #E8E0D0;
            border-left: 4px solid #B8922A;
            border-radius: 12px;
            padding: 18px 20px;
            text-decoration: none;
            display: block;
            transition: box-shadow 0.15s, transform 0.15s;
          }
          .index-card:hover { box-shadow: 0 4px 20px rgba(184,146,42,0.15); transform: translateY(-1px); }
          .index-card .ic-label { font-size: 10px; color: #B8922A; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; }
          .index-card .ic-url { font-size: 13px; color: #333; margin-top: 4px; word-break: break-all; }
          .index-card .ic-date { font-size: 11px; color: #999; margin-top: 6px; }

          /* ── Footer ── */
          footer {
            text-align: center;
            margin-top: 60px;
            padding: 24px;
            font-size: 11px;
            color: #AAA;
            border-top: 1px solid #E8E0D0;
          }
          footer a { color: #B8922A; text-decoration: none; }
          footer a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <header>
          <div class="brand">
            <div class="brand-icon">💎</div>
            <div class="brand-text">
              <h1>Jewels<span>Report</span></h1>
              <p>Certification Lab</p>
            </div>
          </div>
          <span class="badge">XML Sitemap</span>
        </header>

        <main>
          <xsl:apply-templates/>
        </main>

        <footer>
          <p>
            <a href="https://www.jewelsreport.com/">JewelsReport</a> —
            Independent Gemological Certification Laboratory, Surat, India ·
            <a href="https://www.jewelsreport.com/verify">Verify a Certificate</a> ·
            <a href="https://www.jewelsreport.com/sitemap-index.xml">Sitemap Index</a>
          </p>
        </footer>
      </body>
    </html>
  </xsl:template>

  <!-- ═══ Sitemap Index ═══════════════════════════════════════════════════════ -->
  <xsl:template match="sitemap:sitemapindex">
    <div class="info-bar">
      <div class="info-card">
        <span class="icon">🗂️</span>
        <div>
          <div class="label">Type</div>
          <div class="value">Sitemap Index</div>
        </div>
      </div>
      <div class="info-card">
        <span class="icon">📄</span>
        <div>
          <div class="label">Child Sitemaps</div>
          <div class="value"><xsl:value-of select="count(sitemap:sitemap)"/></div>
        </div>
      </div>
      <div class="info-card">
        <span class="icon">🌐</span>
        <div>
          <div class="label">Domain</div>
          <div class="value">jewelsreport.com</div>
        </div>
      </div>
    </div>

    <p class="section-title">Child Sitemaps</p>
    <div class="index-grid">
      <xsl:for-each select="sitemap:sitemap">
        <a class="index-card" href="{sitemap:loc}">
          <div class="ic-label">
            <xsl:choose>
              <xsl:when test="contains(sitemap:loc,'image')">🖼 Image Sitemap</xsl:when>
              <xsl:when test="contains(sitemap:loc,'news')">📰 News Sitemap</xsl:when>
              <xsl:when test="contains(sitemap:loc,'index')">🗂 Index Sitemap</xsl:when>
              <xsl:otherwise>📄 Pages Sitemap</xsl:otherwise>
            </xsl:choose>
          </div>
          <div class="ic-url"><xsl:value-of select="sitemap:loc"/></div>
          <xsl:if test="sitemap:lastmod">
            <div class="ic-date">Last updated: <xsl:value-of select="sitemap:lastmod"/></div>
          </xsl:if>
        </a>
      </xsl:for-each>
    </div>
  </xsl:template>

  <!-- ═══ URL Set (pages / images / news) ════════════════════════════════════ -->
  <xsl:template match="sitemap:urlset">
    <div class="info-bar">
      <div class="info-card">
        <span class="icon">🔗</span>
        <div>
          <div class="label">Total URLs</div>
          <div class="value"><xsl:value-of select="count(sitemap:url)"/></div>
        </div>
      </div>
      <div class="info-card">
        <span class="icon">🖼️</span>
        <div>
          <div class="label">Images Indexed</div>
          <div class="value"><xsl:value-of select="count(sitemap:url/image:image)"/></div>
        </div>
      </div>
      <div class="info-card">
        <span class="icon">📅</span>
        <div>
          <div class="label">Last Updated</div>
          <div class="value">2026-05-19</div>
        </div>
      </div>
      <div class="info-card">
        <span class="icon">🌐</span>
        <div>
          <div class="label">Domain</div>
          <div class="value">jewelsreport.com</div>
        </div>
      </div>
    </div>

    <p class="section-title">URL Entries</p>
    <table class="url-table">
      <thead>
        <tr>
          <th style="width:50%">URL</th>
          <th>Last Modified</th>
          <th>Change Freq</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:url">
          <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
          <tr>
            <td>
              <a class="url-link" href="{sitemap:loc}">
                <xsl:value-of select="sitemap:loc"/>
              </a>
              <xsl:if test="image:image">
                <div class="img-block">
                  <xsl:for-each select="image:image">
                    <p>📷 <strong>Image:</strong> <xsl:value-of select="image:title"/></p>
                  </xsl:for-each>
                </div>
              </xsl:if>
              <xsl:if test="news:news">
                <div class="img-block">
                  <p>📰 <strong>News:</strong> <xsl:value-of select="news:news/news:title"/></p>
                </div>
              </xsl:if>
            </td>
            <td class="date"><xsl:value-of select="sitemap:lastmod"/></td>
            <td>
              <xsl:if test="sitemap:changefreq">
                <span class="pill pill-freq"><xsl:value-of select="sitemap:changefreq"/></span>
              </xsl:if>
            </td>
            <td>
              <xsl:if test="sitemap:priority">
                <div class="priority-bar-wrap">
                  <xsl:variable name="pct" select="number(sitemap:priority) * 100"/>
                  <div class="priority-bar-bg">
                    <div class="priority-bar" style="width:{$pct}%"/>
                  </div>
                  <xsl:choose>
                    <xsl:when test="number(sitemap:priority) >= 0.9">
                      <span class="pill pill-high"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:when>
                    <xsl:when test="number(sitemap:priority) >= 0.7">
                      <span class="pill pill-med"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span class="pill pill-low"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:otherwise>
                  </xsl:choose>
                </div>
              </xsl:if>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

</xsl:stylesheet>
