import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UsbIcon from '@mui/icons-material/Usb';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { HeroReveal, HeroItem, GlowLine } from '../components/MotionReveal';
import EditionBootAdvisor from '../components/EditionBootAdvisor';
import { safeCopyText, downloadTextFile } from '../utils/clipboard';
import { resolveTone } from '../theme';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

export default function DownloadPage() {
  const [includeKaliFull, setIncludeKaliFull] = useState(true);
  const [includeOllamaModels, setIncludeOllamaModels] = useState(true);
  const [enableLuks2, setEnableLuks2] = useState(true);
  const [defaultPill, setDefaultPill] = useState('gold');
  const [toast, setToast] = useState(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';
  const cyanTone = resolveTone('#00F0FF', isDark);

  const customIsoRecipe = `#!/usr/bin/env bash
# ==============================================================================
# ZOTHOS v3.4.0 CUSTOM LIVE-BUILD ISO & COSIGN MANIFEST GENERATOR
# Profile: ${defaultPill.toUpperCase()} | Kali+Parrot: ${includeKaliFull ? 'ENABLED' : 'MINIMAL'} | LUKS2: ${enableLuks2 ? 'ON' : 'OFF'}
# Includes: Agent Bridge (:8102), STDP Memory (:8094), Vaēlor L1 (:8140), 83 Sovereign Tools
# ==============================================================================
set -euo pipefail

lb config \\
  --distribution trixie \\
  --archive-areas "main contrib non-free non-free-firmware" \\
  --bootappend-live "boot=live components quiet splash username=zoth hostname=zothos zoth_mode=${defaultPill}" \\
  --iso-volume "ZOTHOS_3_4_SOVEREIGN"

# Pin Kali Rolling & Parrot OS Security APT Priorities
cat << 'EOF' > config/archives/zoth-pinning.pref.chroot
Package: *
Pin: release n=trixie
Pin-Priority: 900

Package: *
Pin: release n=kali-rolling
Pin-Priority: ${includeKaliFull ? '400' : '100'}
EOF

${includeOllamaModels ? '# Pre-seed Local Ollama Models (qwen2.5-coder:14b, deepseek-r1:8b) + Hermes-Zoth\nexport ZOTH_PRELOAD_OLLAMA=1\nexport ZOTH_HERMES_ORCHESTRATOR=1' : '# Offline model pre-seeding skipped'}
${enableLuks2 ? '# Enable Calamares LUKS2 Argon2id Full-Disk Encryption\nexport ZOTH_CALAMARES_LUKS2=1' : ''}

sudo lb build 2>&1 | tee zothos-custom-build.log
sha256sum live-image-amd64.hybrid.iso > zothos-3.4.0-amd64.iso.sha256`;

  const handleCopyRecipe = async () => {
    await safeCopyText(customIsoRecipe);
    setToast('Copied Custom ZothOS v3.4.0 Live-Build ISO Recipe!');
  };

  const handleDownloadRecipe = () => {
    downloadTextFile(`build-zothos-3.4.0-${defaultPill}.sh`, customIsoRecipe, 'text/x-shellscript;charset=utf-8');
    setToast(`Downloaded build-zothos-3.4.0-${defaultPill}.sh!`);
  };

  const handleExportProfileJson = () => {
    const profileJson = JSON.stringify(
      {
        distro: 'ZothOS Linux',
        version: '3.4.0',
        isoVolume: 'ZOTHOS_3_4_SOVEREIGN',
        base: 'Debian 13 (trixie) + KDE Plasma 6 Wayland',
        preloadedTools: '83 Sovereign Tools (56 Web/WebGPU + 27 CLI, 82 public GitHub repos)',
        coreDaemons: ['sovereign-agent-bridge (:8102)', 'neuro-memory-daemon (:8094)', 'vaelor-l1-dag (:8140)', 'zoth-vault (:8787)'],
        defaultRealityPill: defaultPill,
        includeKaliParrotFull: includeKaliFull,
        preloadLocalOllamaModels: includeOllamaModels,
        calamaresLuks2Argon2id: enableLuks2,
      },
      null,
      2,
    );
    downloadTextFile(`zothos-3.4.0-profile-${defaultPill}.json`, profileJson, 'application/json;charset=utf-8');
    setToast(`Exported zothos-3.4.0-profile-${defaultPill}.json!`);
  };

  const copyText = async (txt, label) => {
    await safeCopyText(txt);
    setToast(`Copied ${label} to clipboard!`);
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <HeroReveal>
        <HeroItem>
          <GlowLine color={cyanTone} glowColor="rgba(0, 240, 255, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="HYBRID UEFI ISO • ZOTHOS-LITE TORAM USB • QEMU/KVM • COSIGN SIGNED"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              height: 'auto',
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.7rem',
              bgcolor: `${cyanTone}18`,
              color: cyanTone,
              border: `1px solid ${cyanTone}66`,
              '& .MuiChip-label': { whiteSpace: 'normal', py: 0.35 },
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Download <span className="text-gradient-gold">ZothOS v3.4.0 &amp; ZothOS-Lite v1.2</span>
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '66ch', mb: 5 }}>
            100% Free &amp; Open-Access: Flash the signed ZothOS v3.4.0 KDE Plasma 6 Wayland Workstation ISO, boot ZothOS-Lite v1.2 Amnesic <code>toram</code> Live USB, or synthesize a custom Debian 13 <code>live-build</code> script below.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* Interactive Edition & Hardware Boot Advisor */}
      <EditionBootAdvisor compact />

      {/* Primary Download Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3, mb: 6 }}>
        <Paper elevation={0} className="card-border-beam" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}`, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <UsbIcon sx={{ color: gold, fontSize: 32, flexShrink: 0 }} />
            <Chip
              label="WORKSTATION ISO • 83 TOOLS + 23+ DAEMONS"
              size="small"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                fontFamily: mono,
                fontWeight: 800,
                color: gold,
                '& .MuiChip-label': { whiteSpace: 'normal', py: 0.35 },
              }}
            />
          </Box>
          <Typography variant="h4" sx={{ mb: 1, fontFamily: mono, fontWeight: 800, letterSpacing: 0, overflowWrap: 'anywhere' }}>
            zothos-3.4.0-amd64.iso
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            Debian 13 (Trixie) + KDE Plasma 6 Wayland Hybrid UEFI &amp; Calamares LUKS2 Installer ISO. Ships with Sovereign Agent Bridge (<code>:8102</code>), STDP Neuro-Memory (<code>:8094</code>), Vaēlor L1 (<code>:8140</code>), Hermes-Zoth orchestrator, 83 preloaded sovereign tools (56 Web/WebGPU + 27 CLI), and Kali + Parrot security parity.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: '#07080D', border: '1px solid rgba(212, 175, 55, 0.35)', fontFamily: mono, fontSize: '0.73rem', fontWeight: 600, color: '#F5E6AB', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
            $ bash zothos-join-iso.sh &amp;&amp; sudo dd if=zothos-3.4.0-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync
          </Box>
          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              href="https://github.com/1nc0gn30/zoth-os/releases"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              sx={{ fontFamily: mono, fontWeight: 800 }}
            >
              Download v3.4.0 Release ISO
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  'bash zothos-join-iso.sh && sudo dd if=zothos-3.4.0-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync',
                  'ISO join & USB dd flash command',
                )
              }
              sx={{ fontFamily: mono, fontWeight: 700 }}
            >
              Copy Flash Cmd
            </Button>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}`, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <VerifiedUserIcon sx={{ color: gold, fontSize: 32, flexShrink: 0 }} />
            <Chip label="QEMU / KVM AGENT APPLIANCE" size="small" sx={{ fontFamily: mono, fontWeight: 800, color: gold }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1, fontFamily: mono, fontWeight: 800, overflowWrap: 'anywhere' }}>
            zothos.qcow2 (Agent VM)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            Dedicated QEMU/KVM virtual machine substrate for autonomous AI agents. Supports live chroot injection, automated invariant verification (<code>./tools/verify-zothos.sh</code>), Sovereign Agent Bridge (<code>:8102</code>), and <code>zoth-relay</code> (<code>:8765</code>) host bridging.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: '#07080D', border: '1px solid rgba(52, 211, 153, 0.35)', fontFamily: mono, fontSize: '0.73rem', fontWeight: 600, color: '#34D399', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
            $ ./tools/verify-zothos.sh &amp;&amp; virsh -c qemu:///system start zothos
          </Box>
          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              href="https://github.com/1nc0gn30/zoth-os"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              sx={{ fontFamily: mono, fontWeight: 800, borderColor: gold, color: gold }}
            >
              Inspect Source &amp; VM Tools
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  'qemu-system-x86_64 -enable-kvm -m 8192 -smp 4 -hda build/vms/zothos.qcow2',
                  'QEMU/KVM launch command',
                )
              }
              sx={{ fontFamily: mono, fontWeight: 700 }}
            >
              Copy KVM Boot Cmd
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Companion Amnesic Monotone Edition Card */}
      <Paper
        elevation={0}
        className="card-border-beam-lite"
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 6,
          borderRadius: 3.5,
          bgcolor: isDark ? '#0B0C12' : '#F7F7F4',
          border: `1.5px solid ${isDark ? '#F7F7F4' : '#000000'}`,
          minWidth: 0,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
          <Chip
            label="AMNESIC MONOTONE (#F7F7F4 / #000000) • TORAM • 56 MODELS • SPHINX MIXNET"
            size="small"
            sx={{
              height: 'auto',
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.68rem',
              bgcolor: isDark ? '#F7F7F4' : '#000000',
              color: isDark ? '#000000' : '#F7F7F4',
              '& .MuiChip-label': {
                whiteSpace: 'normal',
                py: 0.35,
                color: isDark ? '#000000 !important' : '#F7F7F4 !important',
              },
            }}
          />
          <Typography sx={{ fontFamily: mono, fontSize: '0.74rem', fontWeight: 800, color: gold }}>
            zothos-lite-1.2-amd64.iso (~400 MB)
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          ZothOS-Lite v1.2 — Tails-Style Amnesic Live USB/ISO OS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
          Boots 100% into volatile RAM (<code>toram noswap</code>) on universal x86_64 hardware, wiping all session state on power-off unless explicitly persisted via encrypted USB/cloud storage (<code>zoth-lite-storage</code>). Ships with <strong>56 curated AI models across 8 providers</strong>, <strong>ZothNet 3-hop Sphinx mixnet</strong>, and AZOTH Braille AI.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            href="https://zothos-lite.nullai.tech"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
            sx={{ fontFamily: mono, fontWeight: 800 }}
          >
            Open zothos-lite.nullai.tech
          </Button>
          <Button
            variant="outlined"
            href="https://github.com/1nc0gn30/zothos-lite"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<DownloadIcon />}
            sx={{ fontFamily: mono, fontWeight: 700 }}
          >
            ZothOS-Lite ISO Repo
          </Button>
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() =>
              copyText(
                'git clone https://github.com/1nc0gn30/zothos-lite.git && cd zothos-lite && sudo bash vm/build-vm-image.sh',
                'ZothOS-Lite ISO build command',
              )
            }
            sx={{ fontFamily: mono, fontWeight: 700 }}
          >
            Copy Lite Build Cmd
          </Button>
        </Box>
      </Paper>

      {/* Interactive Custom Live-Build ISO Studio */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
          <Box>
            <Typography variant="h4">
              Custom Debian 13 + Kali/Parrot Live-Build ISO Studio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Toggle build flags below to synthesize a custom <code>live-build</code> ISO script for your hardware profile.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyRecipe} sx={{ fontFamily: mono, fontWeight: 800 }}>
              Copy Custom ISO Script
            </Button>
            <Button size="small" variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadRecipe} sx={{ fontFamily: mono, fontWeight: 800 }}>
              Download .sh Script
            </Button>
            <Button size="small" variant="outlined" onClick={handleExportProfileJson} sx={{ fontFamily: mono, fontWeight: 800 }}>
              Export .json Profile
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Button
            size="small"
            variant={includeKaliFull ? 'contained' : 'outlined'}
            onClick={() => setIncludeKaliFull((v) => !v)}
            sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
          >
            Kali &amp; Parrot Tools: {includeKaliFull ? 'ON' : 'MINIMAL'}
          </Button>
          <Button
            size="small"
            variant={includeOllamaModels ? 'contained' : 'outlined'}
            onClick={() => setIncludeOllamaModels((v) => !v)}
            sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
          >
            Ollama + Hermes-Zoth: {includeOllamaModels ? 'ON' : 'OFF'}
          </Button>
          <Button
            size="small"
            variant={enableLuks2 ? 'contained' : 'outlined'}
            onClick={() => setEnableLuks2((v) => !v)}
            sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
          >
            Calamares LUKS2 Crypto: {enableLuks2 ? 'ON' : 'OFF'}
          </Button>
          {['gold', 'ghost', 'matrix'].map((m) => (
            <Button
              key={m}
              size="small"
              variant={defaultPill === m ? 'contained' : 'outlined'}
              onClick={() => setDefaultPill(m)}
              sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
            >
              Boot Mode: {m.toUpperCase()}
            </Button>
          ))}
        </Box>

        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2.5,
            borderRadius: 2,
            bgcolor: '#07080D',
            color: '#F5E6AB',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            fontFamily: mono,
            fontSize: '0.78rem',
            fontWeight: 600,
            lineHeight: 1.6,
            overflowX: 'auto',
          }}
        >
          {customIsoRecipe}
        </Box>
      </Paper>

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Container>
  );
}
