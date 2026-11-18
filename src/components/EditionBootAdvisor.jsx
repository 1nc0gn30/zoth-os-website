import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import UsbIcon from '@mui/icons-material/Usb';
import TerminalIcon from '@mui/icons-material/Terminal';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HubIcon from '@mui/icons-material/Hub';
import { safeCopyText, downloadTextFile } from '../utils/clipboard';
import { resolveTone } from '../theme';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const HARDWARE_PROFILES = [
  {
    id: 'workstation',
    label: '16–32 GB NVMe Workstation',
    ramGb: 32,
    desc: 'Daily bare-metal or KVM developer desktop with NVMe storage.',
    v34Bonus: 38,
    liteBonus: 14,
  },
  {
    id: 'gpu-rig',
    label: '32–128 GB GPU Swarm Rig',
    ramGb: 64,
    desc: 'Discrete GPU host running local Ollama 14B/32B + 56 WebGPU tools.',
    v34Bonus: 46,
    liteBonus: 8,
  },
  {
    id: 'universal-laptop',
    label: '4–8 GB Universal x86_64',
    ramGb: 8,
    desc: 'Lightweight laptop, field netbook, or travel x86_64 machine.',
    v34Bonus: 8,
    liteBonus: 42,
  },
  {
    id: 'field-usb',
    label: 'Untrusted / Field Host USB',
    ramGb: 8,
    desc: 'Boot off Live USB on borrowed hardware leaving zero host disk trace.',
    v34Bonus: 6,
    liteBonus: 48,
  },
];

const PERSISTENCE_PROFILES = [
  {
    id: 'luks2',
    label: 'Persistent LUKS2 + Argon2id',
    v34Bonus: 32,
    liteBonus: 6,
  },
  {
    id: 'toram',
    label: 'Amnesic toram RAM-Only (Zero-Trace)',
    v34Bonus: 8,
    liteBonus: 40,
  },
  {
    id: 'encrypted-usb',
    label: 'Live USB + Encrypted Persistence',
    v34Bonus: 16,
    liteBonus: 30,
  },
];

const NETWORK_PROFILES = [
  {
    id: 'loopback',
    label: '127.0.0.1 Zero-Egress + Clearnet',
    v34Bonus: 24,
    liteBonus: 16,
  },
  {
    id: 'sphinx',
    label: 'ZothNet 3-Hop Sphinx Mixnet',
    v34Bonus: 18,
    liteBonus: 32,
  },
  {
    id: 'ghostmode',
    label: 'Ghostmode Transparent Tor',
    v34Bonus: 22,
    liteBonus: 26,
  },
];

const INSPECTOR_TARGETS = [
  {
    id: 'agent-bridge',
    name: 'Sovereign Agent Bridge',
    port: ':8102',
    accent: '#D4AF37',
    edition: 'ZothOS v3.4.0 Core',
    summary: 'Ed25519 capability-leased multi-agent IPC bus coordinating Hermes-Zoth, AGY, Claude Code, and Ring 0–3 sandboxes.',
    curlCmd: 'curl -fsS http://127.0.0.1:8102/health | jq .',
    cliCmd: 'zoth-agent-bridge --status --ring 2 --json',
    sampleJson: `{
  "service": "sovereign-agent-bridge",
  "bind": "127.0.0.1:8102",
  "status": "ONLINE",
  "activeRing": "Ring 2 (TOOLMASTER / CYBERPUPPET)",
  "connectedAgents": ["hermes-zoth", "agy", "claude-code", "aider"],
  "ed25519LeaseValid": true,
  "egressBytesExternal": 0
}`,
  },
  {
    id: 'stdp-memory',
    name: 'STDP Neuro-Memory',
    port: ':8094',
    accent: '#34D399',
    edition: 'ZothOS v3.4.0 Core',
    summary: 'Spike-Timing-Dependent Plasticity (dw = A+ * exp(-dt/tau)) SQLite HNSW vector cortex for cross-agent long-term recall.',
    curlCmd: `curl -fsS -X POST http://127.0.0.1:8094/v1/memory/recall -H "Content-Type: application/json" -d '{"query":"sovereign architecture","top_k":2}'`,
    cliCmd: 'neuro-memory-daemon --stats --json',
    sampleJson: `{
  "service": "neuro-memory-daemon",
  "bind": "127.0.0.1:8094",
  "plasticityRule": "3-Factor STDP (LTP/LTD)",
  "engramsIndexed": 14820,
  "topMatch": "zothos-v3.4-ring2-landlock-policy",
  "recallLatencyMs": 3.8
}`,
  },
  {
    id: 'vaelor-l1',
    name: 'Vaēlor L1 PoUW DAG',
    port: ':8140',
    accent: '#00F0FF',
    edition: 'ZothOS v3.4.0 Core',
    summary: '100-Agent Proof-of-Useful-Work (PoUW) sovereign DAG ledger with Ed25519 signatures and BLAKE2b state roots.',
    curlCmd: 'curl -fsS http://127.0.0.1:8140/api/status | jq .',
    cliCmd: 'vaelor-node status --quorum --json',
    sampleJson: `{
  "chain": "vaelor-l1-mainnet-local",
  "bind": "127.0.0.1:8140",
  "consensus": "PoUW-DAG (Ed25519 + BLAKE2b)",
  "activeValidators": 100,
  "finalityMs": 410,
  "hermesZothVerifier": "ACTIVE"
}`,
  },
  {
    id: 'hermes-zoth',
    name: 'Hermes-Zoth Orchestrator',
    port: 'CLI + :8102',
    accent: '#F59E0B',
    edition: 'Both v3.4.0 & Lite v1.2',
    summary: 'Nous Research Hermes Agent sovereign orchestrator plugin wiring 70+ skills directly into ZothOS daemons and 56 curated models.',
    curlCmd: 'curl -fsS http://127.0.0.1:8102/v1/orchestrator/hermes | jq .',
    cliCmd: 'hermes --plugin hermes-zoth --model hermes/deepseek-flash',
    sampleJson: `{
  "orchestrator": "hermes-zoth",
  "repo": "https://github.com/1nc0gn30/hermes-zoth",
  "activeModel": "hermes/deepseek-flash",
  "mcpClustersBound": 5,
  "workingMemory": "zoth-cot SHA-256 Merkle DAG",
  "thermalLockC": 44.6
}`,
  },
  {
    id: 'lite-models',
    name: 'ZothOS-Lite 56-Model Router',
    port: ':8145',
    accent: '#10B981',
    edition: 'ZothOS-Lite v1.2',
    summary: 'Amnesic Monotone (#F7F7F4 / #000000) Live OS model router spanning 56 curated models across 8 providers + Kokoro 82M ONNX voice.',
    curlCmd: 'curl -fsS http://127.0.0.1:8145/api/models | jq .summary',
    cliCmd: 'zoth-lite-models --list --providers 8',
    sampleJson: `{
  "edition": "ZothOS-Lite v1.2 (toram noswap)",
  "palette": ["#F7F7F4", "#000000"],
  "curatedModels": 56,
  "providers": ["Ollama", "Hermes/Nous", "DeepSeek", "OpenRouter", "OpenAI", "Anthropic", "Gemini", "Groq"],
  "embodiedAgent": "AZOTH U+2800 Braille + Kokoro 82M TTS"
}`,
  },
  {
    id: 'zothnet-sphinx',
    name: 'ZothNet 3-Hop Sphinx Mixnet',
    port: 'P2P Mesh',
    accent: '#A855F7',
    edition: 'Both v3.4.0 & Lite v1.2',
    summary: 'Metadata-resistant 3-hop Sphinx packet mixnet with fixed-size encrypted cells, decoy cover traffic, and zero cloud relays.',
    curlCmd: 'curl -fsS https://zothnet.nullai.tech/api/status || zothnet status --json',
    cliCmd: 'zothnet route --hops 3 --cipher sphinx-chacha20 --verify',
    sampleJson: `{
  "network": "zothnet-sphinx-v1",
  "portal": "https://zothnet.nullai.tech",
  "circuitHops": 3,
  "packetFormat": "Sphinx-2048B Constant-Rate",
  "dnsLeak": false,
  "coverTraffic": "ENABLED"
}`,
  },
];

export default function EditionBootAdvisor({ compact = false }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [hwId, setHwId] = useState('workstation');
  const [persistId, setPersistId] = useState('luks2');
  const [netId, setNetId] = useState('loopback');
  const [usbDev, setUsbDev] = useState('/dev/sdb');
  const [cmdTab, setCmdTab] = useState('dd');
  const [overrideEdition, setOverrideEdition] = useState(null);
  const [selectedDaemonId, setSelectedDaemonId] = useState('agent-bridge');
  const [toast, setToast] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const gold = isDark ? '#D4AF37' : '#8A6508';
  const goldBorder = isDark ? 'rgba(212, 175, 55, 0.36)' : 'rgba(138, 101, 8, 0.38)';
  const cardBg = isDark ? '#0D0F17' : '#FFFFFF';
  const subtleBg = isDark ? '#07080C' : '#F2EFE9';
  const textPrimary = isDark ? '#F1F5F9' : '#0A0D14';
  const textSecondary = isDark ? '#94A3B8' : '#475467';

  const cleanUsbDev = useMemo(() => {
    const cleaned = String(usbDev || '/dev/sdb').trim().replace(/[^a-zA-Z0-9/_-]/g, '');
    return cleaned.startsWith('/dev/') ? cleaned : '/dev/sdb';
  }, [usbDev]);

  const recommendation = useMemo(() => {
    const hw = HARDWARE_PROFILES.find((h) => h.id === hwId) || HARDWARE_PROFILES[0];
    const pe = PERSISTENCE_PROFILES.find((p) => p.id === persistId) || PERSISTENCE_PROFILES[0];
    const ne = NETWORK_PROFILES.find((n) => n.id === netId) || NETWORK_PROFILES[0];

    const rawV34 = hw.v34Bonus + pe.v34Bonus + ne.v34Bonus;
    const rawLite = hw.liteBonus + pe.liteBonus + ne.liteBonus;
    const total = Math.max(1, rawV34 + rawLite);
    const v34Pct = Math.round((rawV34 / total) * 100);
    const litePct = 100 - v34Pct;
    const winner = overrideEdition || (v34Pct >= litePct ? 'v34' : 'lite');

    return { hw, pe, ne, v34Pct, litePct, winner };
  }, [hwId, persistId, netId, overrideEdition]);

  const activeIso =
    recommendation.winner === 'v34' ? 'zothos-3.4.0-amd64.iso' : 'zothos-lite-1.2-amd64.iso';
  const activeVolume =
    recommendation.winner === 'v34' ? 'ZOTHOS_3_4_SOVEREIGN' : 'ZOTHOS_LITE_1_2_TORAM';
  const activeReleaseUrl =
    recommendation.winner === 'v34'
      ? 'https://github.com/1nc0gn30/zoth-os/releases/latest'
      : 'https://github.com/1nc0gn30/zothos-lite/releases/latest';

  const commandSnippets = useMemo(() => {
    const isLite = recommendation.winner === 'lite';
    const bootFlags = isLite
      ? `boot=live components toram noswap quiet splash hostname=zothos-lite net=${netId}`
      : `boot=live components quiet splash username=zoth hostname=zothos zoth_mode=${netId === 'ghostmode' ? 'ghost' : 'gold'}`;

    const dd = [
      `# 1. Inspect removable drives first — confirm ${cleanUsbDev} is your USB stick`,
      `lsblk -o NAME,SIZE,MODEL,TRAN ${cleanUsbDev}`,
      ``,
      `# 2. Flash ${activeIso} (${isLite ? 'ZothOS-Lite v1.2 Amnesic toram Live USB' : 'ZothOS v3.4.0 Full KDE Plasma 6 Workstation'})`,
      `sudo dd if=${activeIso} of=${cleanUsbDev} bs=4M status=progress conv=fsync && sync`,
    ].join('\n');

    const verify = [
      `# 1. Fetch cryptographic SHA-256 digest & Sigstore Cosign bundle`,
      `curl -fsSLO ${activeReleaseUrl}/download/${activeIso}.sha256`,
      `curl -fsSLO ${activeReleaseUrl}/download/${activeIso}.sig`,
      ``,
      `# 2. Authenticate image integrity before booting`,
      `sha256sum -c ${activeIso}.sha256`,
      `cosign verify-blob --signature ${activeIso}.sig \\`,
      `  --certificate-oidc-issuer https://token.actions.githubusercontent.com \\`,
      `  --certificate-identity-regexp "https://github.com/(1nc0gn30|NullAITech)/.*" \\`,
      `  ${activeIso}`,
    ].join('\n');

    const bootCurl = isLite
      ? [
          `# Kernel Boot Parameters (Amnesic Monotone #F7F7F4 / #000000 Live Session):`,
          `${bootFlags}`,
          ``,
          `# Post-Boot Model Router & ZothNet 3-Hop Sphinx Mixnet Check:`,
          `zoth-lite-models --list && zothnet status --hops 3 --sphinx`,
          `curl -fsS http://127.0.0.1:8145/api/status | jq .`,
        ].join('\n')
      : [
          `# Kernel Boot Parameters (KDE Plasma 6 Wayland Sovereign AI Workstation):`,
          `${bootFlags}`,
          ``,
          `# Post-Boot 23+ Loopback Daemon Health Probes (:8102, :8094, :8140):`,
          `curl -fsS http://127.0.0.1:8102/health && curl -fsS http://127.0.0.1:8094/health && curl -fsS http://127.0.0.1:8140/api/status`,
        ].join('\n');

    return { dd, verify, bootCurl };
  }, [recommendation.winner, netId, cleanUsbDev, activeIso, activeReleaseUrl]);

  const activeSnippet = commandSnippets[cmdTab] || commandSnippets.dd;
  const activeDaemon =
    INSPECTOR_TARGETS.find((d) => d.id === selectedDaemonId) || INSPECTOR_TARGETS[0];

  const handleCopy = async (key, text, label) => {
    await safeCopyText(text);
    setCopiedKey(key);
    setToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleDownloadHelper = () => {
    const script = `#!/usr/bin/env bash\n# Generated by ZothOS Edition & Boot Advisor (${activeVolume})\nset -euo pipefail\n\n${commandSnippets.verify}\n\n${commandSnippets.dd}\n`;
    downloadTextFile(`flash-${activeIso.replace('.iso', '')}.sh`, script, 'text/x-shellscript;charset=utf-8');
    setToast(`Downloaded flash-${activeIso.replace('.iso', '')}.sh!`);
  };

  return (
    <Box sx={{ mb: compact ? 6 : 9 }}>
      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 0.8,
          }}
        >
          INTERACTIVE EDITION &amp; HARDWARE BOOT ADVISOR · CLI &amp; DAEMON INSPECTOR
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 1.2 }}>
          Choose Your Sovereign Substrate:{' '}
          <Box component="span" className="text-gradient-gold">
            Workstation v3.4.0 vs Monotone Lite v1.2
          </Box>
        </Typography>
        <Typography sx={{ color: textSecondary, maxWidth: '72ch', lineHeight: 1.65 }}>
          Select your hardware RAM envelope, persistence posture, and mixnet routing below to compute the optimal ZothOS edition, synthesize verified <code>dd</code> USB flash &amp; checksum commands, and inspect live loopback daemon endpoints.
        </Typography>
      </Box>

      {/* Main Interactive Advisor Shell */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.2, sm: 3, md: 3.5 },
          borderRadius: 3.5,
          bgcolor: cardBg,
          border: `1px solid ${goldBorder}`,
          mb: 4,
        }}
      >
        {/* 3 Selector Rows */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2.5,
            mb: 3.5,
          }}
        >
          {/* 1. Hardware Profile */}
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: mono, fontSize: '0.7rem', fontWeight: 800, color: gold, mb: 1, letterSpacing: '0.08em' }}>
              1. HARDWARE PROFILE (x86_64)
            </Typography>
            <Stack spacing={0.8}>
              {HARDWARE_PROFILES.map((h) => {
                const active = hwId === h.id;
                return (
                  <Button
                    key={h.id}
                    size="small"
                    variant={active ? 'contained' : 'outlined'}
                    onClick={() => {
                      setOverrideEdition(null);
                      setHwId(h.id);
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      fontFamily: mono,
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      minHeight: 40,
                      px: 1.5,
                      borderRadius: 2,
                      borderColor: active ? gold : isDark ? 'rgba(255,255,255,0.14)' : '#D0D5DD',
                      color: active ? '#101828' : textPrimary,
                    }}
                  >
                    {h.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* 2. Persistence & Trace Posture */}
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: mono, fontSize: '0.7rem', fontWeight: 800, color: gold, mb: 1, letterSpacing: '0.08em' }}>
              2. PERSISTENCE &amp; OPSEC POSTURE
            </Typography>
            <Stack spacing={0.8}>
              {PERSISTENCE_PROFILES.map((p) => {
                const active = persistId === p.id;
                return (
                  <Button
                    key={p.id}
                    size="small"
                    variant={active ? 'contained' : 'outlined'}
                    onClick={() => {
                      setOverrideEdition(null);
                      setPersistId(p.id);
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      fontFamily: mono,
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      minHeight: 40,
                      px: 1.5,
                      borderRadius: 2,
                      borderColor: active ? gold : isDark ? 'rgba(255,255,255,0.14)' : '#D0D5DD',
                      color: active ? '#101828' : textPrimary,
                    }}
                  >
                    {p.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* 3. Network & USB Target */}
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: mono, fontSize: '0.7rem', fontWeight: 800, color: gold, mb: 1, letterSpacing: '0.08em' }}>
              3. MIXNET ROUTING &amp; USB TARGET
            </Typography>
            <Stack spacing={0.8} sx={{ mb: 1.4 }}>
              {NETWORK_PROFILES.map((n) => {
                const active = netId === n.id;
                return (
                  <Button
                    key={n.id}
                    size="small"
                    variant={active ? 'contained' : 'outlined'}
                    onClick={() => {
                      setOverrideEdition(null);
                      setNetId(n.id);
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      fontFamily: mono,
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      minHeight: 40,
                      px: 1.5,
                      borderRadius: 2,
                      borderColor: active ? gold : isDark ? 'rgba(255,255,255,0.14)' : '#D0D5DD',
                      color: active ? '#101828' : textPrimary,
                    }}
                  >
                    {n.label}
                  </Button>
                );
              })}
            </Stack>
            <TextField
              size="small"
              fullWidth
              label="Target USB Block Device"
              value={usbDev}
              onChange={(e) => setUsbDev(e.target.value)}
              inputProps={{ 'aria-label': 'Target USB Block Device' }}
              sx={{ '& input': { fontFamily: mono, fontSize: '0.78rem' } }}
            />
          </Box>
        </Box>

        {/* Side-by-Side Flagship Edition Comparator Cards (with Conic Border Beams!) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' },
            gap: 2.5,
            mb: 3.5,
          }}
        >
          {/* Card 1: ZothOS v3.4.0 Full KDE Plasma 6 Workstation */}
          <Box
            onClick={() => setOverrideEdition('v34')}
            className={recommendation.winner === 'v34' ? 'card-border-beam' : ''}
            sx={{
              p: { xs: 2.2, sm: 3 },
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: isDark ? '#0A0B12' : '#FAF8F2',
              border: `1.5px solid ${recommendation.winner === 'v34' ? gold : isDark ? 'rgba(255,255,255,0.12)' : '#DCD7CA'}`,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              <Chip
                label={
                  recommendation.winner === 'v34'
                    ? `★ RECOMMENDED • ${recommendation.v34Pct}% MATCH`
                    : `WORKSTATION EDITION • ${recommendation.v34Pct}% MATCH`
                }
                size="small"
                sx={{
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  bgcolor: isDark ? 'rgba(212,175,55,0.18)' : '#FEF9E7',
                  color: gold,
                  border: `1px solid ${goldBorder}`,
                }}
              />
              <Typography sx={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 800, color: resolveTone('#34D399', isDark) }}>
                16 GB+ RAM IDEAL
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ color: textPrimary, mb: 0.8 }}>
              ZothOS v3.4.0 Full KDE Plasma 6 Workstation
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary, mb: 2, lineHeight: 1.6 }}>
              Debian 13 (Trixie) + KDE Plasma 6 Wayland Sovereign AI Workstation built for persistent bare-metal NVMe &amp; KVM multi-agent engineering.
            </Typography>

            <Stack spacing={0.9} sx={{ mb: 2.2, flex: 1 }}>
              {[
                '80 Preloaded Sovereign Tools: 56 Web/WebGPU + 24 CLI across 79 public GitHub repos',
                '23+ System Daemons: Sovereign Agent Bridge (:8102), STDP Neuro-Memory (:8094), Vaēlor L1 (:8140)',
                'Hermes-Zoth Orchestrator + 163 MCP Server Registry + Ring 0–3 Kernel Isolation',
                'Kali Rolling + Parrot Security surgical APT parity & Argon2id RAM Vault (:8787)',
              ].map((line) => (
                <Box key={line} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: gold, mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: '0.81rem', color: textPrimary, lineHeight: 1.5 }}>
                    {line}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button
                size="small"
                variant={recommendation.winner === 'v34' ? 'contained' : 'outlined'}
                onClick={(e) => {
                  e.stopPropagation();
                  setOverrideEdition('v34');
                }}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem' }}
              >
                {recommendation.winner === 'v34' ? 'Selected for USB Flash' : 'Select v3.4.0 ISO'}
              </Button>
              <Button
                size="small"
                variant="outlined"
                href="https://github.com/1nc0gn30/zoth-os"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                onClick={(e) => e.stopPropagation()}
                sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.72rem', color: textPrimary, borderColor: goldBorder }}
              >
                zoth-os Repo
              </Button>
            </Box>
          </Box>

          {/* Card 2: ZothOS-Lite v1.2 Amnesic toram Live USB */}
          <Box
            onClick={() => setOverrideEdition('lite')}
            className={recommendation.winner === 'lite' ? 'card-border-beam-lite' : ''}
            sx={{
              p: { xs: 2.2, sm: 3 },
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: isDark ? '#090A0E' : '#F7F7F4',
              border: `1.5px solid ${recommendation.winner === 'lite' ? (isDark ? '#F7F7F4' : '#0A0D14') : isDark ? 'rgba(255,255,255,0.16)' : '#101828'}`,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              <Chip
                label={
                  recommendation.winner === 'lite'
                    ? `★ RECOMMENDED • ${recommendation.litePct}% MATCH`
                    : `AMNESIC LIVE USB • ${recommendation.litePct}% MATCH`
                }
                size="small"
                sx={{
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  bgcolor: isDark ? '#F7F7F4' : '#0A0D14',
                  color: isDark ? '#000000' : '#F7F7F4',
                  '& .MuiChip-label': {
                    color: isDark ? '#000000 !important' : '#F7F7F4 !important',
                  },
                }}
              />
              <Typography sx={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 800, color: resolveTone('#10B981', isDark) }}>
                4 GB+ UNIVERSAL x86_64
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ color: textPrimary, mb: 0.8 }}>
              ZothOS-Lite v1.2 Amnesic toram Live USB
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary, mb: 2, lineHeight: 1.6 }}>
              Tails-style Monotone (<code>#F7F7F4</code> / <code>#000000</code>) Live USB/ISO OS booting 100% into volatile RAM with zero disk trace.
            </Typography>

            <Stack spacing={0.9} sx={{ mb: 2.2, flex: 1 }}>
              {[
                '56 Curated Models Across 8 Providers: Ollama, Hermes/Nous, DeepSeek, OpenRouter, OpenAI, Anthropic, Gemini & Groq',
                'toram RAM-Only Zero-Trace Boot on universal x86_64 hardware (~400 MB Live ISO)',
                'ZothNet 3-Hop Sphinx Mixnet + Chain of Thoughts (zoth-cot) SHA-256 Merkle Memory DAG',
                'Optional USB / Cloud Encrypted Persistence (zoth-lite-storage) + AZOTH Braille Voice AI',
              ].map((line) => (
                <Box key={line} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: resolveTone('#10B981', isDark), mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: '0.81rem', color: textPrimary, lineHeight: 1.5 }}>
                    {line}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button
                size="small"
                variant={recommendation.winner === 'lite' ? 'contained' : 'outlined'}
                onClick={(e) => {
                  e.stopPropagation();
                  setOverrideEdition('lite');
                }}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem' }}
              >
                {recommendation.winner === 'lite' ? 'Selected for USB Flash' : 'Select Lite v1.2 ISO'}
              </Button>
              <Button
                size="small"
                variant="outlined"
                href="https://zothos-lite.nullai.tech"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                onClick={(e) => e.stopPropagation()}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', color: textPrimary, borderColor: isDark ? '#F7F7F4' : '#0A0D14' }}
              >
                zothos-lite.nullai.tech
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Generated USB Flash / Checksum / Boot Snippet Box */}
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2.5,
            bgcolor: subtleBg,
            border: `1px solid ${goldBorder}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1.2,
              mb: 1.8,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {[
                { id: 'dd', label: '1. dd USB Flash Cmd', icon: <UsbIcon sx={{ fontSize: 15 }} /> },
                { id: 'verify', label: '2. SHA-256 & Cosign Verify', icon: <VerifiedUserIcon sx={{ fontSize: 15 }} /> },
                { id: 'bootCurl', label: '3. Boot Args & curl Probe', icon: <TerminalIcon sx={{ fontSize: 15 }} /> },
              ].map((t) => (
                <Button
                  key={t.id}
                  size="small"
                  variant={cmdTab === t.id ? 'contained' : 'outlined'}
                  startIcon={t.icon}
                  onClick={() => setCmdTab(t.id)}
                  sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.71rem', minHeight: 38 }}
                >
                  {t.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={copiedKey === 'boot-snippet' ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={() => handleCopy('boot-snippet', activeSnippet, `${activeIso} snippet`)}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', minHeight: 38 }}
              >
                {copiedKey === 'boot-snippet' ? 'Copied!' : 'Copy Command'}
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadHelper}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', minHeight: 38 }}
              >
                Download .sh Helper
              </Button>
            </Box>
          </Box>

          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              borderRadius: 2,
              bgcolor: '#06070B',
              color: '#F5E6AB',
              border: '1px solid rgba(212, 175, 55, 0.28)',
              fontFamily: mono,
              fontSize: { xs: '0.72rem', sm: '0.78rem' },
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {activeSnippet}
          </Box>
        </Box>
      </Paper>

      {/* Part B: Interactive System Daemon & CLI Inspector */}
      {!compact && (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.2, sm: 3, md: 3.5 },
            borderRadius: 3.5,
            bgcolor: cardBg,
            border: `1px solid ${goldBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
            <Box>
              <Chip
                icon={<HubIcon sx={{ fontSize: '14px !important' }} />}
                label="LIVE LOOPBACK ENCLAVE & CLI INSPECTOR (1-CLICK COPY)"
                size="small"
                sx={{
                  mb: 1,
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  bgcolor: isDark ? 'rgba(52,211,153,0.14)' : '#ECFDF5',
                  color: resolveTone('#34D399', isDark),
                  border: `1px solid ${isDark ? 'rgba(52,211,153,0.35)' : '#A7F3D0'}`,
                }}
              />
              <Typography variant="h4" sx={{ color: textPrimary }}>
                Interactive Daemon &amp; Orchestrator Probe
              </Typography>
              <Typography variant="body2" sx={{ color: textSecondary, mt: 0.4 }}>
                Inspect Sovereign Agent Bridge (<code>:8102</code>), STDP Neuro-Memory (<code>:8094</code>), Vaēlor L1 (<code>:8140</code>), Hermes-Zoth, ZothOS-Lite (<code>:8145</code>), and ZothNet Sphinx Mixnet.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9, mb: 2.5 }}>
            {INSPECTOR_TARGETS.map((item) => {
              const selected = item.id === activeDaemon.id;
              const tone = resolveTone(item.accent, isDark);
              return (
                <Button
                  key={item.id}
                  size="small"
                  variant={selected ? 'contained' : 'outlined'}
                  onClick={() => setSelectedDaemonId(item.id)}
                  sx={{
                    fontFamily: mono,
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    minHeight: 38,
                    borderRadius: 2,
                    borderColor: selected ? gold : `${tone}66`,
                    color: selected ? '#101828' : tone,
                  }}
                >
                  {item.name} ({item.port})
                </Button>
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
              gap: 2.5,
              alignItems: 'stretch',
            }}
          >
            <Box
              sx={{
                p: 2.2,
                borderRadius: 2.5,
                bgcolor: subtleBg,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#DCD7CA'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 0,
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.96rem', color: textPrimary }}>
                    {activeDaemon.name}
                  </Typography>
                  <Chip
                    label={`${activeDaemon.edition} • ${activeDaemon.port}`}
                    size="small"
                    sx={{
                      fontFamily: mono,
                      fontWeight: 800,
                      fontSize: '0.65rem',
                      bgcolor: isDark ? 'rgba(212,175,55,0.14)' : '#FEF9E7',
                      color: gold,
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: textSecondary, mb: 2, lineHeight: 1.6 }}>
                  {activeDaemon.summary}
                </Typography>

                <Typography sx={{ fontFamily: mono, fontSize: '0.68rem', fontWeight: 800, color: gold, mb: 0.6 }}>
                  LOOPBACK HTTP / CURL HEALTH PROBE
                </Typography>
                <Box
                  sx={{
                    p: 1.3,
                    mb: 1.6,
                    borderRadius: 1.5,
                    bgcolor: '#06070B',
                    color: '#34D399',
                    fontFamily: mono,
                    fontSize: '0.73rem',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    border: '1px solid rgba(52,211,153,0.28)',
                  }}
                >
                  $ {activeDaemon.curlCmd}
                </Box>

                <Typography sx={{ fontFamily: mono, fontSize: '0.68rem', fontWeight: 800, color: gold, mb: 0.6 }}>
                  SOVEREIGN CLI INVOCATION
                </Typography>
                <Box
                  sx={{
                    p: 1.3,
                    mb: 2,
                    borderRadius: 1.5,
                    bgcolor: '#06070B',
                    color: '#F5E6AB',
                    fontFamily: mono,
                    fontSize: '0.73rem',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    border: '1px solid rgba(212,175,55,0.28)',
                  }}
                >
                  $ {activeDaemon.cliCmd}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={copiedKey === 'daemon-curl' ? <CheckIcon /> : <ContentCopyIcon />}
                  onClick={() => handleCopy('daemon-curl', activeDaemon.curlCmd, `${activeDaemon.name} curl command`)}
                  sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', minHeight: 38 }}
                >
                  {copiedKey === 'daemon-curl' ? 'Copied curl!' : 'Copy curl Probe'}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={copiedKey === 'daemon-cli' ? <CheckIcon /> : <ContentCopyIcon />}
                  onClick={() => handleCopy('daemon-cli', activeDaemon.cliCmd, `${activeDaemon.name} CLI command`)}
                  sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', minHeight: 38 }}
                >
                  {copiedKey === 'daemon-cli' ? 'Copied CLI!' : 'Copy CLI Cmd'}
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                p: 2.2,
                borderRadius: 2.5,
                bgcolor: '#06070B',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
              }}
            >
              <Typography sx={{ fontFamily: mono, fontSize: '0.68rem', fontWeight: 800, color: '#D4AF37', mb: 1, letterSpacing: '0.08em' }}>
                LIVE ENCLAVE TELEMETRY PAYLOAD (127.0.0.1)
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  flex: 1,
                  fontFamily: mono,
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}
              >
                {activeDaemon.sampleJson}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2800}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
