import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CANONICAL_ORIGIN = 'https://zothos.nullai.tech';

function readRepoFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  assert.ok(fs.existsSync(fullPath), `Expected file to exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

function getHtmlTarget() {
  const distPath = path.join(ROOT, 'dist', 'index.html');
  return fs.existsSync(distPath) ? 'dist/index.html' : 'index.html';
}

function parseRobotsBlocks(content) {
  const blocks = new Map();
  let currentAgents = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) {
      currentAgents = [];
      continue;
    }
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const val = line.slice(idx + 1).trim();
    if (key === 'user-agent') {
      if (!blocks.has(val)) blocks.set(val, []);
      currentAgents.push(val);
    } else if (currentAgents.length > 0) {
      for (const agent of currentAgents) {
        blocks.get(agent).push({ key, val });
      }
    }
  }
  return blocks;
}

test('robots.txt allows all frontier crawlers with Crawl-delay: 0 and Sitemap', () => {
  const robots = readRepoFile('public/robots.txt');
  const blocks = parseRobotsBlocks(robots);

  const requiredAgents = ['*', 'Googlebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot'];
  for (const agent of requiredAgents) {
    assert.ok(blocks.has(agent), `robots.txt missing User-agent: ${agent}`);
    const rules = blocks.get(agent);
    assert.ok(
      rules.some((r) => r.key === 'allow' && r.val === '/'),
      `robots.txt User-agent: ${agent} must include Allow: /`
    );
    assert.ok(
      !rules.some((r) => r.key === 'disallow' && r.val === '/'),
      `robots.txt User-agent: ${agent} must not Disallow: /`
    );
  }

  assert.match(robots, /^Crawl-delay:\s*0\s*$/im, 'robots.txt must set Crawl-delay: 0');
  assert.match(
    robots,
    new RegExp(`^Sitemap:\\s*${CANONICAL_ORIGIN.replace(/\./g, '\\.')}/sitemap\\.xml\\s*$`, 'im'),
    'robots.txt must declare canonical Sitemap URL'
  );
});

test('sitemap.xml is valid XML with canonical <loc> entries', () => {
  const xml = readRepoFile('public/sitemap.xml');
  assert.match(xml, /^<\?xml\s+version="1\.0"\s+encoding="UTF-8"\?>/, 'sitemap.xml missing XML declaration');
  assert.match(xml, /<urlset\b[^>]*>[\s\S]*<\/urlset>/, 'sitemap.xml must contain balanced <urlset> tags');

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  assert.ok(locs.length > 0, 'sitemap.xml must contain at least one <loc> entry');
  assert.ok(locs.includes(`${CANONICAL_ORIGIN}/`), `sitemap.xml must include ${CANONICAL_ORIGIN}/`);
  for (const loc of locs) {
    assert.ok(
      loc.startsWith(`${CANONICAL_ORIGIN}/`),
      `sitemap.xml <loc> must use canonical origin ${CANONICAL_ORIGIN}: got ${loc}`
    );
  }

  const urlOpenCount = (xml.match(/<url>/g) || []).length;
  const urlCloseCount = (xml.match(/<\/url>/g) || []).length;
  assert.equal(urlOpenCount, urlCloseCount, 'sitemap.xml <url> tags must be balanced');
  assert.equal(urlOpenCount, locs.length, 'Each <url> in sitemap.xml must contain a <loc>');
});

test('netlify.toml defines required security headers', () => {
  const toml = readRepoFile('netlify.toml');
  assert.match(toml, /X-Frame-Options\s*=\s*"SAMEORIGIN"/i, 'netlify.toml missing X-Frame-Options = "SAMEORIGIN"');
  assert.match(toml, /X-Content-Type-Options\s*=\s*"nosniff"/i, 'netlify.toml missing X-Content-Type-Options = "nosniff"');
  assert.match(
    toml,
    /Referrer-Policy\s*=\s*"strict-origin-when-cross-origin"/i,
    'netlify.toml missing Referrer-Policy = "strict-origin-when-cross-origin"'
  );
});

test('built HTML has viewport, social meta tags, valid JSON-LD @graph, balanced tags, and zero paywalls', () => {
  const target = getHtmlTarget();
  const html = readRepoFile(target);

  assert.match(
    html,
    /<meta\s+[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1\.0["'][^>]*\/?>/i,
    `${target} missing required viewport meta tag`
  );
  assert.match(
    html,
    /<meta\s+[^>]*property=["']og:image["'][^>]*content=["']https:\/\/[^"']+["'][^>]*\/?>/i,
    `${target} missing absolute HTTPS og:image meta tag`
  );
  assert.match(
    html,
    /<meta\s+[^>]*name=["']twitter:card["'][^>]*content=["']summary_large_image["'][^>]*\/?>/i,
    `${target} missing twitter:card meta tag`
  );
  assert.match(
    html,
    /<meta\s+[^>]*name=["']twitter:image["'][^>]*content=["']https:\/\/[^"']+["'][^>]*\/?>/i,
    `${target} missing absolute HTTPS twitter:image meta tag`
  );

  // Valid JSON-LD @graph
  const ldScripts = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  assert.ok(ldScripts.length > 0, `${target} must include at least one application/ld+json script`);
  let hasGraph = false;
  for (const [, body] of ldScripts) {
    const parsed = JSON.parse(body);
    assert.ok(parsed && typeof parsed === 'object', 'JSON-LD must parse to an object');
    if (Array.isArray(parsed['@graph']) && parsed['@graph'].length > 0) {
      hasGraph = true;
    }
  }
  assert.ok(hasGraph, `${target} JSON-LD must declare a non-empty @graph`);

  // Balanced core HTML tags
  assert.match(html, /<html\b[^>]*>[\s\S]*<\/html>/i, `${target} missing balanced <html> tags`);
  assert.match(html, /<head\b[^>]*>[\s\S]*<\/head>/i, `${target} missing balanced <head> tags`);
  assert.match(html, /<body\b[^>]*>[\s\S]*<\/body>/i, `${target} missing balanced <body> tags`);
  assert.equal(
    (html.match(/<script\b/gi) || []).length,
    (html.match(/<\/script>/gi) || []).length,
    `${target} has unbalanced <script> tags`
  );
  assert.equal(
    (html.match(/<style\b/gi) || []).length,
    (html.match(/<\/style>/gi) || []).length,
    `${target} has unbalanced <style> tags`
  );

  // Zero DePay / paywall-blur regressions
  assert.doesNotMatch(
    html,
    /\bdepay\b|paywall[-_ ]?blur|blur[-_ ]?paywall/i,
    `${target} must not contain DePay or paywall-blur references`
  );
});

test('public/api/tools.json is valid JSON with 83-tool parity', () => {
  const raw = readRepoFile('public/api/tools.json');
  const data = JSON.parse(raw);
  const count = data.tool_count ?? data.count;
  assert.equal(count, 83, `Expected 83-tool parity in public/api/tools.json, got ${count}`);
  assert.ok(Array.isArray(data.tools), 'public/api/tools.json must contain a tools array');
  assert.equal(data.tools.length, 83, `Expected 83 entries in tools array, got ${data.tools.length}`);
});
