import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://zothos.nullai.tech';
const OG_IMAGE = 'https://zothos.nullai.tech/brand/zothos-x-launch-banner.jpg';

const ROUTE_META = {
  '/': {
    title: 'ZothOS Linux v3.4.0 & ZothOS-Lite v1.2 — Sovereign AI Workstation & Amnesic Live OS',
    desc: 'ZothOS v3.4.0 (Debian 13 Trixie + KDE Plasma 6 Wayland Sovereign AI Workstation, 23+ system daemons, 83 preloaded sovereign tools — 56 Web/WebGPU + 27 CLI across 82 public GitHub repos, Sovereign Agent Bridge :8102, STDP Neuro-Memory :8094, Vaēlor L1 :8140, Hermes-Zoth) & ZothOS-Lite v1.2 (Amnesic Monotone toram Live USB OS with 56 models & ZothNet Sphinx mixnet).',
    keywords: 'ZothOS v3.4.0, ZothOS-Lite v1.2, Debian 13 Trixie AI OS, KDE Plasma 6 Wayland, Sovereign Agent Bridge 8102, STDP Neuro-Memory 8094, Vaelor L1 8140, Hermes-Zoth, ZothNet Sphinx Mixnet',
    schemaType: 'SoftwareApplication',
    breadcrumb: 'Overview',
  },
  '/desktop': {
    title: 'Interactive Desktop Lab & Reality Pill Switcher — ZothOS v3.4.0 & ZothOS-Lite v1.2',
    desc: 'Experience the ZothOS KDE Plasma 6 Wayland desktop in your browser. Switch between Gold Master, Ghostmode & Sphinx Mixnet, Matrix Phosphor, and Covert guises with live zoth-sh terminal execution.',
    keywords: 'ZothOS desktop simulator, KDE Plasma 6 Wayland, zoth-mode, Reality Pill switcher, zoth-cursor-daemon',
    schemaType: 'TechArticle',
    breadcrumb: 'Desktop Lab',
  },
  '/daemons': {
    title: '23+ Loopback System Daemons & Hermes-Zoth Agent Suite — ZothOS v3.4.0',
    desc: 'Explore 23+ zero-egress localhost daemons (:8102 Sovereign Agent Bridge, :8094 STDP Neuro-Memory, :8140 Vaēlor L1, :8787 Argon2id Vault, :9393 Zoth Civilization) and Hermes-Zoth orchestrator.',
    keywords: 'Sovereign Agent Bridge 8102, STDP Neuro-Memory 8094, Vaelor L1 8140, Hermes-Zoth, 23 loopback daemons, ZothOS daemons',
    schemaType: 'TechArticle',
    breadcrumb: '23+ System Daemons',
  },
  '/security': {
    title: 'Kali + Parrot Security Parity, ZothNet Sphinx Mixnet & Argon2id Vault — ZothOS v3.4.0',
    desc: 'Surgical APT pinning across Debian 13, Kali Rolling, and Parrot Security. Test the interactive zoth-vault (:8787) Argon2id + ChaCha20-Poly1305 memory-only secret injector.',
    keywords: 'ZothOS security arsenal, Kali Parrot APT pinning, zoth-vault Argon2id ChaCha20, ZothNet Sphinx mixnet',
    schemaType: 'TechArticle',
    breadcrumb: 'Security Vault & Arsenal',
  },
  '/mcp': {
    title: 'MCP & Agent Experience (AX) Hub — 163 MCP Catalog & Playground | ZothOS v3.4.0',
    desc: 'Interactive Model Context Protocol (MCP) configuration generator for Antigravity, Claude Desktop, Cursor & Cline, live JSON-RPC 2.0 tool playground, and AX discovery manifests.',
    keywords: 'Model Context Protocol, MCP server Linux, ZothOS MCP, Agent Experience AX, llms.txt, .well-known/mcp.json',
    schemaType: 'TechArticle',
    breadcrumb: 'MCP & AX Hub',
  },
  '/download': {
    title: 'Download ZothOS v3.4.0 & ZothOS-Lite v1.2 ISO — Interactive Hardware Boot Advisor',
    desc: 'Compare ZothOS v3.4.0 Full KDE Plasma 6 Workstation vs ZothOS-Lite v1.2 Amnesic toram Live USB, generate verified dd flash commands, or synthesize a custom Debian 13 live-build ISO.',
    keywords: 'Download ZothOS ISO, ZothOS-Lite v1.2 Live USB, toram ISO, Debian 13 live-build script, Sigstore Cosign verification',
    schemaType: 'HowTo',
    breadcrumb: 'Download & ISO Builder',
  },
  '/docs': {
    title: 'System Codex — Kernel, Agent Bridge :8102, STDP :8094, Vaēlor L1 :8140 & APT Specs | ZothOS v3.4.0',
    desc: 'Complete engineering codex for ZothOS v3.4.0 & ZothOS-Lite v1.2: surgical tri-repo APT pinning, KDE Plasma 6 Wayland SHM cursor pipeline, Argon2id vault math, and <55°C thermal governance.',
    keywords: 'ZothOS documentation, System Codex, Debian Kali Parrot APT pinning, KWin Wayland cursor daemon, Argon2id mlockall',
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
          name: 'ZothOS Linux v3.4.0 & ZothOS-Lite v1.2',
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
      dateModified: '2026-11-18',
      author: {
        '@type': 'Person',
        name: 'Neal Frazier',
        alternateName: 'Neal Frazier Tech (@1nc0gn30)',
        url: 'https://1nc0gn30.si',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Neal Frazier Tech • NullAI Platform',
        url: 'https://nullai.tech',
      },
      ...(meta.schemaType === 'HowTo'
        ? {
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Verify SHA-256 & Sigstore Cosign Signature',
                text: 'Run sha256sum -c zothos-3.4.0-amd64.iso.sha256 and cosign verify-blob to cryptographically authenticate the image.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Flash Hybrid UEFI ISO or ZothOS-Lite toram USB',
                text: 'Write zothos-3.4.0-amd64.iso or zothos-lite-1.2-amd64.iso to USB media via dd bs=4M status=progress conv=fsync.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Boot KDE Plasma 6 Wayland or Amnesic Monotone Live Session',
                text: 'Boot into ZothOS v3.4.0 (23+ loopback daemons, 83 preloaded sovereign tools) or ZothOS-Lite v1.2 (toram RAM-only, 56 models).',
              },
            ],
          }
        : {
            proficiencyLevel: 'Expert',
            dependencies: 'Debian 13 (Trixie), Linux 6.12, KDE Plasma 6 Wayland, Rust, Python 3.12, Node.js 22',
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
