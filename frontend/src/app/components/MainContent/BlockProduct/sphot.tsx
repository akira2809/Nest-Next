"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ProductItem from "./ProductItem";
import {
  fetchHotProducts,
  selectHotProducts,
  selectHotProductsLoading,
  selectHotProductsError,
} from "@/redux/slices/hotProductSlice";
import { AppDispatch } from "@/redux/store";

export default function Sphot() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectHotProducts);
  const loading = useSelector(selectHotProductsLoading);
  const error = useSelector(selectHotProductsError);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchHotProducts());
    }
  }, [dispatch, products.length]);

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      {/* Tiêu đề sản phẩm */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          borderBottom: "3px solid #1976D2",
          display: "inline-block",
          paddingBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          paddingLeft: "90px", // Thêm padding bên trái
          paddingRight: "90px", // Thêm padding bên phải
        }}
      >
        SẢN PHẨM BÁN CHẠY NHẤT
      </Typography>

      {/* Loading Skeleton */}
      {loading && (
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton width="80%" sx={{ mt: 1 }} />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Error Handling */}
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
