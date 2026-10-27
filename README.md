# ZothOS Website — Official Distribution Hub & Agent-Native OS Showcase

> **Official web portal and machine-readable distribution hub for ZOTHOS Linux v3.3.0 & ZothOS-Lite v1.0**  
> *Engineered from Ring 0 up as the dual-surface operating system for autonomous AI agents (Ring 0–3 security boundaries, Chain of Thoughts `zoth-cot` Merkle Working Memory DAG, 152 Model Context Protocol servers, zoth-relay :8765, 22 resident loopback daemons) and human operators (24K Gold KDE Plasma 6.3 Wayland, ZothOS-Lite v1.0 Amnesic Monotone Edition, Debian 13 + Kali & Parrot dual parity).*

[![Live Production Site](https://img.shields.io/badge/Live-zothos.nullai.tech-gold?style=flat-square&logo=googlechrome)](https://zothos.nullai.tech)
[![Netlify Deploy](https://img.shields.io/badge/Deploy-Netlify%20Production-00C7B7?style=flat-square&logo=netlify)](https://app.netlify.com)
[![Vite 5](https://img.shields.io/badge/Build-Vite%205-purple?style=flat-square)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/Framework-React%2019-blue?style=flat-square)](https://react.dev)
[![Material-UI v5](https://img.shields.io/badge/UI-Material--UI%20v5-007FFF?style=flat-square)](https://mui.com)
[![AEO / AX Machine Ready](https://img.shields.io/badge/AEO-llms.txt%20%2B%20JSON--LD-blueviolet?style=flat-square)](#aeo--machine-agent-discovery-endpoints)
[![100% Open Access](https://img.shields.io/badge/Access-100%25%20Free%20%26%20Open-success?style=flat-square)](#3-100-open-access--buy-us-a-coffee-support)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Overview

`zoth-os-website` is the official web portal, interactive telemetry dashboard, and machine-agent index for [ZOTHOS Linux](https://github.com/NullAITech/zoth-os) and [ZothOS-Lite v1.0](https://github.com/1nc0gn30/zothos-lite). Hosted at [https://zothos.nullai.tech](https://zothos.nullai.tech), it provides both human cybersecurity operators and autonomous AI agents with instant access to ISO downloads, verification signatures, tool documentation, and live system telemetries.

### Key Highlights
- **Dual-Surface Showcase**: Articulates ZothOS's unique dual-audience design—a hardened, permission-ringed execution substrate for coding agents on the backend, paired with an avant-garde 24K Gold KDE Plasma 6.3 Wayland desktop and Amnesic ZothOS-Lite v1.0 for human operators.
- **100% In-Browser Interactive Demos**: Interactive terminal simulators, MCP inspector previews, and live telemetry widgets with zero fake work.
- **Machine Discovery (AEO & AX)**: Structured `/llms.txt`, `/llms-full.txt`, and programmatic `/api/` endpoints enabling LLMs (Perplexity, GPTBot, ClaudeBot, Google SGE) to accurately cite and index ZothOS capabilities.
- **100% Free & Open-Access**: All tools, ISO builders, and configurations are unlocked by default with zero paywalls, supported via optional "☕ Buy Us a Coffee" (Stripe + Solana tip address).

---

## Architectural Topology

```
+==================================================================================================+
|                                  ZOTHOS.NULLAI.TECH WEB PORTAL                                   |
|                          Vite 5.4 + React 19 + MUI v5 (Gold-on-Void Aesthetic)                   |
+==================================================================================================+
        |                                   |                                   |
        v                                   v                                   v
+-----------------------------+ +-----------------------------+ +-----------------------------+
|    HUMAN OPERATOR UX        | |   AI AGENT DISCOVERY (AEO)  | | 100% OPEN-ACCESS & SUPPORT  |
|  - 24K Gold Plasma 6.3 Tour | |  - /llms.txt & llms-full.txt| |  - 100% Unlocked By Default |
|  - ZothOS-Lite v1.0 (:8145) | |  - /api/tools.json Catalog  | |  - Chain of Thoughts DAG    |
|  - SHA-256 / Cosign Verifier| |  - /api/services.json API   | |  - Stripe Buy Us a Coffee   |
|  - Live ISO Torrent / HTTP  | |  - Schema.org JSON-LD Graphs| |  - Solana Tip Address       |
+-----------------------------+ +-----------------------------+ +-----------------------------+
        |                                   |                                   |
        +-----------------------------------+-----------------------------------+
                                            |
                                            v
+==================================================================================================+
|                                    NETLIFY PRODUCTION EDGE                                       |
|                  Strict CSP Headers • Zero-Egress Safety • Immutable Asset Caching               |
+==================================================================================================+
```

---

## Core Capabilities & Features

### 1. Dual-Audience Operating System Demonstration
- **For AI Agents (`zoth-agent-os`)**:
  - **4-Tier Security Privilege Rings**: Documenting `RING_0_SOVEREIGN`, `RING_1_SYSADMIN`, `RING_2_TOOLMASTER`, and `RING_3_APPLICATION_SANDBOX`.
  - **152 Master MCP Servers**: Pre-configured registry via `/etc/zothos/mcp-servers.json` (Ghidra, Shodan, Wireshark, Nmap, Caido, Burp Suite, Memory, Git, Filesystem).
  - **IPC & Loopback Isolation**: Full documentation of `zoth-relay` (:8765) and the 22 localhost daemons.
- **For Human Operators**:
  - **24K Gold KDE Plasma 6.3 Wayland**: Dark alchemical glassmorphism with custom shaders, icon themes, and multi-monitor `zoth-lock`.
  - **Debian 13.7 + Kali & Parrot Parity**: Complete package coverage across bleeding-edge enterprise penetration testing and digital forensics.
  - **[ZothOS-Lite v1.0 (`1nc0gn30/zothos-lite`)](https://github.com/1nc0gn30/zothos-lite)**: Companion Amnesic Monotone RAM-Only Operating System featuring **AZOTH** (Embodied `U+2800` Braille AI Agent with 6 mood rigs & real-time mouth phoneme lip-sync), **[Chain of Thoughts (`zoth-cot` — `1nc0gn30/chain-of-thoughts`)](https://github.com/1nc0gn30/chain-of-thoughts)** cryptographic SHA-256 Merkle working memory DAG, **Kokoro 82M ONNX Neural TTS + Full-Duplex Mic STT**, **3D Perspective Tunnel Matrix**, and **Sovereign Horology Niche Clock** (`8-dot Braille BCD + Swatch .beats + GMST`).
- **Chain of Thoughts (`zoth-cot`) Working Memory DAG**:
  - Standalone open-source engine ([`1nc0gn30/chain-of-thoughts`](https://github.com/1nc0gn30/chain-of-thoughts)) that provides persistent multi-turn `/api/chat` context, automatic semantic fact extraction (`IDENTITY`, `MEMORY`, `MISSION`, `SECRET`), and a 4-stage reasoning trace (`PERCEPTION -> RECALL -> SYNTHESIS -> VERIFICATION`) with cryptographic parent-to-child Merkle links (`N00 -> N01 -> N02...`).

### 2. AEO & Machine-Agent Discovery Endpoints
Built to satisfy strict frontier crawler requirements with zero crawl delay:
- [`/llms.txt`](https://zothos.nullai.tech/llms.txt): Plaintext LLM summary with key operational parameters and download links.
- [`/llms-full.txt`](https://zothos.nullai.tech/llms-full.txt): Comprehensive multi-page corpus covering security rings, ISO specifications, and daemon ports.
- [`/api/index.json`](https://zothos.nullai.tech/api/index.json): Programmatic metadata index for autonomous agents.
- [`/api/tools.json`](https://zothos.nullai.tech/api/tools.json): JSON machine catalog of all 75+ preloaded security and developer CLI tools.
- [`/api/faq.json`](https://zothos.nullai.tech/api/faq.json): Structured FAQ knowledge base for automated citation.
- [`/api/graph.json`](https://zothos.nullai.tech/api/graph.json): Linked Data Schema.org `@graph` representation.

### 3. 100% Open-Access & "Buy Us a Coffee" Support
- **100% Free & Unlocked**: Every interactive tool, custom ISO builder, and systemd unit exporter on `zothos.nullai.tech` is 100% free and open-access by default with zero paywalls.
- **☕ Buy Us a Coffee (Stripe)**: [`https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X`](https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X)
- **Solana Wallet Tip Address**: `GG2eQbVh8ut1BK6j1A2tz7pSySdLpD38BgyEhGcxdXoK` (`solana:GG2eQbVh8ut1BK6j1A2tz7pSySdLpD38BgyEhGcxdXoK`)

---

## Local Development & Build Commands

### Prerequisites
- Node.js v20+ / v22+
- npm or pnpm

### Quickstart
```bash
# Clone the repository
git clone https://github.com/1nc0gn30/zoth-os-website.git
cd zoth-os-website

# Install dependencies
npm install

# Start local development server (HMR on http://localhost:5173)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

### Production Build Structure
```
dist/
├── index.html              # Validated semantic entry point with Schema.org graph
├── assets/                 # Minified and fingerprinted JS/CSS chunks
├── brand/                  # High-resolution SVG and PNG brand emblems
├── llms.txt                # Curated LLM discovery index
├── llms-full.txt           # Complete technical documentation corpus
├── sitemap.xml             # Search engine canonical URL map
├── robots.txt              # Zero-crawl-delay crawler whitelist
└── api/                    # Programmatic JSON API endpoints
```

---

## Production Deployment

Deployed continuously via **Netlify Edge**:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Configuration**: Defined in [`netlify.toml`](netlify.toml) with strict security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`) and SPA catch-all rewrite rules (`/* /index.html 200`).

---

## Related Repositories

- [**ZothOS Linux** (`NullAITech/zoth-os`)](https://github.com/NullAITech/zoth-os): Hardened Debian 13 Bookworm Live ISO build system and rootfs overlays.
- [**Zoth Studio v2** (`NullAITech/zoth-studio-v2`)](https://github.com/NullAITech/zoth-studio-v2): Sovereign agent orchestrator, WebGPU compute console, and 62-tool workstation matrix.
- [**NullAI Platform** (`nullai.tech`)](https://nullai.tech): Sovereign alchemical AI infrastructure and autonomous agent research.

---

## Attribution & License

- **Engineered by**: Neal Frazier ([@1nc0gn30](https://github.com/1nc0gn30)) • **Neal Frazier Tech** & **NullAI Platform**.
- **License**: [MIT](LICENSE)
