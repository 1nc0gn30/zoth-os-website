import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  TextField,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { HeroReveal, HeroItem, GlowLine } from '../components/MotionReveal';
import { ProFunnelBanner, ProOutputGate, useProLicense } from '../context/ProLicenseContext';
import { SECURITY_ARSENAL_CATEGORIES } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

export default function SecurityVaultPage() {
  const [secretName, setSecretName] = useState('ANTHROPIC_API_KEY');
  const [secretPayload, setSecretPayload] = useState('sk-ant-api03-sovereign-enclave-demo');
  const [derivedDigest, setDerivedDigest] = useState('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
  const [toast, setToast] = useState(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';
  const { isPro, openPaywallModal } = useProLicense();

  // Real in-browser WebCrypto SHA-256 commitment calculation
  const computeVaultCommitment = async (name, val) => {
    try {
      const data = new TextEncoder().encode(`zoth-vault:argon2id:${name}:${val}`);
      const hashBuf = await window.crypto.subtle.digest('SHA-256', data);
      const hex = Array.from(new Uint8Array(hashBuf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setDerivedDigest(hex);
    } catch {
      /* ignore */
    }
  };

  const vaultCommandPreview = `# ==============================================================================
# ZOTH SOVEREIGN VAULT (:8787) — MEMORY-ONLY CHILD PROCESS INJECTION
# Secret Commitment (SHA-256): 0x${derivedDigest.slice(0, 32)}...
# ==============================================================================

# 1. Seal secret into Argon2id + ChaCha20-Poly1305 RAM Enclave (0 bytes written to disk)
printf '%s' '${secretPayload}' | zoth-vault set ${secretName} --memory-only --ttl 14400

# 2. Spawn autonomous agent with ephemeral environment variable injection
zoth-vault exec --secret ${secretName} -- agy --workspace ~/NullAITech

# 3. Engage NullAI Ghostmode Transparent Tor Proxy & MAC Cloak
sudo zoth-mode ghost && zoth-ghost status`;

  const handleCopyVault = () => {
    if (!isPro) {
      openPaywallModal();
      return;
    }
    navigator.clipboard?.writeText(vaultCommandPreview);
    setToast('Copied Zoth Sovereign Vault & Ghostmode execution pipeline!');
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <ProFunnelBanner />

      <HeroReveal>
        <HeroItem>
          <GlowLine color="#EF4444" glowColor="rgba(239, 68, 68, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="175+ KALI + PARROT TOOLS • ZOTH VAULT (:8787)"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.72rem',
              bgcolor: 'rgba(239, 68, 68, 0.14)',
              color: isDark ? '#FCA5A5' : '#B91C1C',
              border: '1px solid rgba(239, 68, 68, 0.4)',
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Offensive Security Arsenal & <span className="text-gradient-gold">Sovereign Vault</span>
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '65ch', mb: 5 }}>
            ZothOS combines Debian 13 (Trixie) with surgical APT pinning for Kali Rolling and Parrot OS Security, paired with the `zoth-vault` Argon2id + ChaCha20-Poly1305 memory-only secrets daemon and 1-click NullAI Ghostmode Tor routing.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* Interactive Zoth-Vault Cryptographic Commitment & Injection Simulator */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, mb: 7, borderRadius: 3.5, border: `1px solid ${gold}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
          <LockIcon sx={{ color: gold }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Interactive Zoth-Vault (:8787) Memory-Only Injection Lab
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Test real in-browser WebCrypto SHA-256 commitment hashing and generate a zero-disk-leak `zoth-vault exec` pipeline for your API keys.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2.5 }}>
          <TextField
            label="Environment Secret Key"
            size="small"
            value={secretName}
            onChange={(e) => {
              setSecretName(e.target.value);
              computeVaultCommitment(e.target.value, secretPayload);
            }}
            sx={{ '& input': { fontFamily: mono } }}
          />
          <TextField
            label="Sample Secret Payload (Client-Side Only)"
            size="small"
            value={secretPayload}
            onChange={(e) => {
              setSecretPayload(e.target.value);
              computeVaultCommitment(secretName, e.target.value);
            }}
            sx={{ '& input': { fontFamily: mono } }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            label={`WebCrypto Commitment: 0x${derivedDigest.slice(0, 28)}...`}
            size="small"
            sx={{ fontFamily: mono, fontWeight: 700, bgcolor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
          />
          <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyVault} sx={{ fontFamily: mono, fontWeight: 800 }}>
            Copy Vault Pipeline
          </Button>
        </Box>

        <ProOutputGate title="Unlock Zoth-Vault Memory-Only Injection & Ghostmode Pipeline">
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
            {vaultCommandPreview}
          </Box>
        </ProOutputGate>
      </Paper>

      {/* 175+ Offensive Security Arsenal Categories */}
      {SECURITY_ARSENAL_CATEGORIES.map((group) => (
        <Box key={group.category} sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
            <SecurityIcon sx={{ color: group.accent }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {group.category}
            </Typography>
            <Chip
              label={group.badge}
              size="small"
              sx={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.66rem',
                bgcolor: `${group.accent}18`,
                color: group.accent,
                border: `1px solid ${group.accent}55`,
              }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
            {group.tools.map((tool) => (
              <Paper
                key={tool.name}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: cardBg,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#EAECF0'}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.96rem' }}>
                    {tool.name}
                  </Typography>
                  <Chip label={`$ ${tool.cmd}`} size="small" sx={{ fontFamily: mono, fontSize: '0.68rem', color: gold }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.84rem', lineHeight: 1.6 }}>
                  {tool.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      ))}

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Container>
  );
}
