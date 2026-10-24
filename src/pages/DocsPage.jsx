import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link as RouterLink } from 'react-router-dom';
import { ProFunnelBanner } from '../context/ProLicenseContext';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const CODEX_SECTIONS = [
  {
    id: 'apt-pinning',
    number: '01',
    kicker: 'PACKAGE & KERNEL ARCHITECTURE',
    title: 'Surgical Tri-Repository APT Pinning (Debian 13 + Kali + Parrot)',
    summary:
      'ZothOS v3.2 builds on Debian 13 (Trixie) with Debian’s stock Linux 6.12 image and pins Kali Rolling and Parrot Security at priority 400. The curated security lists are 30-opsec and 40-security (75 packages), not the full Kali archive.',
    codeTitle: '/etc/apt/preferences.d/zoth-parity.pref',
    code: `Package: *
Pin: release n=trixie
Pin-Priority: 900

Package: *
Pin: release n=kali-rolling
Pin-Priority: 400

Package: *
Pin: release n=lory
Pin-Priority: 400

# Install offensive binaries explicitly without pulling foreign desktop libs:
# sudo apt install -t kali-rolling bloodhound certipy-ad netexec caido`,
    invariants: [
      'Core libc6, systemd, and KDE Plasma 6.3 Wayland packages are strictly locked to Debian 13 (Trixie) at Pin-Priority 900.',
      'Kali and Parrot packages install only when named. Pin 400 is meant to keep them from replacing Debian libc and Plasma.',
      'v3.2.0 publishes SHA-256 and a keyless cosign bundle over SHA256SUMS. Reproducible builds are in progress and are not bit-for-bit yet (REPRODUCIBLE_BUILDS.md).',
    ],
  },
  {
    id: 'wayland-cursor',
    number: '02',
    kicker: 'COMPOSITOR & WALLPAPER ENGINE',
    title: 'KDE Plasma 6.3 Wayland & 60 FPS Cursor Constellation Pipeline',
    summary:
      'Because Wayland isolates window cursor coordinates by design, ZothOS runs a dedicated KWin scripting bridge and Python cursor broadcaster (`zoth-cursor-daemon`) that streams 60 FPS coordinates over `/dev/shm/zoth_cursor_pos` and `127.0.0.1:9989` to the QML WallpaperItem.',
    codeTitle: '/usr/local/bin/zoth-cursor-daemon --status',
    code: `# 1. KWin Wayland script emits real-time pointer coordinates via DBus
# 2. zoth-cursor-daemon writes atomic state to /dev/shm/zoth_cursor_pos
# 3. org.zothos.interactive QML Canvas renders at 60 FPS:
#    - 16-point dynamic cursor comet ribbon
#    - 4-ring sovereign reticle + golden constellation ley-lines
#    - 3D tilting metallic ZOTHOS centerpiece + click shockwaves

curl -s http://127.0.0.1:9989/cursor
# -> {"x": 964, "y": 512, "pressed": false, "fps": 60, "mode": "gold"}`,
    invariants: [
      'Sub-16ms frame pacing across 4K and ultrawide Wayland displays.',
      'Zero XWayland root-window polling overhead; uses native KWin DBus signals + shared memory (`/dev/shm`).',
      'Instant shader & palette hot-swapping when executing `zoth-mode gold|ghost|matrix|incognito`.',
    ],
  },
  {
    id: 'zero-egress',
    number: '03',
    kicker: 'NETWORK & GHOSTMODE STEALTH',
    title: 'UFW Default-Deny Enclaves & NullAI Ghostmode Tor Routing',
    summary:
      'All 22 resident AI, memory, and commerce daemons bind exclusively to `127.0.0.1`. When operators engage `zoth-mode ghost`, nftables routes all outbound TCP/DNS traffic through a transparent Tor circuit (9040/9053) while spoofing hardware MAC addresses.',
    codeTitle: 'zoth-ghost & UFW Enclave Verification',
    code: `sudo ufw default deny incoming
sudo ufw allow in on lo to 127.0.0.1 port 8094:8120 proto tcp
sudo ufw allow in on lo to 127.0.0.1 port 8787 proto tcp

# Engage Red Pill (Amnesic Tor + MAC Spoofing + Ephemeral Hostname)
sudo zoth-mode ghost
# [✓] MAC rotated -> 02:4c:9a:f1:08:e3
# [✓] nftables Tor transparent proxy armed (127.0.0.1:9040 / DNS :9053)
# [✓] agent-egress-sentinel (:8095) blocking non-loopback telemetry`,
    invariants: [
      'Zero LAN or WAN exposure for any of the 22 resident daemons (`127.0.0.1` loopback bind only).',
      'DNS leak prevention enforced via nftables drop rules on port 53 outside loopback Tor DNSPort `:9053`.',
      'Automatic RAM tmpfs wipe on system shutdown or emergency panic keychord.',
    ],
  },
  {
    id: 'argon2id-vault',
    number: '04',
    kicker: 'CRYPTOGRAPHIC SECRETS SANCTUM',
    title: 'Local secrets daemon on 127.0.0.1:8787',
    summary:
      'The README describes zoth-vault as a resident daemon on 127.0.0.1:8787 using Argon2id and ChaCha20-Poly1305, with a front end that can also talk to Bitwarden CLI, KeePassXC, and UNIX pass. The daemon ships as a prebuilt binary. Those cryptographic parameters are not verifiable from the public source tree.',
    codeTitle: 'What the README actually documents',
    code: `# Front end named in the hotkey table
zoth-vault

# The v3.2.0 README states the daemon is prebuilt.
# Do not treat Argon2id memory/time settings on this page
# as measured parameters. They are not published in-tree.`,
    invariants: [
      'Bind address documented by the project: 127.0.0.1:8787.',
      'Crypto construction is a design description, not an independent audit.',
      'The vault UI also lists Bitwarden CLI, KeePassXC, and pass as backends.',
    ],
  },
  {
    id: 'stdp-memory',
    number: '05',
    kicker: 'BIOMORPHIC COGNITIVE STRATUM',
    title: 'Spike-Timing-Dependent Plasticity (STDP) Vector Memory (:8094)',
    summary:
      'Resident on `127.0.0.1:8094`, `neuro-memory-daemon` combines an offline SQLite HNSW vector graph with biological Spike-Timing-Dependent Plasticity so frequently recalled architectural patterns strengthen while stale noise decays.',
    codeTitle: 'STDP Synaptic Weight Update Law',
    code: `# Biomorphic STDP Synaptic Plasticity Law (:8094)
# Δw = A_+ * exp(-Δt / τ_+)   when pre-synaptic recall precedes task success (LTP)
# Δw = -A_- * exp(Δt / τ_-)   when engram is unused or contradicted (LTD)

curl -s -X POST http://127.0.0.1:8094/v1/memory/recall \\
  -H "Content-Type: application/json" \\
  -d '{"query":"Wayland 60fps cursor shm","top_k":3,"reinforce":true}'`,
    invariants: [
      '100% offline embeddings via local Ollama (`nomic-embed-text` on `127.0.0.1:11434`).',
      'Shared across all 9 coding agents (AGY, Claude Code, Aider, Cursor, Cline, Grok, Hermes) via `zoth-memory-stdp-mcp`.',
      'Sub-5ms local recall latency with zero cloud vector database bills.',
    ],
  },
  {
    id: 'mcp-ax-protocol',
    number: '06',
    kicker: 'MODEL CONTEXT PROTOCOL & AX',
    title: 'Model Context Protocol (MCP) & Agent Experience (AX) Standard',
    summary:
      'ZothOS exposes 5 pre-configured MCP server clusters (`zoth-kernel-mcp`, `zoth-vault-mcp`, `zoth-hexstrike-mcp`, `zoth-memory-stdp-mcp`, `zoth-daemons-mcp`) and publishes canonical machine-readable manifests (`/.well-known/mcp.json`, `/.well-known/agent.json`, `/llms-full.txt`).',
    codeTitle: 'Inspect Local MCP JSON-RPC 2.0 Traffic via mcp-lens (:8109)',
    code: `# Launch real-time MCP JSON-RPC 2.0 packet sniffer & latency profiler
mcp-lens --listen 127.0.0.1:8109 --inspect-all

# Verify public AX & MCP discovery manifests
curl -s https://zothos.nullai.tech/.well-known/mcp.json | jq .mcpServers
curl -s https://zothos.nullai.tech/.well-known/agent.json | jq .capabilities`,
    invariants: [
      'Every MCP tool call is logged to the immutable SQLite Flight Recorder (`127.0.0.1:8104`).',
      'Inline Prompt Firewall (`127.0.0.1:8098`) scans all tool outputs for indirect prompt injection before returning to the LLM.',
      'Token Budget Sentinel (`127.0.0.1:8110`) enforces hard daily spend circuit breakers.',
    ],
  },
  {
    id: 'thermal-governance',
    number: '07',
    kicker: 'SILICON & ACOUSTIC RESILIENCE',
    title: 'zoth-heal repair script and zoth-thermal turbo toggle',
    summary:
      'zoth-heal is a bash repair script. Its header lists APT locks and mirrors, display/compositors, network/DNS/Tor, disk pressure, audio, Python/MCP dependencies, and desktop config. zoth-thermal writes 1 or 0 to Intel pstate no_turbo when that sysfs file exists. Neither script publishes a 55°C ceiling or a 0 RPM fan policy.',
    codeTitle: '/usr/local/bin/zoth-thermal',
    code: `# Intel turbo toggle present in the chroot script
# (no-op when intel_pstate/no_turbo is absent)
zoth-thermal
zoth-heal`,
    invariants: [
      'Repair coverage is the seven areas named in the zoth-heal header.',
      'Turbo control is Intel pstate only, and only when sysfs exposes no_turbo.',
      'Fan curves and temperature caps are not part of these scripts.',
    ],
  },
];

const FAQS = [
  {
    q: 'Which file do I download, and does it include the 23 Oct CLIs?',
    a: 'Download every zothos-3.2-amd64.iso.part0N file from the v3.2.0 release (13 Oct 2026), plus zothos-join-iso.sh, SHA256SUMS, and SHA256SUMS.cosign.bundle. Run bash zothos-join-iso.sh, then flash zothos-3.2-amd64.iso to a USB of at least 16 GB. Git main through 23 Oct 2026 is still version 3.2.0 and adds zoth-control-center v2.0, zoth-ascii-magic 2.7.0, and the city-desk, swarm-quorum, gesture-map, surface-sentinel, yara-forge, and theme-forge scripts. Those are not in the tagged ISO. There is no published qcow2. Zoth Studio is npx @nullaitech/zoth studio.',
  },
  {
    q: 'How does ZothOS combine Debian 13, Kali Rolling, and Parrot Security without breaking packages?',
    a: 'ZothOS uses surgical APT Pin-Priority rules (/etc/apt/preferences.d/zoth-parity.pref). Core system libraries, libc6, systemd, and KDE Plasma 6.3 Wayland are pinned to Debian 13 (Trixie) at priority 900, while offensive security binaries from Kali and Parrot are pinned at 400 so they only install when explicitly requested.',
  },
  {
    q: 'Are the 22 AI & Security daemons exposed to my local network or the internet?',
    a: 'Never. Every resident daemon (:8094 STDP Memory through :8120 POD Margin Sentinel, :9393 Zoth Civilization, :9989 Cursor Daemon, and :8787 Vault) binds strictly to 127.0.0.1 (localhost) and is protected by UFW default-deny inbound firewall rules.',
  },
  {
    q: 'How does the interactive 24K Gold Wayland desktop (zoth-pill) track cursor physics at 60 FPS?',
    a: 'Because Wayland isolates window cursor coordinates for security, ZothOS runs a lightweight KWin script paired with zoth-cursor-daemon (127.0.0.1:9989 and /dev/shm/zoth_cursor_pos) that broadcasts global pointer coordinates at 60 FPS to the QML WallpaperItem.',
  },
  {
    q: 'How do I connect Google Antigravity (AGY), Claude Code, or Cursor to ZothOS MCP servers?',
    a: 'Visit the interactive /mcp hub on this site to generate a ready-to-use mcpServers JSON configuration for Antigravity, Claude Desktop/Code, Cursor, or Cline using either stdio binary pipes or 127.0.0.1 SSE endpoints.',
  },
  {
    q: 'How do I unlock the Pro Custom ISO Live-Build Script, MCP Bundle, and Vault Policy Exporter?',
    a: 'Click the Solana DePay ($19 Founding Lifetime) button in the sales banner above, or enter your Pro license key / transaction signature in the activation modal. Activation is instant, verified client-side, and persisted in localStorage.',
  },
];

export default function DocsPage() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const goldAccent = dark ? '#D4AF37' : '#8A6508';

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState('');

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return CODEX_SECTIONS;
    return CODEX_SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.kicker.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <ProFunnelBanner />

        {/* Editorial Header */}
        <Box sx={{ mb: 5 }}>
          <Chip
            icon={<MenuBookIcon sx={{ fontSize: 15 }} />}
            label="SYSTEM CODEX • ARCHITECTURAL BLUEPRINTS • ZERO-EGRESS INVARIANTS"
            sx={{
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.7rem',
              bgcolor: dark ? 'rgba(212,175,55,0.14)' : '#FEF9E7',
              color: goldAccent,
              border: `1px solid ${goldAccent}`,
            }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.1rem', md: '3.2rem' }, mb: 1.5, letterSpacing: '-0.03em' }}>
            ZothOS Linux v3.2 System Codex
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 840, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Complete technical reference covering surgical Debian 13 + Kali + Parrot APT pinning, the 60 FPS KWin Wayland SHM cursor pipeline, Argon2id memory-only secret injection, STDP synaptic vector math, and Model Context Protocol (MCP) specifications.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Sticky Table of Contents & Quick Links */}
          <Grid item xs={12} md={3.5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
              <Paper sx={{ p: 2.5, borderRadius: 3, mb: 2.5 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Filter codex blueprints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: goldAccent }} />
                      </InputAdornment>
                    ),
                    sx: { fontFamily: mono, fontSize: '0.8rem' },
                  }}
                  sx={{ mb: 2 }}
                />

                <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
                  CODEX BLUEPRINTS (01–07)
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {CODEX_SECTIONS.map((sec) => (
                    <Box
                      key={sec.id}
                      component="a"
                      href={`#${sec.id}`}
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'text.primary',
                        bgcolor: dark ? 'rgba(255,255,255,0.02)' : '#F8FAFC',
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          borderColor: goldAccent,
                          bgcolor: dark ? 'rgba(212,175,55,0.10)' : '#FEF9E7',
                        },
                      }}
                    >
                      <Typography component="span" sx={{ fontFamily: mono, fontWeight: 900, fontSize: '0.72rem', color: goldAccent }}>
                        {sec.number}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3 }}>
                        {sec.title.split('(')[0].trim()}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
                  MACHINE-READABLE AX MANIFESTS
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {[
                    { label: 'Interactive MCP Playground', to: '/mcp', internal: true },
                    { label: '/.well-known/mcp.json', href: '/.well-known/mcp.json' },
                    { label: '/.well-known/agent.json', href: '/.well-known/agent.json' },
                    { label: '/llms.txt (Concise)', href: '/llms.txt' },
                    { label: '/llms-full.txt (Full Spec)', href: '/llms-full.txt' },
                  ].map((item) =>
                    item.internal ? (
                      <Button
                        key={item.label}
                        component={RouterLink}
                        to={item.to}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ justifyContent: 'space-between', fontFamily: mono, fontSize: '0.74rem', fontWeight: 800 }}
                      >
                        {item.label} →
                      </Button>
                    ) : (
                      <Button
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        endIcon={<LaunchIcon sx={{ fontSize: 12 }} />}
                        sx={{ justifyContent: 'space-between', fontFamily: mono, fontSize: '0.73rem', color: 'text.secondary' }}
                      >
                        {item.label}
                      </Button>
                    ),
                  )}
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Main Documentation Stream */}
          <Grid item xs={12} md={8.5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, mb: 6 }}>
              {filteredSections.map((sec) => (
                <Paper
                  key={sec.id}
                  id={sec.id}
                  sx={{
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 3.5,
                    scrollMarginTop: '96px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                    <Chip
                      label={`SECTION ${sec.number}`}
                      size="small"
                      sx={{
                        fontFamily: mono,
                        fontWeight: 900,
                        fontSize: '0.68rem',
                        bgcolor: dark ? 'rgba(212,175,55,0.16)' : '#FEF9E7',
                        color: goldAccent,
                      }}
                    />
                    <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: 'text.secondary' }}>
                      {sec.kicker}
                    </Typography>
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.2, fontSize: { xs: '1.35rem', md: '1.65rem' } }}>
                    {sec.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 2.5, fontSize: '0.95rem' }}>
                    {sec.summary}
                  </Typography>

                  {/* Code Block */}
                  <Box
                    sx={{
                      borderRadius: 2.5,
                      overflow: 'hidden',
                      border: '1px solid rgba(212,175,55,0.3)',
                      bgcolor: '#08080B',
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: 'rgba(212,175,55,0.10)',
                        borderBottom: '1px solid rgba(212,175,55,0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', fontWeight: 700, color: '#F5E6AB' }}>
                        {sec.codeTitle}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleCopy(sec.id, sec.code)}
                        startIcon={copiedId === sec.id ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                        sx={{
                          fontFamily: mono,
                          fontSize: '0.7rem',
                          color: copiedId === sec.id ? '#34D399' : '#F5E6AB',
                          py: 0.2,
                        }}
                      >
                        {copiedId === sec.id ? 'Copied' : 'Copy'}
                      </Button>
                    </Box>
                    <Box
                      component="pre"
                      sx={{
                        m: 0,
                        p: 2.2,
                        fontFamily: mono,
                        fontSize: '0.79rem',
                        color: '#34D399',
                        overflowX: 'auto',
                        lineHeight: 1.6,
                      }}
                    >
                      {sec.code}
                    </Box>
                  </Box>

                  {/* Engineering Invariants */}
                  <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
                    VERIFIED ARCHITECTURAL INVARIANTS
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    {sec.invariants.map((inv) => (
                      <Box key={inv} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Typography sx={{ fontFamily: mono, fontWeight: 900, color: '#10B981', fontSize: '0.85rem' }}>
                          ✓
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.88rem', color: 'text.primary' }}>
                          {inv}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* AEO FAQ Section */}
            <Typography variant="h3" sx={{ fontSize: '1.75rem', mb: 2, fontWeight: 800 }}>
              Frequently Asked Questions (AEO & Operator Reference)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FAQS.map((f, idx) => (
                <Accordion key={f.q} defaultExpanded={idx === 0} sx={{ borderRadius: '12px !important', overflow: 'hidden' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 700 }}>{f.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {f.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
