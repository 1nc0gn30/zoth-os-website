import React from 'react';
import { Box } from '@mui/material';
import ProductHuntFeaturedBadge from './ProductHuntFeaturedBadge';
import ProductHuntReviewBadge from './ProductHuntReviewBadge';

export default function ProductHuntBadges() {
  return (
    <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
      <ProductHuntFeaturedBadge />
      <ProductHuntReviewBadge />
    </Box>
  );
}
