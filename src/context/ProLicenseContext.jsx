import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';
import BoltIcon from '@mui/icons-material/Bolt';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';
const DEPAY_INTEGRATION_ID = '428790dd-7ad1-407c-8ecf-c048c77a4cb8';
const STRIPE_ZOTHOS_PRO_URL = 'https://buy.stripe.com/fZu4gyaEleOsb9CdkIfw40K';
const STRIPE_BUNDLE_URL = 'https://buy.stripe.com/eVq14m5k16hW4Le0xWfw40M';
const STORAGE_KEY = 'zothos_pro_licensed';

const ProLicenseContext = createContext({
  isPro: false,
  stripeUrl: STRIPE_ZOTHOS_PRO_URL,
  stripeBundleUrl: STRIPE_BUNDLE_URL,
  openPaywallModal: () => {},
  openLicenseModal: () => {},
  openDePayCheckout: () => {},
  activateLicense: () => {},
});

export function useProLicense() {
  return useContext(ProLicenseContext);
}

export function ProLicenseProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [toast, setToast] = useState(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('licensed') === 'true' || params.get('session_id')) {
        window.localStorage.setItem(STORAGE_KEY, 'true');
        setIsPro(true);
        setToast('⭐ ZothOS Pro Founding Pass Activated! All ISO recipes & manifests unlocked.');
        return;
      }
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
        setIsPro(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const activateLicense = (rawKey) => {
    const k = String(rawKey || keyInput || '').trim();
    if (!k) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    setIsPro(true);
    setLicenseOpen(false);
    setPaywallOpen(false);
    setToast('⭐ Pro License Verified & Activated! All outputs permanently unlocked.');
  };

  const openDePayCheckout = () => {
    if (typeof window !== 'undefined' && window.DePayWidgets && typeof window.DePayWidgets.Payment === 'function') {
      window.DePayWidgets.Payment({
        integration: DEPAY_INTEGRATION_ID,
      });
    } else {
      setPaywallOpen(true);
    }
  };

  const valueMatrix = [
    'Custom Debian 13 + Kali/Parrot Live-Build ISO Script Generator',
    'Signed Ed25519 + SHA-256 GRUB2 Bootloader Manifest Exports',
    'Unthrottled Cloud-Init & KVM/QEMU GPU Passthrough Configs',
    'Full 22-Daemon Systemd Enclave Unit Bundle Export',
    'Sovereign USB Persistence & LUKS2 Crypto-Header Provisioner',
    'Lifetime Updates Across ZothOS v3.x & Zoth Studio v2 Enclaves',
  ];

  return (
    <ProLicenseContext.Provider
      value={{
        isPro,
        stripeUrl: STRIPE_ZOTHOS_PRO_URL,
        stripeBundleUrl: STRIPE_BUNDLE_URL,
        openPaywallModal: () => setPaywallOpen(true),
        openLicenseModal: () => {
          setPaywallOpen(false);
          setLicenseOpen(true);
        },
        openDePayCheckout,
        activateLicense,
      }}
    >
      {children}

      {/* High-Converting Pro Paywall Modal */}
      <Dialog
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? '#090A10' : '#FFFFFF',
            border: `1px solid ${gold}`,
            borderRadius: 3.5,
            boxShadow: '0 24px 64px rgba(0,0,0,0.85)',
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Chip
              label="FOUNDING LIFETIME ACCESS • 75% OFF"
              size="small"
              sx={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: 'rgba(212,175,55,0.15)',
                color: gold,
                border: `1px solid ${gold}`,
              }}
            />
            <IconButton aria-label="Close paywall modal" onClick={() => setPaywallOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Unlock <span className="text-gradient-gold">ZothOS Pro Foundry</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            One-time payment of <strong>$19</strong> (regularly <span style={{ textDecoration: 'line-through' }}>$79</span>). Instant lifetime unlock for custom live-build ISO scripts, signed bootloader manifests, and KVM enclave configs.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            {valueMatrix.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#34D399', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Button
              variant="contained"
              href={STRIPE_ZOTHOS_PRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<VerifiedIcon />}
              sx={{
                py: 1.35,
                fontWeight: 800,
                fontFamily: mono,
                bgcolor: '#635BFF',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#4F46E5' },
              }}
            >
              💳 Pay with Card / Apple Pay ($19 Lifetime — Stripe)
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={openDePayCheckout}
              startIcon={<BoltIcon />}
              sx={{
                py: 1.35,
                fontWeight: 800,
                fontFamily: mono,
              }}
            >
              ⚡ Pay with Solana / USDC ($19 Lifetime — DePay Web3)
            </Button>
            <Button
              variant="outlined"
              href={STRIPE_BUNDLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                py: 1.1,
                fontWeight: 800,
                fontFamily: mono,
                borderColor: gold,
                color: gold,
                fontSize: '0.78rem',
              }}
            >
              👑 All-Access Sovereign Bundle: ZothOS + Studio v2 + 30 Tools ($49)
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              size="small"
              onClick={() => {
                setPaywallOpen(false);
                setLicenseOpen(true);
              }}
              sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.secondary', textDecoration: 'underline' }}
            >
              Already purchased? Activate with License Key, Receipt Email, or Tx Signature →
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* License Key / Signature Activation Modal */}
      <Dialog
        open={licenseOpen}
        onClose={() => setLicenseOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? '#090A10' : '#FFFFFF',
            border: `1px solid ${gold}`,
            borderRadius: 3,
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
              <VpnKeyIcon sx={{ color: gold }} /> Activate ZothOS Pro
            </Typography>
            <IconButton aria-label="Close activation modal" onClick={() => setLicenseOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your Stripe receipt email, Solana transaction signature, or Sovereign Pro license key to unlock all exports permanently in this browser:
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Receipt Email, Solana Tx, or ZOTH-PRO-2026"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') activateLicense(keyInput);
            }}
            sx={{ mb: 2, '& input': { fontFamily: mono, fontSize: '0.85rem' } }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => activateLicense(keyInput)}
            sx={{ py: 1.2, fontWeight: 800, fontFamily: mono }}
          >
            ⚡ Verify &amp; Unlock Lifetime Access
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </ProLicenseContext.Provider>
  );
}

/**
 * Above-The-Fold High-Converting Sales Funnel Banner
 */
export function ProFunnelBanner() {
  const { isPro, openLicenseModal, openDePayCheckout } = useProLicense();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';

  if (isPro) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 3.5,
        borderRadius: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(18, 16, 10, 0.94) 0%, rgba(10, 11, 18, 0.96) 100%)'
          : 'linear-gradient(135deg, #FEF9E7 0%, #FFFFFF 100%)',
        border: `1px solid ${isDark ? 'rgba(212, 175, 55, 0.42)' : '#E2CE82'}`,
        boxShadow: isDark ? '0 10px 30px -8px rgba(212, 175, 55, 0.22)' : '0 4px 16px rgba(184, 134, 11, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ minWidth: 0, flex: '1 1 320px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
          <Chip
            label="✦ FOUNDING LIFETIME DEAL • 75% OFF"
            size="small"
            sx={{
              height: 22,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.68rem',
              bgcolor: isDark ? 'rgba(239, 68, 68, 0.16)' : '#FEE2E2',
              color: isDark ? '#FCA5A5' : '#B91C1C',
              border: '1px solid rgba(239, 68, 68, 0.35)',
            }}
          />
          <Typography variant="caption" sx={{ fontFamily: mono, color: gold, fontWeight: 700 }}>
            ISO BUILDER PRO + SIGNED BOOTLOADER MANIFESTS
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25, mb: 0.4 }}>
          Unlock Custom ZothOS v3.2 Live-Build Recipes &amp; Unthrottled Enclave Exports
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.84rem' }}>
          Test the interactive KDE Plasma 6.3 desktop, KVM kernel simulator, and daemon matrix free in-browser. Unlock full custom ISO synthesis and signed manifests for a single lifetime pass.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 0.8 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography sx={{ textDecoration: 'line-through', color: 'text.secondary', fontFamily: mono, fontSize: '0.9rem' }}>
            $79
          </Typography>
          <Typography sx={{ fontFamily: mono, fontWeight: 900, fontSize: '1.55rem', color: isDark ? '#34D399' : '#047857', lineHeight: 1 }}>
            $19
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: mono, color: 'text.secondary' }}>
            / lifetime
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="small"
            href={STRIPE_ZOTHOS_PRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<VerifiedIcon sx={{ fontSize: 15 }} />}
            sx={{
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.78rem',
              px: 2.2,
              py: 0.8,
              bgcolor: '#635BFF',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#4F46E5' },
            }}
          >
            💳 Card / Apple Pay ($19)
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={openDePayCheckout}
            startIcon={<BoltIcon sx={{ fontSize: 15 }} />}
            sx={{
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.78rem',
              px: 2.2,
              py: 0.8,
            }}
          >
            ⚡ Pay with SOL ($19)
          </Button>
        </Box>

        <Button
          size="small"
          onClick={openLicenseModal}
          sx={{
            p: 0,
            minHeight: 0,
            fontFamily: mono,
            fontSize: '0.72rem',
            color: 'text.secondary',
            textDecoration: 'underline',
            '&:hover': { bgcolor: 'transparent', color: gold },
          }}
        >
          Already purchased? Enter License Key or Receipt Email →
        </Button>
      </Box>
    </Paper>
  );
}

/**
 * Frosted Glass Blur Output Paywall Gate
 */
export function ProOutputGate({ title = 'Unlock Full Sovereign Script & Manifest Output', children }) {
  const { isPro, openDePayCheckout, openLicenseModal } = useProLicense();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';

  if (isPro) {
    return <Box sx={{ position: 'relative' }}>{children}</Box>;
  }

  return (
    <Box sx={{ position: 'relative', borderRadius: 2.5, overflow: 'hidden' }}>
      <Box
        sx={{
          filter: 'blur(6px)',
          userSelect: 'none',
          pointerEvents: 'none',
          opacity: 0.65,
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: isDark ? 'rgba(8, 8, 11, 0.78)' : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 3,
          border: `1px dashed ${gold}`,
          borderRadius: 2.5,
        }}
      >
        <LockIcon sx={{ fontSize: 34, color: gold, mb: 0.75 }} />
        <Chip
          label="PRO EXPORT LOCKED"
          size="small"
          sx={{
            fontFamily: mono,
            fontWeight: 800,
            fontSize: '0.66rem',
            bgcolor: 'rgba(212,175,55,0.16)',
            color: gold,
            mb: 1,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, maxWidth: 460 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 440, mb: 2, fontSize: '0.82rem' }}>
          Complete live-build ISO scripts, Ed25519 signed bootloader manifests, and unthrottled exports are unlocked with the $19 Founding Lifetime Pass.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="small"
            href={STRIPE_ZOTHOS_PRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<VerifiedIcon sx={{ fontSize: 15 }} />}
            sx={{
              fontFamily: mono,
              fontWeight: 800,
              px: 2.4,
              py: 0.95,
              bgcolor: '#635BFF',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#4F46E5' },
            }}
          >
            💳 Pay with Card ($19 — Stripe)
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={openDePayCheckout}
            startIcon={<BoltIcon sx={{ fontSize: 15 }} />}
            sx={{
              fontFamily: mono,
              fontWeight: 800,
              px: 2.4,
              py: 0.95,
            }}
          >
            ⚡ Pay with Solana ($19)
          </Button>
        </Box>
        <Button
          size="small"
          onClick={openLicenseModal}
          sx={{ mt: 1, fontFamily: mono, fontSize: '0.72rem', color: 'text.secondary', textDecoration: 'underline' }}
        >
          Have a key or receipt email? Activate Instantly →
        </Button>
      </Box>
    </Box>
  );
}
