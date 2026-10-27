import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Button,
  Grid,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LockIcon from '@mui/icons-material/Lock';
import HubIcon from '@mui/icons-material/Hub';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ProFunnelBanner, useProLicense } from '../context/ProLicenseContext';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const MCP_SERVERS = [
  {
    id: 'zoth-kernel-mcp',
    name: 'zoth-kernel-mcp',
    port: ':8109 / :9989',
    transport: 'stdio + loopback SSE',
    category: 'Kernel & Compositor',
    desc: 'Controls ZothOS Reality Pill modes (gold, ghost, matrix, incognito), 60 FPS KWin Wayland cursor physics (:9989), and <55°C thermal governance.',
    tools: ['zoth_mode_switch', 'zoth_thermal_telemetry', 'zoth_cursor_ripple'],
  },
  {
    id: 'zoth-vault-mcp',
    name: 'zoth-vault-mcp',
    port: ':8787',
    transport: 'stdio + loopback SSE',
    category: 'Argon2id Crypto Vault',
    desc: 'Hardware-anchored Argon2id + ChaCha20-Poly1305 secrets vault. Injects credentials directly into child process RAM without writing .env files to disk.',
    tools: ['vault_exec_ephemeral', 'vault_attestation_status', 'vault_rotate_lease'],
  },
  {
    id: 'zoth-hexstrike-mcp',
    name: 'zoth-hexstrike-mcp',
    port: ':8105 / :8112',
    transport: 'stdio + cgroups-v2 jail',
    category: 'Offensive Security',
    desc: 'Sandboxed MCP bridge to 175+ Kali Rolling & Parrot Security binaries (Nuclei, Subfinder, RustScan, Impacket, Certipy-AD, Ghidra headless).',
    tools: ['hexstrike_recon_scan', 'hexstrike_cve_audit', 'hexstrike_secret_scan'],
  },
  {
    id: 'zoth-memory-stdp-mcp',
    name: 'zoth-memory-stdp-mcp',
    port: ':8094',
    transport: 'stdio + loopback SSE',
    category: 'Biomorphic STDP Memory',
    desc: 'Spike-Timing-Dependent Plasticity (dw = A+ * exp(-dt/tau)) synaptic vector memory and SQLite HNSW graph index.',
    tools: ['stdp_memory_recall', 'stdp_memory_engram_store', 'stdp_synapse_decay_report'],
  },
  {
    id: 'zoth-daemons-mcp',
    name: 'zoth-daemons-mcp',
    port: ':8094–:8120',
    transport: 'stdio + loopback SSE',
    category: '22 Loopback Enclaves',
    desc: 'Unified health matrix, token budget circuit breaker (:8110), flight recorder (:8104), and POD commerce connectors (:8107–:8120).',
    tools: ['daemon_health_matrix', 'budget_sentinel_status', 'flight_recorder_tail'],
  },
];

const IDE_TARGETS = [
  {
    id: 'agy',
    label: 'Google Antigravity (AGY)',
    path: '~/.gemini/antigravity-cli/mcp_config.json',
  },
  {
    id: 'claude',
    label: 'Claude Code / Claude Desktop',
    path: '~/.config/Claude/claude_desktop_config.json',
  },
  {
    id: 'cursor',
    label: 'Cursor AI IDE',
    path: '~/.cursor/mcp.json',
  },
  {
    id: 'cline',
    label: 'Cline / Roo Code',
    path: '~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json',
  },
];

const PLAYGROUND_TOOLS = [
  {
    id: 'vault_exec_ephemeral',
    server: 'zoth-vault-mcp (:8787)',
    description: 'Execute a child process with Argon2id + ChaCha20-Poly1305 secrets injected strictly into mlockall() RAM.',
    defaultArgs: JSON.stringify(
      {
        secretNamespace: 'prod/stripe-solana-treasury',
        command: 'agy --verify-enclave --zero-egress',
        ttlSeconds: 45,
      },
      null,
      2,
    ),
    buildResponse: (parsed) => ({
      jsonrpc: '2.0',
      id: 'zoth-rpc-8787',
      result: {
        status: 'EPHEMERAL_LEASE_GRANTED',
        daemon: '127.0.0.1:8787 (zoth-vault-daemon)',
        kdf: 'Argon2id (m=65536 KiB, t=4, p=4)',
        cipher: 'XChaCha20-Poly1305',
        namespace: parsed.secretNamespace || 'prod/stripe-solana-treasury',
        commandExecuted: parsed.command || 'agy --verify-enclave',
        diskWritesBytes: 0,
        mlockallPages: 16,
        ttlSeconds: parsed.ttlSeconds || 45,
        zeroizedOnExit: true,
        latencyMs: 3.4,
      },
    }),
  },
  {
    id: 'zoth_mode_switch',
    server: 'zoth-kernel-mcp (:8109)',
    description: 'Switch ZothOS Reality Pill posture (gold, ghost, matrix, incognito) and re-bind nftables/Wayland shaders.',
    defaultArgs: JSON.stringify(
      {
        mode: 'ghost',
        verifyTor: true,
      },
      null,
      2,
    ),
    buildResponse: (parsed) => ({
      jsonrpc: '2.0',
      id: 'zoth-rpc-9989',
      result: {
        status: 'REALITY_PILL_SWITCHED',
        activeMode: parsed.mode || 'ghost',
        compositorShader: 'org.zothos.interactive (KDE Plasma 6.3 Wayland)',
        torTransparentProxy: (parsed.mode || 'ghost') === 'ghost' ? 'ACTIVE (127.0.0.1:9040 / DNS :9053)' : 'STANDBY (Clearnet + UFW Loopback)',
        macSpoofState: (parsed.mode || 'ghost') === 'ghost' ? 'ROTATED (02:4c:9a:f1:08:e3)' : 'HARDWARE_DEFAULT',
        thermalCeiling: '46.2°C (< 55.0°C lock)',
        latencyMs: 11.8,
      },
    }),
  },
  {
    id: 'stdp_memory_recall',
    server: 'zoth-memory-stdp-mcp (:8094)',
    description: 'Query the local SQLite HNSW vector matrix and update synaptic weights via Spike-Timing-Dependent Plasticity.',
    defaultArgs: JSON.stringify(
      {
        query: 'Kali Rolling + Parrot Security surgical APT pinning without breaking Debian 13 libc6',
        topK: 3,
        reinforceSynapse: true,
      },
      null,
      2,
    ),
    buildResponse: (parsed) => ({
      jsonrpc: '2.0',
      id: 'zoth-rpc-8094',
      result: {
        daemon: '127.0.0.1:8094 (neuro-memory-daemon)',
        stdpFormula: 'dw = A+ * exp(-dt / tau_plus)',
        query: parsed.query || 'APT pinning architecture',
        synapticDelta: '+0.1482',
        matches: [
          {
            engramId: 'eng_apt_trixie_900',
            similarity: 0.964,
            weight: 1.84,
            summary: '/etc/apt/preferences.d/zoth-parity.pref pins Debian 13 (Trixie) at 900 and Kali/Parrot at 400.',
          },
          {
            engramId: 'eng_cgroups_hexstrike',
            similarity: 0.912,
            weight: 1.52,
            summary: '175+ offensive binaries isolated inside Linux cgroups-v2 via agent-capsule-jail (:8105).',
          },
          {
            engramId: 'eng_ufw_zero_egress',
            similarity: 0.889,
            weight: 1.41,
            summary: 'UFW default-deny inbound + TLS SNI egress sentinel on 127.0.0.1:8095.',
          },
        ],
        latencyMs: 4.9,
      },
    }),
  },
  {
    id: 'hexstrike_recon_scan',
    server: 'zoth-hexstrike-mcp (:8112)',
    description: 'Run a cgroups-v2 sandboxed offensive reconnaissance workflow using ProjectDiscovery or RustScan.',
    defaultArgs: JSON.stringify(
      {
        target: '127.0.0.1',
        profile: 'rustscan-fast',
      },
      null,
      2,
    ),
    buildResponse: (parsed) => ({
      jsonrpc: '2.0',
      id: 'zoth-rpc-8112',
      result: {
        sandbox: '127.0.0.1:8105 (agent-capsule-jail cgroups-v2)',
        target: parsed.target || '127.0.0.1',
        profile: parsed.profile || 'rustscan-fast',
        openLoopbackEnclaves: [8094, 8095, 8097, 8098, 8104, 8105, 8107, 8109, 8112, 8113, 8787, 9393, 9989, 11434],
        externalEgressSockets: 0,
        flightRecorderHash: 'blake3:9f41e8c02b77d31a64f0912c8e11b40d',
        latencyMs: 18.2,
      },
    }),
  },
  {
    id: 'daemon_health_matrix',
    server: 'zoth-daemons-mcp (:8109)',
    description: 'Inspect live bind status, memory footprint, and zero-egress compliance across all 22 loopback daemons.',
    defaultArgs: JSON.stringify(
      {
        category: 'all',
      },
      null,
      2,
    ),
    buildResponse: (parsed) => ({
      jsonrpc: '2.0',
      id: 'zoth-rpc-8109',
      result: {
        filterCategory: parsed.category || 'all',
        onlineDaemons: 22,
        totalDaemons: 22,
        loopbackAddress: '127.0.0.1',
        totalRssMemoryMb: 418.4,
        cpuPackageTempC: 45.8,
        fanRpm: 0,
        zeroEgressViolations: 0,
        latencyMs: 2.1,
      },
    }),
  },
];

const AX_ENDPOINTS = [
  {
    path: '/.well-known/mcp.json',
    mime: 'application/json',
    purpose: 'Model Context Protocol (MCP) Server & Tool Schema Discovery Manifest',
    tokens: '~890 tokens',
    preview: `{
  "$schema": "https://modelcontextprotocol.io/schemas/2025-03-26/mcp-manifest.json",
  "protocolVersion": "2025-03-26",
  "name": "zothos-linux-mcp-mesh",
  "version": "3.3.0",
  "securityInvariants": {
    "zeroEgress": true,
    "loopbackBindOnly": "127.0.0.1",
    "secretInjection": "Argon2id + XChaCha20-Poly1305 (:8787)"
  },
  "mcpServers": {
    "zoth-kernel-mcp": { "sseEndpoint": "http://127.0.0.1:8109/mcp/kernel/sse" },
    "zoth-vault-mcp": { "sseEndpoint": "http://127.0.0.1:8787/mcp/sse" },
    "zoth-hexstrike-mcp": { "sseEndpoint": "http://127.0.0.1:8112/mcp/sse" },
    "zoth-memory-stdp-mcp": { "sseEndpoint": "http://127.0.0.1:8094/mcp/sse" },
    "zoth-daemons-mcp": { "sseEndpoint": "http://127.0.0.1:8109/mcp/daemons/sse" }
  }
}`,
  },
  {
    path: '/.well-known/agent.json',
    mime: 'application/json',
    purpose: 'A2A / Agent Experience (AX) Capability Card & Authentication Schemes',
    tokens: '~420 tokens',
    preview: `{
  "protocol": "A2A-AX/1.0",
  "name": "ZothOS Sovereign Operating System Agent",
  "id": "did:web:zothos.nullai.tech",
  "version": "3.3.0",
  "capabilities": {
    "streaming": true,
    "mcpStdio": true,
    "mcpSseLoopback": true,
    "zeroEgressEnclave": true,
    "hardwareVaultInjection": true,
    "offlineOllamaInference": true
  }
}`,
  },
  {
    path: '/llms.txt',
    mime: 'text/markdown',
    purpose: 'Concise LLM Grounding Summary for Perplexity, ClaudeBot, GPTBot & AGY',
    tokens: '~510 tokens',
    preview: `# ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 (zoth-pill) — Machine-Readable LLM Context (llms.txt)
> The Sovereign AI, Cryptographic Vault & Offensive Security Operating System
- Base: Debian 13 (Trixie) + Linux 6.12 Hybrid UEFI + Kali & Parrot APT Pinning
- Desktop: KDE Plasma 6.3 Wayland (org.zothos.interactive 3D wallpaper + :9989 cursor daemon)
- Agents (9): Antigravity (agy), Claude Code, Grok, Aider, Cursor, Cline, Hermes, OpenCode, Ollama
- Loopback Daemons (22): 127.0.0.1:8094 through :8120, :8787 Vault, :9393 Zoth Civilization`,
  },
  {
    path: '/llms-full.txt',
    mime: 'text/markdown',
    purpose: 'Complete Deep-Context Specification (APT Pinning, 22 Ports, 4 Reality Pills, MCP)',
    tokens: '~1,850 tokens',
    preview: `# ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 (zoth-pill) — Complete Technical Grounding Specification
SECTION 1: EXECUTIVE SUMMARY & ARCHITECTURAL IDENTITY
SECTION 2: FOUR REALITY PILL OPERATIONAL MODES (zoth-mode gold|ghost|matrix|incognito)
SECTION 3: 22 RESIDENT LOOPBACK DAEMONS (127.0.0.1 ENCLAVE MESH)
SECTION 4: 9 PRE-INSTALLED FRONTIER AI CODING AGENTS
SECTION 5: MODEL CONTEXT PROTOCOL (MCP) & AGENT EXPERIENCE (AX)`,
  },
];

export default function McpAxPage() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const goldAccent = dark ? '#D4AF37' : '#8A6508';
  const { isPro, openPaywallModal, openDePayCheckout } = useProLicense();

  // Config generator state
  const [ideTarget, setIdeTarget] = useState('agy');
  const [transportMode, setTransportMode] = useState('stdio');
  const [selectedServers, setSelectedServers] = useState(MCP_SERVERS.map((s) => s.id));
  const [copiedConfig, setCopiedConfig] = useState(false);

  // JSON-RPC Playground state
  const [selectedToolId, setSelectedToolId] = useState(PLAYGROUND_TOOLS[0].id);
  const [argsInput, setArgsInput] = useState(PLAYGROUND_TOOLS[0].defaultArgs);
  const [rpcOutput, setRpcOutput] = useState(() =>
    JSON.stringify(PLAYGROUND_TOOLS[0].buildResponse(JSON.parse(PLAYGROUND_TOOLS[0].defaultArgs)), null, 2),
  );
  const [rpcError, setRpcError] = useState('');

  // AX Endpoint inspector state
  const [selectedAxPath, setSelectedAxPath] = useState(AX_ENDPOINTS[0].path);

  const toggleServer = (id) => {
    setSelectedServers((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id],
    );
  };

  const generatedMcpConfig = useMemo(() => {
    const serversObj = {};
    MCP_SERVERS.filter((s) => selectedServers.includes(s.id)).forEach((srv) => {
      if (transportMode === 'stdio') {
        serversObj[srv.id] = {
          command: `/usr/local/bin/${srv.id}`,
          args: ['--transport', 'stdio', '--loopback-guard'],
          env: {
            ZOTH_LOOPBACK_ONLY: '1',
            ZOTH_VAULT_SOCKET: 'http://127.0.0.1:8787',
          },
        };
      } else {
        const port = srv.port.match(/:(\d+)/)?.[1] || '8109';
        serversObj[srv.id] = {
          url: `http://127.0.0.1:${port}/mcp/sse`,
          transport: 'sse',
          headers: {
            'X-Zoth-Enclave': 'loopback-verified',
          },
        };
      }
    });

    return JSON.stringify({ mcpServers: serversObj }, null, 2);
  }, [selectedServers, transportMode]);

  const handleCopyConfig = () => {
    if (!isPro) {
      openPaywallModal();
      return;
    }
    navigator.clipboard.writeText(generatedMcpConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleToolChange = (newId) => {
    setSelectedToolId(newId);
    const toolObj = PLAYGROUND_TOOLS.find((t) => t.id === newId) || PLAYGROUND_TOOLS[0];
    setArgsInput(toolObj.defaultArgs);
    setRpcError('');
    try {
      const parsed = JSON.parse(toolObj.defaultArgs);
      setRpcOutput(JSON.stringify(toolObj.buildResponse(parsed), null, 2));
    } catch {
      // ignore
    }
  };

  const handleRunRpc = () => {
    const toolObj = PLAYGROUND_TOOLS.find((t) => t.id === selectedToolId) || PLAYGROUND_TOOLS[0];
    try {
      const parsed = JSON.parse(argsInput);
      setRpcError('');
      setRpcOutput(JSON.stringify(toolObj.buildResponse(parsed), null, 2));
    } catch (err) {
      setRpcError(`Invalid JSON arguments: ${err.message}`);
    }
  };

  const currentAxEndpoint = AX_ENDPOINTS.find((e) => e.path === selectedAxPath) || AX_ENDPOINTS[0];
  const currentIdeTarget = IDE_TARGETS.find((t) => t.id === ideTarget) || IDE_TARGETS[0];

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <ProFunnelBanner />

        {/* Hero Header */}
        <Box sx={{ mb: 5 }}>
          <Chip
            icon={<HubIcon sx={{ fontSize: 15 }} />}
            label="MODEL CONTEXT PROTOCOL (152 SERVERS) • ZOTH-RELAY (:8765) • RING 0–3 AGENT SUBSTRATE"
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
            MCP & Agent Experience (AX) Hub
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 860, fontSize: '1.05rem', lineHeight: 1.7 }}>
            ZothOS v3.3.0 is built from Ring 0 up for autonomous AI agents to inhabit safely. It pairs a{' '}
            <strong>152-server Master MCP Catalog (<code>/etc/zothos/mcp-servers.json</code>)</strong> and{' '}
            <strong>5 Local Loopback Enclave Clusters</strong> with <strong><code>zoth-relay</code> (:8765)</strong>—letting multiple AI agents (AGY, Claude, Cursor, Grok, Muse Code, GPT Actions) work concurrently inside Landlock kernel sandboxes and Ring 0–3 permission boundaries.
          </Typography>
        </Box>

        {/* AX Readiness Scorecard */}
        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          {[
            {
              metric: '152 MCP Servers',
              title: 'Master Registry + 5 Local Clusters',
              detail: '/etc/zothos/mcp-servers.json (16 air-gapped offline + 5 loopback daemon clusters)',
            },
            {
              metric: 'Rings 0–3',
              title: 'zoth-agent-os Permission Guard',
              detail: 'SOVEREIGN (Ring 0), SYSADMIN (Ring 1), TOOLMASTER (Ring 2), SPECTRE (Ring 3)',
            },
            {
              metric: ':8765 Relay',
              title: 'zoth-relay Landlock Multi-Agent Bus',
              detail: '288-bit SHA-256 tokens, isolated ~/agent-workspace/<name> & JSON audit log',
            },
            {
              metric: '9 AI IDEs Ready',
              title: 'Pre-Wired Agent Clients',
              detail: 'Antigravity (agy), Claude Code, Cursor, Cline, Aider, Grok, Hermes, Codex & Ollama',
            },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              <Paper
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${dark ? 'rgba(212,175,55,0.25)' : '#E2CE82'}`,
                }}
              >
                <Typography sx={{ fontFamily: mono, fontWeight: 900, fontSize: '1.45rem', color: goldAccent, mb: 0.5 }}>
                  {card.metric}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                  {card.detail}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Section 1: Interactive JSON-RPC 2.0 MCP Tool Playground (Try-Before-You-Buy Value Realization) */}
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3.5, mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Chip
                label="LIVE CLIENT-SIDE JSON-RPC 2.0 INSPECTOR"
                size="small"
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.68rem', color: '#10B981', bgcolor: 'rgba(16,185,129,0.12)', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                1. Interactive MCP Tool Call Playground
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Select any resident ZothOS MCP tool, customize the JSON-RPC 2.0 input payload, and inspect the deterministic loopback enclave response.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleRunRpc}
              sx={{ fontFamily: mono, fontWeight: 800 }}
            >
              Execute MCP Tool Call
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel id="mcp-tool-select-label">Select Resident ZothOS MCP Tool</InputLabel>
                <Select
                  labelId="mcp-tool-select-label"
                  label="Select Resident ZothOS MCP Tool"
                  value={selectedToolId}
                  onChange={(e) => handleToolChange(e.target.value)}
                  sx={{ fontFamily: mono, fontSize: '0.85rem', fontWeight: 700 }}
                >
                  {PLAYGROUND_TOOLS.map((t) => (
                    <MenuItem key={t.id} value={t.id} sx={{ fontFamily: mono, fontSize: '0.82rem' }}>
                      {t.id} — [{t.server}]
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="caption" sx={{ fontFamily: mono, color: 'text.secondary', display: 'block', mb: 1 }}>
                {PLAYGROUND_TOOLS.find((t) => t.id === selectedToolId)?.description}
              </Typography>

              <TextField
                label="JSON-RPC params.arguments"
                multiline
                minRows={9}
                fullWidth
                value={argsInput}
                onChange={(e) => setArgsInput(e.target.value)}
                InputProps={{
                  sx: { fontFamily: mono, fontSize: '0.8rem', lineHeight: 1.55 },
                }}
              />
              {rpcError && (
                <Typography variant="caption" sx={{ color: '#EF4444', fontFamily: mono, display: 'block', mt: 1 }}>
                  {rpcError}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
                LOOPBACK ENCLAVE RESPONSE (JSON-RPC 2.0 RESULT)
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2.2,
                  borderRadius: 2.5,
                  bgcolor: '#08080B',
                  color: '#34D399',
                  border: '1px solid rgba(212,175,55,0.3)',
                  fontFamily: mono,
                  fontSize: '0.78rem',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                  minHeight: 265,
                }}
              >
                {rpcOutput}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Section 2: Multi-IDE MCP Config Generator with Frosted Glass Output Paywall Blur */}
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3.5, mb: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Chip
                label="ONE-CLICK IDE & AGENT CONFIG SYNTHESIZER"
                size="small"
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.68rem', color: goldAccent, bgcolor: dark ? 'rgba(212,175,55,0.14)' : '#FEF9E7', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                2. Multi-Agent `mcpServers` Configuration Generator
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Generate a zero-egress <code>mcpServers</code> manifest tailored for Google Antigravity (AGY), Claude Desktop/Code, Cursor AI, or Cline.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={copiedConfig ? <CheckIcon /> : <ContentCopyIcon />}
              onClick={handleCopyConfig}
              sx={{ fontFamily: mono, fontWeight: 800 }}
            >
              {copiedConfig ? 'Copied mcpServers JSON!' : 'Copy mcpServers Config'}
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Typography variant="subtitle2" sx={{ fontFamily: mono, fontWeight: 800, mb: 1 }}>
                STEP A: SELECT TARGET AI AGENT / IDE
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                {IDE_TARGETS.map((t) => (
                  <Chip
                    key={t.id}
                    label={t.label}
                    clickable
                    onClick={() => setIdeTarget(t.id)}
                    sx={{
                      fontFamily: mono,
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      bgcolor: ideTarget === t.id ? goldAccent : 'transparent',
                      color: ideTarget === t.id ? (dark ? '#08080B' : '#FFFFFF') : 'text.primary',
                      '& .MuiChip-label': {
                        color: ideTarget === t.id ? (dark ? '#08080B !important' : '#FFFFFF !important') : undefined,
                      },
                      border: `1px solid ${goldAccent}`,
                    }}
                  />
                ))}
              </Box>

              <Typography variant="caption" sx={{ fontFamily: mono, color: 'text.secondary', display: 'block', mb: 2.5 }}>
                Target Config File: <code>{currentIdeTarget.path}</code>
              </Typography>

              <Typography variant="subtitle2" sx={{ fontFamily: mono, fontWeight: 800, mb: 1 }}>
                STEP B: SELECT TRANSPORT PROTOCOL
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
                {[
                  { id: 'stdio', label: 'STDIO Binary Pipe (Recommended)' },
                  { id: 'sse', label: 'Loopback HTTP/SSE (127.0.0.1)' },
                ].map((tr) => (
                  <Chip
                    key={tr.id}
                    label={tr.label}
                    clickable
                    onClick={() => setTransportMode(tr.id)}
                    sx={{
                      fontFamily: mono,
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      bgcolor: transportMode === tr.id ? goldAccent : 'transparent',
                      color: transportMode === tr.id ? (dark ? '#08080B' : '#FFFFFF') : 'text.primary',
                      '& .MuiChip-label': {
                        color: transportMode === tr.id ? (dark ? '#08080B !important' : '#FFFFFF !important') : undefined,
                      },
                      border: `1px solid ${goldAccent}`,
                    }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ fontFamily: mono, fontWeight: 800, mb: 1 }}>
                STEP C: TOGGLE ZOTHOS MCP SERVER CLUSTERS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {MCP_SERVERS.map((srv) => {
                  const active = selectedServers.includes(srv.id);
                  return (
                    <Box
                      key={srv.id}
                      onClick={() => toggleServer(srv.id)}
                      sx={{
                        p: 1.25,
                        borderRadius: 2,
                        cursor: 'pointer',
                        border: `1px solid ${active ? goldAccent : theme.palette.divider}`,
                        bgcolor: active ? (dark ? 'rgba(212,175,55,0.10)' : '#FEF9E7') : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.8rem' }}>
                          {srv.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {srv.category} • {srv.port}
                        </Typography>
                      </Box>
                      <Chip
                        label={active ? 'ENABLED' : 'OFF'}
                        size="small"
                        sx={{
                          fontFamily: mono,
                          fontWeight: 800,
                          fontSize: '0.65rem',
                          bgcolor: active ? 'rgba(16,185,129,0.16)' : 'transparent',
                          color: active ? '#10B981' : 'text.secondary',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
                GENERATED {currentIdeTarget.label.toUpperCase()} MANIFEST ({selectedServers.length} SERVERS)
              </Typography>

              <Box sx={{ position: 'relative', borderRadius: 2.5, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.35)' }}>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 2.5,
                    bgcolor: '#08080B',
                    color: '#F5E6AB',
                    fontFamily: mono,
                    fontSize: '0.78rem',
                    lineHeight: 1.6,
                    overflowX: 'auto',
                    minHeight: 380,
                  }}
                >
                  {generatedMcpConfig}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Section 3: Machine-Readable AX Discovery Manifests Inspector */}
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VerifiedUserIcon sx={{ color: goldAccent }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              3. Live Agent Experience (AX) & Crawler Discovery Endpoints
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Autonomous search engines (PerplexityBot, ClaudeBot, GPTBot, Google SGE) and A2A coding agents index these canonical machine-readable endpoints with zero crawl delay.
          </Typography>

          <Table size="small" sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: mono, fontWeight: 800 }}>Endpoint URI</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 800 }}>MIME Type</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 800 }}>Payload Budget</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 800 }}>Specification Purpose</TableCell>
                <TableCell align="right" sx={{ fontFamily: mono, fontWeight: 800 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AX_ENDPOINTS.map((ep) => (
                <TableRow
                  key={ep.path}
                  hover
                  selected={selectedAxPath === ep.path}
                  onClick={() => setSelectedAxPath(ep.path)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent }}>{ep.path}</TableCell>
                  <TableCell sx={{ fontFamily: mono, fontSize: '0.78rem' }}>{ep.mime}</TableCell>
                  <TableCell sx={{ fontFamily: mono, fontSize: '0.78rem' }}>{ep.tokens}</TableCell>
                  <TableCell sx={{ fontSize: '0.84rem' }}>{ep.purpose}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      href={ep.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />}
                      sx={{ fontFamily: mono, fontSize: '0.72rem' }}
                    >
                      Raw
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 800, color: goldAccent, display: 'block', mb: 1 }}>
            LIVE PAYLOAD PREVIEW: {currentAxEndpoint.path}
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2.2,
              borderRadius: 2,
              bgcolor: '#08080B',
              color: '#E6EDF3',
              border: '1px solid rgba(212,175,55,0.28)',
              fontFamily: mono,
              fontSize: '0.78rem',
              lineHeight: 1.55,
              overflowX: 'auto',
            }}
          >
            {currentAxEndpoint.preview}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
