"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterProducts, resetFilter , fetchAllProducts, fetchCategories } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProducts, products, loading } = useSelector(
    (state: RootState) => state.product
  );
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    dispatch(resetFilter());
    console.log("Dispatching fetchAllProducts and fetchCategories");
    dispatch(fetchAllProducts());
    dispatch(fetchCategories()); // Reset filter when page loads
  }, [dispatch]);

  useEffect(() => {
    setProductCount(filteredProducts.length);
  }, [filteredProducts]);

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Handle filter changes
  const handleFilterChange = (
    category: string,
    minPrice: number,
    maxPrice: number
  ) => {
    dispatch(filterProducts({ category, minPrice, maxPrice }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Trang chủ
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="small" />
          Sản phẩm
        </Typography>
      </Breadcrumbs>

      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Trang Sản Phẩm 🛒
        </Typography>
        <Divider />
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar with filters */}
        <Grid item xs={12} md={3}>
          <ProductFilter
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Grid>

        {/* Main content area */}
        <Grid item xs={12} md={9}>
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                Hiển thị <strong>{productCount}</strong> sản phẩm
              </Typography>
              {/* Sorting options could go here */}
            </Box>
          </Paper>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
