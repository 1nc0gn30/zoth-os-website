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
import { ISO_RELEASE, MAINLINE_CLIS } from '../data/zothOsData';

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
# Profile: ${defaultPill.toUpperCase()} | Kali+Parrot pin: ${includeKaliFull ? '400' : '100'} | LUKS2: ${enableLuks2 ? 'ON' : 'OFF'}
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
            label="v3.2.0 SPLIT ISO • 5 PARTS • COSIGN SIGNED"
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
            The GitHub release is five ISO parts plus a join script, not a single file and not a qcow2. Rejoin, check the SHA-256, then flash a USB of at least 16 GB. Studio on any machine is {ISO_RELEASE.studioCli}.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* Primary Download Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 6 }}>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <UsbIcon sx={{ color: gold, fontSize: 32 }} />
            <Chip label="BARE METAL & LIVE USB (HUMAN + AGENT HOST)" size="small" sx={{ fontFamily: mono, fontWeight: 800, color: gold }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1, fontFamily: mono, fontWeight: 700, letterSpacing: 0 }}>
            zothos-3.2-amd64.iso
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            v3.2.0 ({ISO_RELEASE.tagDate}) is a hybrid UEFI and legacy BIOS live image with Calamares (`launch-calamares`). Download {ISO_RELEASE.parts[0]} through part04, {ISO_RELEASE.join}, SHA256SUMS, and SHA256SUMS.cosign.bundle into one folder. The join script checks SHA-256 before it prints the image name. Live users are <code>zoth</code>, <code>azoth</code>, and <code>root</code>; password <code>zoth</code>. <code>zoth-auth-init</code> removes the old <code>neo</code> account on boot. The image includes KDE Plasma 6.3, a 152-entry MCP catalog that stays off until enabled, about 75 curated security packages, and the loopback daemons documented in the README.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: isDark ? '#07080D' : '#FAF9F5', border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)', fontFamily: mono, fontSize: '0.73rem', fontWeight: 600, color: isDark ? '#F5E6AB' : '#0A0D14', overflowX: 'auto' }}>
            $ bash zothos-join-iso.sh &amp;&amp; sudo dd if=zothos-3.2-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync
          </Box>
          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              href="https://github.com/NullAITech/zoth-os/releases/tag/v3.2.0"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              sx={{ fontFamily: mono, fontWeight: 800 }}
            >
              Open v3.2.0 Release Assets
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  'bash zothos-join-iso.sh && sudo dd if=zothos-3.2-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync',
                  'ISO join & USB dd flash command',
                )
              }
              sx={{ fontFamily: mono, fontWeight: 700 }}
            >
              Copy Rejoin &amp; Flash Cmd
            </Button>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <VerifiedUserIcon sx={{ color: gold, fontSize: 32 }} />
            <Chip label="NO QCOW2 IN THE RELEASE" size="small" sx={{ fontFamily: mono, fontWeight: 800, color: gold }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 1, fontFamily: mono, fontWeight: 700, letterSpacing: 0 }}>
            QEMU from the ISO
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            v3.2.0 does not publish a qcow2. <code>docs/VM_VALIDATION.md</code> describes a local disk at <code>build/vms/zothos.qcow2</code> after you build one. Boot the rejoined ISO with the repo helper, or verify checksums with <code>./tools/verify-iso.sh</code> and the suite in <code>./tools/test-zothos.sh</code>.
          </Typography>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: 2, bgcolor: isDark ? '#07080D' : '#FAF9F5', border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)', fontFamily: mono, fontSize: '0.73rem', fontWeight: 600, color: isDark ? '#34D399' : '#0A0D14', overflowX: 'auto' }}>
            $ ./tools/test-zothos.sh --iso build/zothos-3.2-amd64.iso
          </Box>
          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              href="https://github.com/NullAITech/zoth-os"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadIcon />}
              sx={{ fontFamily: mono, fontWeight: 800, borderColor: gold, color: gold }}
            >
              Inspect Source &amp; VM Docs
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyText(
                  './tools/test-zothos.sh --iso build/zothos-3.2-amd64.iso',
                  'ISO boot helper',
                )
              }
              sx={{ fontFamily: mono, fontWeight: 700 }}
            >
              Copy ISO Boot Cmd
            </Button>
          </Box>
        </Paper>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3.5, bgcolor: cardBg, border: `1px solid ${gold}`, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Git main after the v3.2.0 ISO ({ISO_RELEASE.mainThrough})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '78ch', lineHeight: 1.65 }}>
          VERSION is still 3.2.0. These commands are in <code>config/includes.chroot/usr/local/bin</code> on main. They are not in the 13 Oct release assets. Rebuild from main if you want them on a USB. Zoth Studio itself stays <code>{ISO_RELEASE.studioCli}</code> (package <code>{ISO_RELEASE.packageCli}</code>), which is separate from this ISO.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5 }}>
          {MAINLINE_CLIS.map((item) => (
            <Box key={item.cmd} sx={{ p: 1.5, borderRadius: 2, bgcolor: isDark ? '#07080D' : '#FAF9F5', border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)' }}>
              <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.78rem', color: gold, mb: 0.5 }}>{item.cmd}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>{item.note}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

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
            Kali + Parrot pin 400: {includeKaliFull ? 'ON' : 'MINIMAL'}
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
