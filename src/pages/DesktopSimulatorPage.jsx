import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  InputBase,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { HeroReveal, HeroItem, GlowLine } from '../components/MotionReveal';
import InteractiveDesktopPreview from '../components/InteractiveDesktopPreview';
import { ProFunnelBanner, ProOutputGate, useProLicense } from '../context/ProLicenseContext';
import { REALITY_PILL_MODES } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const INITIAL_HISTORY = [
  {
    id: 1,
    type: 'system',
    text: [
      'ZOTHOS LINUX v3.2.0-RELEASE (Debian 13 Trixie • Linux 6.12-amd64 • KDE Plasma 6.3 Wayland)',
      'Host: zoth-pill.local • UFW Default-Deny Active • 22/22 Loopback Daemons Online.',
      'Type "help" or click any quick-command chip below to interact with the live kernel simulator.',
    ].join('\n'),
  },
];

const QUICK_CMDS = [
  'zoth status',
  'zoth-mode ghost',
  'zoth-mode gold',
  'zoth-mode matrix',
  'zoth doctor',
  'zoth-vault status',
  'zoth-heal --check',
  'ollama list',
  'uname -a',
  'clear',
];

export default function DesktopSimulatorPage() {
  const [activePill, setActivePill] = useState('gold');
  const [cpuPreset, setCpuPreset] = useState('4c8t');
  const [ramGb, setRamGb] = useState(16);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [cmdInput, setCmdInput] = useState('');
  const [toast, setToast] = useState(null);
  const endRef = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const { isPro, openPaywallModal } = useProLicense();

  const activeMode = REALITY_PILL_MODES.find((m) => m.id === activePill) || REALITY_PILL_MODES[0];

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history]);

  const runCommand = (raw) => {
    const cmd = String(raw || '').trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setCmdInput('');
      return;
    }

    const entries = [{ id: Date.now(), type: 'input', text: cmd }];

    if (lower.startsWith('zoth-mode ')) {
      const arg = lower.replace('zoth-mode ', '').trim();
      const map = { gold: 'gold', default: 'gold', ghost: 'ghost', stealth: 'ghost', matrix: 'matrix', incognito: 'cyan', cyan: 'cyan' };
      const target = map[arg] || 'gold';
      setActivePill(target);
      const pillInfo = REALITY_PILL_MODES.find((m) => m.id === target);
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          `[+] Switching ZothOS Reality Pill Profile -> ${pillInfo.name} (${pillInfo.glyph})`,
          `[✓] Applied KDE Plasma 6.3 theme, cursor constellation palette (${pillInfo.accent}), and security posture:`,
          `    ${pillInfo.posture}`,
        ].join('\n'),
      });
    } else if (lower === 'zoth status') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          '========================================================================',
          '                 ZOTHOS v3.2 SOVEREIGN HOST TELEMETRY                   ',
          '========================================================================',
          `[✓] HOSTNAME & DESKTOP: zoth-pill.local (KDE Plasma 6.3 Wayland • ${activeMode.name})`,
          '[✓] CURSOR COMPOSITOR:  zoth-cursor-daemon ONLINE (127.0.0.1:9989 @ 60 FPS)',
          '[✓] LOOPBACK ENCLAVES:  22 / 22 ACTIVE (:8094 STDP Memory .. :8120 Margin Sentinel)',
          '[✓] SOVEREIGN VAULT:    ONLINE (127.0.0.1:8787 • Argon2id + ChaCha20-Poly1305)',
          '[✓] THERMAL CEILING:    41.2°C / 55.0°C MAX (Fans: 0 RPM • no_turbo=1 Locked)',
          '[✓] FIREWALL POSTURE:   UFW DEFAULT-DENY (Allowed: lo, tailscale0, UDP 41641)',
          '========================================================================',
        ].join('\n'),
      });
    } else if (lower === 'zoth doctor') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          '>>> Running 10-Point ZothOS Cryptographic & Kernel Invariant Audit...',
          '[PASS] 01. Debian 13 Trixie + Kali/Parrot APT Pinning Cohesion',
          '[PASS] 02. Linux 6.12 Hybrid DRM (i915 + NVIDIA) & KVM Ring-0 VMX',
          '[PASS] 03. UFW Default-Deny & Zero-EgressSNI Proxy (:8095)',
          '[PASS] 04. Neuro-Memory STDP Vector Graph (:8094 SQLite WAL)',
          '[PASS] 05. Zoth Sovereign Vault (:8787 Memory-Only Secret Injection)',
          '[PASS] 06. 9 Frontier Coding Agents (agy, claude, grok, aider, cursor, cline, hermes, codex, ollama)',
          '[PASS] 07. Zoth Civilization 3D Society (:9393) & SimpleX Peer Bus (:5225)',
          '[PASS] 08. KDE Plasma 6.3 org.zothos.interactive QML Wallpaper & Cursor Daemon',
          '[PASS] 09. Thermal Ceiling < 55.0°C & Kokoro TTS Standby Guard',
          '[PASS] 10. Sigstore Cosign Release Digest Verified',
          'VERDICT: 10/10 Invariants Satisfied.',
        ].join('\n'),
      });
    } else if (lower === 'zoth-vault status') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          'ZOTH SOVEREIGN VAULT DAEMON v3.2 (127.0.0.1:8787)',
          '  KDF:        Argon2id (m=65536, t=4, p=4)',
          '  Cipher:     ChaCha20-Poly1305 (256-bit ephemeral key)',
          '  Backends:   [✓] zoth-vault  [✓] Bitwarden CLI (bw)  [✓] KeePassXC  [✓] UNIX Pass',
          '  Disk Leaks: 0 bytes (Secrets injected via anonymous pipe into child env)',
        ].join('\n'),
      });
    } else if (lower === 'zoth-heal --check') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          '[zoth-heal] Autonomous Resilience Daemon Check:',
          '  • PipeWire / WirePlumber Audio Stack .... NOMINAL',
          '  • KWin Wayland Compositor & Xwayland .... NOMINAL',
          '  • APT / DPKG Lock & Repository Pinning .. NOMINAL',
          '  • Btrfs Root Subvolume & NVMe SMART ..... NOMINAL (99% Health)',
        ].join('\n'),
      });
    } else if (lower === 'ollama list') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          'NAME                          ID              SIZE      MODIFIED',
          'qwen2.5-coder:14b-instruct    9b21e4a8d102    9.0 GB    2 hours ago',
          'deepseek-r1:8b                4f8c19e03a11    4.9 GB    5 hours ago',
          'llama3.2:3b                   a80c4f17acd5    2.0 GB    1 day ago',
          'nomic-embed-text:latest       0a109f422b47    274 MB    2 days ago',
        ].join('\n'),
      });
    } else if (lower === 'uname -a') {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: 'Linux zoth-pill 6.12.0-zoth-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.12.8-1 (2026-10-14) x86_64 GNU/Linux',
      });
    } else {
      entries.push({
        id: Date.now() + 1,
        type: 'output',
        text: [
          'Available ZothOS Simulator Commands:',
          '  zoth status                  Inspect host telemetry, thermal ceiling & 22 daemons',
          '  zoth-mode [gold|ghost|matrix|incognito]  Switch live Reality Pill desktop mode',
          '  zoth doctor                  Run 10-point cryptographic & kernel invariant audit',
          '  zoth-vault status            Inspect Argon2id + ChaCha20 secrets vault daemon',
          '  zoth-heal --check            Run autonomous self-healing diagnostic sweep',
          '  ollama list                  List local air-gapped LLMs on 127.0.0.1:11434',
          '  uname -a                     Print kernel & architecture info',
          '  clear                        Clear terminal output',
        ].join('\n'),
      });
    }

    setHistory((prev) => [...prev, ...entries]);
    setCmdInput('');
  };

  const generatedProfileScript = `#!/usr/bin/env bash
# ==============================================================================
# ZOTHOS v3.2 SOVEREIGN REALITY PROFILE & KVM HYPERVISOR CONFIG
# Generated for Reality Pill: ${activeMode.name} (${activeMode.id})
# ==============================================================================
set -euo pipefail

# 1. Apply Reality Pill Mode & KDE Plasma 6.3 Interactive Wallpaper
/usr/local/bin/zoth-mode ${activeMode.id}
systemctl --user enable --now zoth-cursor-daemon.service

# 2. Enforce Thermal & Acoustic Invariants (< 55.0C Ceiling, 0 RPM Passive)
echo 1 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo

# 3. Boot QEMU/KVM Guest Appliance (${cpuPreset.toUpperCase()} • ${ramGb}GB RAM)
qemu-system-x86_64 \\
  -name "zothos-v3.2-${activeMode.id}" \\
  -enable-kvm -cpu host \\
  -smp ${cpuPreset === '2c4t' ? '4,cores=2,threads=2' : cpuPreset === '4c8t' ? '8,cores=4,threads=2' : '16,cores=8,threads=2'} \\
  -m ${ramGb * 1024} \\
  -drive file=zoth-agent-os.qcow2,format=qcow2,if=virtio \\
  -nic user,model=virtio-net-pci,hostfwd=tcp:127.0.0.1:8094-:8094,hostfwd=tcp:127.0.0.1:8787-:8787
`;

  const handleCopyProfile = () => {
    if (!isPro) {
      openPaywallModal();
      return;
    }
    navigator.clipboard?.writeText(generatedProfileScript);
    setToast('Copied custom ZothOS KVM & Reality Profile script!');
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <ProFunnelBanner />

      <HeroReveal>
        <HeroItem>
          <GlowLine color={gold} glowColor="rgba(212, 175, 55, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="ZOTH-PILL DESKTOP & KVM KERNEL SIMULATOR"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.72rem',
              bgcolor: 'rgba(212,175,55,0.14)',
              color: gold,
              border: `1px solid ${gold}`,
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Interactive <span className="text-gradient-gold">Zoth-Pill Desktop</span> &amp; Kernel Shell
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '64ch', mb: 4 }}>
            Test the live KDE Plasma 6.3 Wayland interactive wallpaper (`org.zothos.interactive`), switch between the 4 Reality Pill modes (`zoth-mode`), and execute diagnostic commands in the `zoth-sh` kernel terminal.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* Interactive Desktop Canvas */}
      <InteractiveDesktopPreview activePillId={activePill} onSelectPill={setActivePill} />

      {/* Interactive Zoth-SH Kernel Terminal */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 6,
          borderRadius: 3.5,
          bgcolor: '#07080D',
          border: `1px solid ${activeMode.accent}66`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TerminalIcon sx={{ color: activeMode.accent }} />
            <Typography sx={{ fontFamily: mono, fontWeight: 800, color: '#EDEFF2', fontSize: '0.9rem' }}>
              zoth@zoth-pill:~ ({activeMode.name})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<PlayArrowIcon />}
              onClick={() => runCommand('zoth status')}
              sx={{ fontFamily: mono, fontSize: '0.72rem', color: activeMode.accent, borderColor: activeMode.accent }}
            >
              Run Telemetry Audit
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<HealthAndSafetyIcon />}
              onClick={() => runCommand('zoth doctor')}
              sx={{ fontFamily: mono, fontSize: '0.72rem', color: '#34D399', borderColor: '#34D399' }}
            >
              Run Zoth Doctor
            </Button>
          </Box>
        </Box>

        {/* Quick Command Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
          {QUICK_CMDS.map((c) => (
            <Chip
              key={c}
              label={c}
              size="small"
              clickable
              onClick={() => runCommand(c)}
              sx={{
                fontFamily: mono,
                fontSize: '0.7rem',
                bgcolor: 'rgba(255,255,255,0.05)',
                color: '#E2E8F0',
                border: '1px solid rgba(255,255,255,0.12)',
                '&:hover': { bgcolor: `${activeMode.accent}25`, borderColor: activeMode.accent },
              }}
            />
          ))}
        </Box>

        {/* Terminal Scroll Output */}
        <Box
          sx={{
            height: 290,
            overflowY: 'auto',
            p: 2,
            borderRadius: 2,
            bgcolor: '#040508',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: mono,
            fontSize: '0.78rem',
            lineHeight: 1.6,
            color: '#E2E8F0',
            mb: 1.5,
          }}
        >
          {history.map((item) => (
            <Box key={item.id} sx={{ mb: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {item.type === 'input' ? (
                <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', fontWeight: 800, color: activeMode.accent }}>
                  zoth@zoth-pill:~$ {item.text}
                </Typography>
              ) : (
                <Typography sx={{ fontFamily: mono, fontSize: '0.78rem', color: item.type === 'system' ? '#F5E6AB' : '#CBD5E1' }}>
                  {item.text}
                </Typography>
              )}
            </Box>
          ))}
          <div ref={endRef} />
        </Box>

        {/* Command Input Row */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(cmdInput);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            bgcolor: '#0B0D14',
            border: `1px solid ${activeMode.accent}55`,
          }}
        >
          <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', fontWeight: 800, color: activeMode.accent }}>
            zoth@zoth-pill:~$
          </Typography>
          <InputBase
            fullWidth
            placeholder="Type a command (e.g. zoth-mode ghost, zoth doctor, ollama list)..."
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            sx={{ fontFamily: mono, fontSize: '0.82rem', color: '#FFFFFF' }}
          />
          <Button type="submit" size="small" variant="contained" color="primary" sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}>
            Execute
          </Button>
        </Box>
      </Paper>

      {/* Hardware Allocation & Frosted Pro Output Synthesizer */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3.5,
          border: `1px solid ${gold}`,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Synthesized Reality Profile &amp; KVM Launch Script
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customize vCPU cores and RAM buffer below, then copy or export your automated ZothOS launch script.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['2c4t', '4c8t', '8c16t'].map((preset) => (
              <Button
                key={preset}
                size="small"
                variant={cpuPreset === preset ? 'contained' : 'outlined'}
                onClick={() => setCpuPreset(preset)}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
              >
                {preset.toUpperCase()}
              </Button>
            ))}
            {[8, 16, 32].map((gb) => (
              <Button
                key={gb}
                size="small"
                variant={ramGb === gb ? 'contained' : 'outlined'}
                onClick={() => setRamGb(gb)}
                sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
              >
                {gb}GB RAM
              </Button>
            ))}
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyProfile}
              sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
            >
              Copy Script
            </Button>
          </Box>
        </Box>

        <ProOutputGate title="Unlock Custom KVM & Reality Pill Automation Script">
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2.5,
              borderRadius: 2.5,
              bgcolor: '#07080D',
              color: '#F5E6AB',
              fontFamily: mono,
              fontSize: '0.78rem',
              lineHeight: 1.65,
              overflowX: 'auto',
              border: '1px solid rgba(212,175,55,0.28)',
            }}
          >
            {generatedProfileScript}
          </Box>
        </ProOutputGate>
      </Paper>

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Container>
  );
}
