import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://zothos.nullai.tech';
const OG_IMAGE = 'https://zothos.nullai.tech/brand/zothos-x-launch-banner.jpg';

const ROUTE_META = {
  '/': {
    title: 'ZothOS Linux v3.2 — The Operating System Built for AI Agents & Human Operators',
    desc: 'ZothOS Linux v3.2.0: Debian 13 (Trixie), KDE Plasma 6.3 Wayland, Kali and Parrot pins, about 75 curated security packages, a 152-entry MCP catalog that starts disabled, zoth-relay on :8765, and 22 loopback daemons. ISO is five parts plus zothos-join-iso.sh.',
    keywords: 'ZothOS, Agent-Native Linux OS, OS for AI agents, zoth-agent-os, zoth-relay, 152 MCP servers, Debian 13 Trixie, Kali Parrot dual parity, KDE Plasma 6.3 Wayland, 22 loopback daemons',
    schemaType: 'SoftwareApplication',
    breadcrumb: 'Overview',
  },
  '/desktop': {
    title: 'Interactive Desktop Lab & Reality Pill Switcher — ZothOS Linux v3.2',
    desc: 'Browser preview of the ZothOS Plasma desktop. zoth-mode switches gold, ghost, matrix, and incognito. Cockpit on current main also cycles a cyan reality.',
    keywords: 'ZothOS desktop simulator, KDE Plasma 6.3 Wayland, zoth-mode, Reality Pill switcher, zoth-cursor-daemon, interactive QML wallpaper',
    schemaType: 'TechArticle',
    breadcrumb: 'Desktop Lab',
  },
  '/daemons': {
    title: 'Loopback Daemons & Third-Party Coding Clients — ZothOS v3.2',
    desc: 'Loopback daemons documented for ZothOS, plus the third-party coding clients the README names. You bring your own accounts. No xAI, Cursor, or Meta partnership is claimed.',
    keywords: '22 loopback daemons, zero-egress localhost mesh, neuro-memory-daemon STDP, Google Antigravity agy, Claude Code, Aider Ollama, ZothOS daemons',
    schemaType: 'TechArticle',
    breadcrumb: '22 Daemons & 9 Agents',
  },
  '/security': {
    title: '75+ Curated Security Tools & Local Vault — ZothOS v3.2',
    desc: 'Debian 13 with Kali Rolling and Parrot Security pinned at 400. About 75 packages from the opsec and security lists. zoth-vault on :8787 is a prebuilt daemon; its crypto design is not audited from source.',
    keywords: 'ZothOS security arsenal, Kali Parrot APT pinning, zoth-vault Argon2id ChaCha20, NullAI Ghostmode Tor, BloodHound, Certipy-AD, ProjectDiscovery',
    schemaType: 'TechArticle',
    breadcrumb: 'Security Vault & Arsenal',
  },
  '/mcp': {
    title: 'MCP & Agent Experience (AX) Hub — Model Context Protocol Playground | ZothOS v3.2',
    desc: 'Interactive Model Context Protocol (MCP) configuration generator for Antigravity, Claude Desktop, Cursor & Cline, live JSON-RPC 2.0 tool playground, and machine-readable AX discovery manifests.',
    keywords: 'Model Context Protocol, MCP server Linux, ZothOS MCP, Agent Experience AX, llms.txt, .well-known/mcp.json, JSON-RPC 2.0 tool playground',
    schemaType: 'TechArticle',
    breadcrumb: 'MCP & AX Hub',
  },
  '/download': {
    title: 'Download ZothOS Linux v3.2 ISO & Custom Live-Build Recipe Generator',
    desc: 'Download ZothOS v3.2.0 as five ISO parts plus zothos-join-iso.sh. Verify SHA256SUMS with the cosign bundle. No qcow2 is published. Studio is npx @nullaitech/zoth studio.',
    keywords: 'Download ZothOS ISO, Debian 13 live-build script, Sigstore Cosign verification, custom AI Linux ISO builder',
    schemaType: 'HowTo',
    breadcrumb: 'Download & ISO Builder',
  },
  '/docs': {
    title: 'System Codex — Kernel, APT Pinning, Wayland SHM, MCP & Thermal Specs | ZothOS v3.2',
    desc: 'Codex for ZothOS v3.2: Debian 13 APT pins, the split ISO, zoth-heal, zoth-thermal, and what the vault README does and does not prove.',
    keywords: 'ZothOS documentation, System Codex, Debian Kali Parrot APT pinning, KWin Wayland cursor daemon, Argon2id mlockall, zero-egress UFW nftables',
    schemaType: 'TechArticle',
    breadcrumb: 'System Codex',
  },
};

function buildRouteJsonLd(pathname, meta) {
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ZothOS Linux v3.2',
          item: SITE_URL,
        },
        ...(pathname !== '/'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: meta.breadcrumb,
                item: canonicalUrl,
              },
            ]
          : []),
      ],
    },
    {
      '@type': meta.schemaType === 'HowTo' ? 'HowTo' : 'TechArticle',
      '@id': `${canonicalUrl}#article`,
      headline: meta.title,
      name: meta.title,
      description: meta.desc,
      url: canonicalUrl,
      inLanguage: 'en-US',
      datePublished: '2026-10-15',
      dateModified: '2026-10-15',
      author: {
        '@type': 'Organization',
        name: 'Neal Frazier Tech (NullAI Platform)',
        url: 'https://nullai.tech',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Neal Frazier Tech',
        url: 'https://nullai.tech',
      },
      ...(meta.schemaType === 'HowTo'
        ? {
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Verify SHA-256 & Sigstore Cosign Signature',
                text: 'Run sha256sum -c zothos-3.2.0-amd64.iso.sha256 and cosign verify-blob to cryptographically authenticate the image.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Flash Hybrid UEFI ISO or Run Custom Live-Build',
                text: 'Write the ISO to NVMe/USB media via dd or execute the generated zothos-custom-build.sh script on Debian 13 (Trixie).',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Boot Sovereign Gold Master & Activate 22 Loopback Daemons',
                text: 'Boot into KDE Plasma 6.3 Wayland and verify all 22 localhost enclaves with zoth-status.',
              },
            ],
          }
        : {
            proficiencyLevel: 'Expert',
            dependencies: 'Debian 13 (Trixie), Linux 6.12, KDE Plasma 6.3 Wayland, Rust, Python 3.12',
          }),
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = meta.title;

    const setMeta = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('name', 'description', meta.desc);
    setMeta('name', 'keywords', meta.keywords);
    setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.desc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', pathname === '/' ? 'website' : 'article');
    setMeta('property', 'og:image', OG_IMAGE);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@1nc0gn30');
    setMeta('name', 'twitter:creator', '@1nc0gn30');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.desc);
    setMeta('name', 'twitter:image', OG_IMAGE);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let ldScript = document.getElementById('zothos-route-jsonld');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.setAttribute('type', 'application/ld+json');
      ldScript.setAttribute('id', 'zothos-route-jsonld');
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(buildRouteJsonLd(pathname, meta));
  }, [pathname]);

  return null;
}
