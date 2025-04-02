"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProducts } from "@/redux/slices/newProductsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Grid, Typography, CircularProgress, Skeleton } from "@mui/material";
import ProductItem from "./ProductItem";

export default function BlockProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.newProducts
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchNewProducts());
    }
  }, [dispatch, products.length]);

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      {/* Banner */}
      <Box sx={{ mb: 3 }}>
        <Image
          src="https://file.hstatic.net/1000402464/file/new_arrivals_jhfl-01_fd12227841c447aabf30cb801184065b.jpg"
          alt="Banner sản phẩm"
          width={1200}
          height={400}
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </Box>

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
        SẢN PHẨM MỚI
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