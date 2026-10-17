import React from 'react';
import { Box, useTheme } from '@mui/material';

const HREF =
  'https://www.producthunt.com/products/zothos/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-zothos';

export default function ProductHuntReviewBadge() {
  const theme = useTheme();
  const widgetTheme = theme.palette.mode === 'dark' ? 'dark' : 'light';

  return (
    <Box
      component="a"
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Review ZOTHOS on Product Hunt"
      sx={{ display: 'inline-flex', lineHeight: 0, flexShrink: 0 }}
    >
      <Box
        component="img"
        src={`https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1333989&theme=${widgetTheme}`}
        alt="ZOTHOS - Debian 13 + KDE Plasma 6 OS for AI agents and security | Product Hunt"
        width={250}
        height={54}
        sx={{ width: 250, height: 54, display: 'block' }}
      />
    </Box>
  );
}
