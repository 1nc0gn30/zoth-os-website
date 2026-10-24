# ZothOS Website — Official Distribution Hub & Agent-Native OS Showcase

> **Official web portal and machine-readable distribution hub for ZOTHOS Linux v3.2**  
> *Public site for ZothOS Linux v3.2.0: Debian 13 (Trixie), KDE Plasma 6.3 Wayland, Kali and Parrot pins, about 75 curated security packages, and a 152-entry MCP catalog that ships disabled. The ISO is five GitHub parts plus `zothos-join-iso.sh`.*

[![Live Production Site](https://img.shields.io/badge/Live-zothos.nullai.tech-gold?style=flat-square&logo=googlechrome)](https://zothos.nullai.tech)
[![Netlify Deploy](https://img.shields.io/badge/Deploy-Netlify%20Production-00C7B7?style=flat-square&logo=netlify)](https://app.netlify.com)
[![Vite 5](https://img.shields.io/badge/Build-Vite%205-purple?style=flat-square)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/Framework-React%2019-blue?style=flat-square)](https://react.dev)
[![Material-UI v5](https://img.shields.io/badge/UI-Material--UI%20v5-007FFF?style=flat-square)](https://mui.com)
[![AEO / AX Machine Ready](https://img.shields.io/badge/AEO-llms.txt%20%2B%20JSON--LD-blueviolet?style=flat-square)](#aeo--machine-agent-discovery-endpoints)
[![Dual Monetization Rails](https://img.shields.io/badge/Treasury-Stripe%20%2B%20Solana%20DePay-success?style=flat-square)](#dual-monetization-rails--treasury)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Overview

`zoth-os-website` is the official web portal, interactive telemetry dashboard, and machine-agent index for [ZOTHOS Linux](https://github.com/NullAITech/zoth-os). Hosted at [https://zothos.nullai.tech](https://zothos.nullai.tech), it provides both human cybersecurity operators and autonomous AI agents with instant access to ISO downloads, verification signatures, tool documentation, and live system telemetries.

### Key Highlights
- **Dual-Surface Showcase**: Articulates ZothOS's unique dual-audience design—a hardened, permission-ringed execution substrate for coding agents on the backend, paired with an avant-garde 24K Gold KDE Plasma 6.3 Wayland desktop for human operators.
- **100% In-Browser Interactive Demos**: Interactive terminal simulators, MCP inspector previews, and live telemetry widgets with zero fake work.
- **Machine Discovery (AEO & AX)**: Structured `/llms.txt`, `/llms-full.txt`, and programmatic `/api/` endpoints enabling LLMs (Perplexity, GPTBot, ClaudeBot, Google SGE) to accurately cite and index ZothOS capabilities.
- **Dual Sovereign Checkout Rails**: Integrated Stripe ($19 founding pass) and Web3 Solana DePay widget for sovereign treasury expansion.

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
|    HUMAN OPERATOR UX        | |   AI AGENT DISCOVERY (AEO)  | |   DUAL MONETIZATION RAILS   |
|  - 24K Gold Plasma 6.3 Tour | |  - /llms.txt & llms-full.txt| |  - Stripe Payment Links ($19)|
|  - 75+ Cyber Arsenal Guide  | |  - /api/tools.json Catalog  | |  - DePay Solana Integration |
|  - SHA-256 / Cosign Verifier| |  - /api/services.json API   | |  - 1-Click License Key Auth |
|  - Split ISO + join script  | |  - Schema.org JSON-LD Graphs| |  - Frosted Glass Paywall UX |
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
  - **152 MCP catalog entries**: `/etc/zothos/mcp-servers.json`. The v3.2.0 release notes say they stay disabled until enabled.
  - **IPC & Loopback Isolation**: Full documentation of `zoth-relay` (:8765) and the 22 localhost daemons.
- **For Human Operators**:
  - **24K Gold KDE Plasma 6.3 Wayland**: Dark alchemical glassmorphism with custom shaders, icon themes, and multi-monitor `zoth-lock`.
  - **Debian 13 (Trixie) + Kali & Parrot pins**: About 75 curated packages from the opsec and security lists. Not the full Kali archive, and not Debian 13.7.

### 2. AEO & Machine-Agent Discovery Endpoints
Built to satisfy strict frontier crawler requirements with zero crawl delay:
- [`/llms.txt`](https://zothos.nullai.tech/llms.txt): Plaintext LLM summary with key operational parameters and download links.
- [`/llms-full.txt`](https://zothos.nullai.tech/llms-full.txt): Comprehensive multi-page corpus covering security rings, ISO specifications, and daemon ports.
- [`/api/index.json`](https://zothos.nullai.tech/api/index.json): Programmatic metadata index for autonomous agents.
- [`/api/tools.json`](https://zothos.nullai.tech/api/tools.json): JSON catalog for the separate Sovereign Pro browser tools. The OS security package count (about 75) lives in the ZothOS repo, not in this file.
- [`/api/faq.json`](https://zothos.nullai.tech/api/faq.json): Structured FAQ knowledge base for automated citation.
- [`/api/graph.json`](https://zothos.nullai.tech/api/graph.json): Linked Data Schema.org `@graph` representation.

### 3. Dual Monetization Rails & Treasury
- **Founding Member Pass**: $19 lifetime sovereign access ($79 standard retail).
- **Stripe Rail**: Credit cards, Apple Pay, and Google Pay via verified payment links.
- **Solana DePay Rail**: Instant Web3 crypto checkout to receiver `GG2eQbVh8ut1BK6j1A2tz7pSySdLpD38BgyEhGcxdXoK`.
- **Instant Client-Side Activation**: Unlocks via `?licensed=true` URL query parameter or 1-click license key confirmation, saving state permanently in `localStorage`.

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

- [**ZothOS Linux** (`NullAITech/zoth-os`)](https://github.com/NullAITech/zoth-os): Debian 13 (Trixie) live-build. Latest tagged ISO is v3.2.0 (2026-10-13). Git main through 2026-10-23 is still version 3.2.0.
- [**Zoth Studio v2** (`NullAITech/zoth-studio-v2`)](https://github.com/NullAITech/zoth-studio-v2): Local studio. Command is `npx @nullaitech/zoth studio`. The OS catalog lists 62 tools as of 2026-10-22.
- [**NullAI Platform** (`nullai.tech`)](https://nullai.tech): Sovereign alchemical AI infrastructure and autonomous agent research.

---

## Attribution & License

- **Engineered by**: Neal Frazier ([@1nc0gn30](https://github.com/1nc0gn30)) • **Neal Frazier Tech** & **NullAI Platform**.
- **License**: [MIT](LICENSE)
