"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import ProductItem from "./ProductItem";
import { fetchHotProducts, selectHotProducts, selectHotProductsLoading, selectHotProductsError } from "@/redux/slices/hotProductSlice";
import { AppDispatch } from "@/redux/store";

export default function Sphot() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectHotProducts);
  const loading = useSelector(selectHotProductsLoading);
  const error = useSelector(selectHotProductsError);

  useEffect(() => {
    dispatch(fetchHotProducts());
  }, [dispatch]);

  return (
    <Box sx={{ p: 0, textAlign: "center" }}>
      {/* Banner */}

      {/* Tiêu đề sản phẩm */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          borderBottom: "3px solid #1976D2",
          display: "inline-block",
        }}
      >
        SẢN PHẨM BÁN CHẠY NHẤT
      </Typography>

      {/* Loading & Error Handling */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 3 }}>
          Lỗi: {error}
        </Typography>
      )}

      {/* Hiển thị sản phẩm */}
      {!loading && !error && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}