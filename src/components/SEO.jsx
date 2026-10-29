import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://zothos.nullai.tech';
const OG_IMAGE = 'https://zothos.nullai.tech/brand/zothos-x-launch-banner.jpg';

const ROUTE_META = {
  '/': {
    title: 'ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 — The Operating System Built for AI Agents & Human Operators',
    desc: 'ZothOS Linux v3.3.0 & ZothOS-Lite v1.0: Permission-ringed Debian 13.7 (Trixie) OS built for autonomous AI agents (Ring 0–3 zoth-agent-os, 163 MCP servers, zoth-relay :8765, 22 loopback daemons) with a 24K Gold KDE Plasma 6.3 Wayland workstation and Kali and Parrot security tools for humans.',
    keywords: 'ZothOS, Agent-Native Linux OS, OS for AI agents, zoth-agent-os, zoth-relay, 163 MCP servers, Debian 13 Trixie, Kali Parrot dual parity, KDE Plasma 6.3 Wayland, 22 loopback daemons',
    schemaType: 'SoftwareApplication',
    breadcrumb: 'Overview',
  },
  '/desktop': {
    title: 'Interactive Desktop Lab & Reality Pill Switcher — ZothOS Linux v3.3.0 & ZothOS-Lite v1.0',
    desc: 'Experience the ZothOS KDE Plasma 6.3 Wayland desktop in your browser. Switch between Gold Master, NullAI Ghostmode Tor, Matrix Phosphor, and Covert guises with live zoth-sh terminal execution.',
    keywords: 'ZothOS desktop simulator, KDE Plasma 6.3 Wayland, zoth-mode, Reality Pill switcher, zoth-cursor-daemon, interactive QML wallpaper',
    schemaType: 'TechArticle',
    breadcrumb: 'Desktop Lab',
  },
  '/daemons': {
    title: '23 Loopback Enclave Daemons & 9 Frontier AI Coding Agents — ZothOS v3.3.0',
    desc: 'Explore the 22 zero-egress localhost daemons (:8094 STDP Memory through :8120 POD Margin Sentinel, :9393 Zoth Civilization, :8787 Vault) and installer scripts for 9 AI coding agents (not affiliated with their vendors).',
    keywords: '22 loopback daemons, zero-egress localhost mesh, neuro-memory-daemon STDP, Google Antigravity agy, Claude Code, Aider Ollama, ZothOS daemons',
    schemaType: 'TechArticle',
    breadcrumb: '22 Daemons & 9 Agents',
  },
  '/security': {
    title: 'Kali and Parrot security tools & Argon2id Sovereign Vault — ZothOS v3.3.0',
    desc: 'Surgical APT pinning across Debian 13, Kali Rolling, and Parrot Security. Test the interactive zoth-vault (:8787) Argon2id + ChaCha20-Poly1305 memory-only secret injector.',
    keywords: 'ZothOS security arsenal, Kali Parrot APT pinning, zoth-vault Argon2id ChaCha20, NullAI Ghostmode Tor, BloodHound, Certipy-AD, ProjectDiscovery',
    schemaType: 'TechArticle',
    breadcrumb: 'Security Vault & Arsenal',
  },
  '/mcp': {
    title: 'MCP & Agent Experience (AX) Hub — Model Context Protocol Playground | ZothOS v3.3.0',
    desc: 'Interactive Model Context Protocol (MCP) configuration generator for Antigravity, Claude Desktop, Cursor & Cline, live JSON-RPC 2.0 tool playground, and machine-readable AX discovery manifests.',
    keywords: 'Model Context Protocol, MCP server Linux, ZothOS MCP, Agent Experience AX, llms.txt, .well-known/mcp.json, JSON-RPC 2.0 tool playground',
    schemaType: 'TechArticle',
    breadcrumb: 'MCP & AX Hub',
  },
  '/download': {
    title: 'Download ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 ISO & Custom Live-Build Recipe Generator',
    desc: 'Download the ZothOS v3.3.0 Hybrid UEFI Live/Install ISO (SHA-256 & Sigstore Cosign verified) or generate a custom Debian 13 Trixie live-build bootstrap script.',
    keywords: 'Download ZothOS ISO, Debian 13 live-build script, Sigstore Cosign verification, custom AI Linux ISO builder',
    schemaType: 'HowTo',
    breadcrumb: 'Download & ISO Builder',
  },
  '/docs': {
    title: 'System Codex — Kernel, APT Pinning, Wayland SHM, MCP & Thermal Specs | ZothOS v3.3.0',
    desc: 'Complete engineering codex for ZothOS Linux v3.3.0 & ZothOS-Lite v1.0: surgical tri-repo APT pinning, 60 FPS KWin Wayland SHM cursor pipeline, UFW zero-egress rules, Argon2id vault math, and <55°C thermal governance.',
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
          name: 'ZothOS Linux v3.3.0 & ZothOS-Lite v1.0',
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
                text: 'Run sha256sum -c zothos-3.3.0-amd64.iso.sha256 and cosign verify-blob to cryptographically authenticate the image.',
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
                name: 'Boot Sovereign Gold Master & Activate 23 Loopback Daemons',
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
