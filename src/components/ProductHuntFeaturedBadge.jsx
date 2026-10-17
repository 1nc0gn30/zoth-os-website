import React from 'react';
import { Box, useTheme } from '@mui/material';

const HREF =
  'https://www.producthunt.com/products/zothos?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-zothos-2';

export default function ProductHuntFeaturedBadge() {
  const theme = useTheme();
  const widgetTheme = theme.palette.mode === 'dark' ? 'dark' : 'light';

  return (
    <Box
      component="a"
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ZOTHOS on Product Hunt"
      sx={{ display: 'inline-flex', lineHeight: 0, flexShrink: 0 }}
    >
      <Box
        component="img"
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1276873&theme=${widgetTheme}&t=1792205107200`}
        alt="ZOTHOS - Debian 13 + KDE Plasma 6 OS for AI agents and security | Product Hunt"
        width={250}
        height={54}
        sx={{ width: 250, height: 54, display: 'block' }}
      />
    </Box>
  );
}
