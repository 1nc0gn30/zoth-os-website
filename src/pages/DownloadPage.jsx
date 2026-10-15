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
import { HeroReveal, HeroItem, GlowLine } from '../components/MotionReveal';
import { ProFunnelBanner, ProOutputGate, useProLicense } from '../context/ProLicenseContext';

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
  const { isPro, openPaywallModal } = useProLicense();

  const customIsoRecipe = `#!/usr/bin/env bash
# ==============================================================================
# ZOTHOS v3.2 CUSTOM LIVE-BUILD ISO & COSIGN MANIFEST GENERATOR
# Profile: ${defaultPill.toUpperCase()} | Kali+Parrot: ${includeKaliFull ? 'ENABLED' : 'MINIMAL'} | LUKS2: ${enableLuks2 ? 'ON' : 'OFF'}
# ==============================================================================
set -euo pipefail

lb config \\
  --distribution trixie \\
  --archive-areas "main contrib non-free non-free-firmware" \\
  --bootappend-live "boot=live components quiet splash username=zoth hostname=zoth-pill zoth_mode=${defaultPill}" \\
  --iso-volume "ZOTHOS_3_2_SOVEREIGN"

# Pin Kali Rolling & Parrot OS Security APT Priorities
cat << 'EOF' > config/archives/zoth-pinning.pref.chroot
Package: *
Pin: release n=trixie
Pin-Priority: 900

Package: *
Pin: release n=kali-rolling
Pin-Priority: ${includeKaliFull ? '400' : '100'}
EOF

${includeOllamaModels ? '# Pre-seed Local Ollama Models (qwen2.5-coder:14b, deepseek-r1:8b)\nexport ZOTH_PRELOAD_OLLAMA=1' : '# Offline model pre-seeding skipped'}
${enableLuks2 ? '# Enable Calamares LUKS2 Argon2id Full-Disk Encryption\nexport ZOTH_CALAMARES_LUKS2=1' : ''}

sudo lb build 2>&1 | tee zothos-custom-build.log
sha256sum live-image-amd64.hybrid.iso > zothos-3.2-amd64.iso.sha256`;

  const handleCopyRecipe = () => {
    if (!isPro) {
      openPaywallModal();
      return;
    }
    navigator.clipboard?.writeText(customIsoRecipe);
    setToast('Copied Custom ZothOS v3.2 Live-Build ISO Recipe!');
  };

  const copyText = (txt, label) => {
    navigator.clipboard?.writeText(txt);
    setToast(`Copied ${label} to clipboard!`);
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <ProFunnelBanner />

      <HeroReveal>
        <HeroItem>
          <GlowLine color="#00F0FF" glowColor="rgba(0, 240, 255, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="HYBRID UEFI ISO • QEMU/KVM QCOW2 • COSIGN SIGNED"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.72rem',
              bgcolor: 'rgba(0, 240, 255, 0.12)',
              color: isDark ? '#00F0FF' : '#0369A1',
              border: '1px solid rgba(0, 240, 255, 0.4)',
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Download <span className="text-gradient-gold">ZothOS Linux v3.2</span> &amp; ISO Studio
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '64ch', mb: 5 }}>
            Flash the signed Hybrid UEFI/BIOS ISO directly to USB for bare-metal execution, boot the QEMU/KVM virtual appliance, or synthesize a custom `live-build` image below.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* Primary Download Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 6 }}>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <UsbIcon sx={{ color: gold, fontSize: 32 }} />
            <Chip label="BARE METAL & LIVE USB" size="small" sx={{ fontFamily: mono, fontWeight: 800, color: gold }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            zothos-3.2-amd64.iso
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65 }}>
            Hybrid UEFI + Legacy BIOS Live &amp; Calamares Installer ISO. Includes KDE Plasma 6.3 Wayland (`zoth-pill`), 175+ Kali/Parrot tools, 9 AI coding agents, and 22 loopback daemons.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: isDark ? '#07080D' : '#FAF9F5', border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)', fontFamily: mono, fontSize: '0.74rem', fontWeight: 600, color: isDark ? '#F5E6AB' : '#0A0D14', overflowX: 'auto' }}>
            SHA-256: 8f4e2b9c78d3a1e50647bf04c264a938e55e34b79101683dcf8a804791e2b5e2
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
              Download Release ISO
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  'sudo dd if=zothos-3.2-amd64.iso of=/dev/sdX status=progress bs=4M conv=fdatasync',
                  'USB dd flash command',
                )
              }
              sx={{ fontFamily: mono, fontWeight: 700 }}
            >
              Copy USB Flash Cmd
            </Button>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <VerifiedUserIcon sx={{ color: gold, fontSize: 32 }} />
            <Chip label="QEMU / KVM APPLIANCE" size="small" sx={{ fontFamily: mono, fontWeight: 800, color: gold }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            zoth-agent-os.qcow2
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65 }}>
            Pre-installed QEMU/KVM VirtIO disk image with pre-configured loopback port-forwarding (`:8094` STDP Memory, `:8787` Zoth Vault, `:9393` Civilization) and Sigstore cosign attestation.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: isDark ? '#07080D' : '#FAF9F5', border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)', fontFamily: mono, fontSize: '0.74rem', fontWeight: 600, color: isDark ? '#34D399' : '#0A0D14', overflowX: 'auto' }}>
            $ cosign verify-blob --key cosign.pub --signature zothos-3.2.sig zothos-3.2-amd64.iso
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
              Inspect Source &amp; Cosign Key
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  'qemu-system-x86_64 -enable-kvm -m 8192 -smp 4 -hda zoth-agent-os.qcow2',
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

      {/* Interactive Custom Live-Build ISO Studio */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Interactive Custom Debian 13 + Kali/Parrot Live-Build ISO Studio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Toggle build flags below to synthesize a custom `live-build` ISO script for your hardware profile.
            </Typography>
          </Box>
          <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyRecipe} sx={{ fontFamily: mono, fontWeight: 800 }}>
            Copy Custom ISO Script
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Button
            size="small"
            variant={includeKaliFull ? 'contained' : 'outlined'}
            onClick={() => setIncludeKaliFull((v) => !v)}
            sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
          >
            Kali + Parrot 175+ Arsenal: {includeKaliFull ? 'ON' : 'MINIMAL'}
          </Button>
          <Button
            size="small"
            variant={includeOllamaModels ? 'contained' : 'outlined'}
            onClick={() => setIncludeOllamaModels((v) => !v)}
            sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
          >
            Pre-Seed Local Ollama Models: {includeOllamaModels ? 'ON' : 'OFF'}
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

        <ProOutputGate title="Unlock Custom Live-Build ISO Synthesis Script & APT Pinning Config">
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2.5,
              borderRadius: 2,
              bgcolor: isDark ? '#07080D' : '#FAF9F5',
              color: isDark ? '#F5E6AB' : '#0A0D14',
              border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)',
              fontFamily: mono,
              fontSize: '0.78rem',
              fontWeight: 600,
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
          >
            {customIsoRecipe}
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
