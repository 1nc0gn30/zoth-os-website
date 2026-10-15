import React from 'react';
import { Box } from '@mui/material';

const ASCII_ZOTHOS = [
  '███████╗ ██████╗ ████████╗██╗  ██╗ ██████╗ ███████╗',
  '╚══███╔╝██╔═══██╗╚══██╔══╝██║  ██║██╔═══██╗██╔════╝',
  '  ███╔╝ ██║   ██║   ██║   ███████║██║   ██║███████╗',
  ' ███╔╝  ██║   ██║   ██║   ██╔══██║██║   ██║╚════██║',
  '███████╗╚██████╔╝   ██║   ██║  ██║╚██████╔╝███████║',
  '╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝',
].join('\n');

const SIZES = {
  sm: { fontSize: '5.5px', lineHeight: 1.02, letterSpacing: '-0.12px', padX: 1.15, padY: 0.7 },
  md: { fontSize: '6.4px', lineHeight: 1.04, letterSpacing: '-0.08px', padX: 1.35, padY: 0.85 },
  lg: { fontSize: '7.6px', lineHeight: 1.05, letterSpacing: '0px', padX: 1.6, padY: 1 },
};

/**
 * Pure ASCII-art ZOTHOS brand mark in solid black (#0A0D14).
 * Zero images and no standard font text title.
 */
export default function ZothosAsciiLogo({ size = 'sm' }) {
  const s = SIZES[size] || SIZES.sm;

  return (
    <Box
      role="img"
      aria-label="ZOTHOS ASCII Logo"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: s.padX,
        py: s.padY,
        borderRadius: '8px',
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(212, 175, 55, 0.45)',
        boxShadow: '0 2px 10px -2px rgba(212, 175, 55, 0.16)',
        userSelect: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: '#D4AF37',
          boxShadow: '0 4px 16px -2px rgba(212, 175, 55, 0.30)',
        },
      }}
    >
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 0,
          fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          fontWeight: 900,
          color: '#0A0D14',
          whiteSpace: 'pre',
        }}
      >
        {ASCII_ZOTHOS}
      </Box>
    </Box>
  );
}
