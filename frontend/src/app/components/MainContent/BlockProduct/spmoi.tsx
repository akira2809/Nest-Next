"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProducts } from "@/redux/slices/newProductsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Grid, Typography, CircularProgress } from "@mui/material";
import ProductItem from "./ProductItem";

export default function BlockProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.newProducts
  );

  useEffect(() => {
    dispatch(fetchNewProducts());
  }, [dispatch]);

  return (
    <Box sx={{ p: 0, textAlign: "center" }}>
      {/* Banner */}
      <Box sx={{ mb: 2 }}>
        <Image
          src="https://file.hstatic.net/1000402464/file/new_arrivals_jhfl-01_fd12227841c447aabf30cb801184065b.jpg"
          alt="Banner sản phẩm"
          width={500}
          height={200}
          style={{ width: "100%", height: "auto" }}
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
        }}
      >
        SẢN PHẨM MỚI
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