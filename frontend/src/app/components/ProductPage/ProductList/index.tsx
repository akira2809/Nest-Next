'use client';

import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import ProductItem from '@/components/MainContent/BlockProduct/ProductItem';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  product_id: number;
  base_price: number;
  main_image: string;
  slug: string;
}

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  // Hiển thị thông báo nếu không có sản phẩm nào
  if (products.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Không tìm thấy sản phẩm phù hợp với bộ lọc
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductItem product={{ ...product, base_price: product.base_price.toString() }} />
        </Grid>
      ))}
    </Grid>
  );
}