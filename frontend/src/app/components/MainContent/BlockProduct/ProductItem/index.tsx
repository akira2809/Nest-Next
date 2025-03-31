"use client";
import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Tooltip, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";

interface Product {
  product_id: number;
  name: string;
  base_price: string;
  sale_price?: string;
  main_image: string;
  slug: string;
}

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.main_image}
          alt={product.name}
          loading="lazy"
          sx={{
            height: 380,
            width: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease",
            opacity: hovered ? 0.9 : 1,
          }}
        />

        {/* Hiển thị nút "Mua ngay" khi hover */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: hovered ? "translate(-50%, -50%)" : "translate(-50%, 70%)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          <Button variant="contained" color="primary" size="small" onClick={() => router.push(`/product/${product.slug}`)}>
            Mua ngay
          </Button>
        </Box>

        {/* Hiển thị các nút tương tác khi hover */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            display: "flex",
            gap: 1,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <Tooltip title="Yêu thích">
            <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thêm vào giỏ hàng">
            <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}>
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">{product.name}</Typography>
        <Typography variant="body1" sx={{ color: "#d32f2f", fontWeight: 600, mt: 1 }}>
          {product.sale_price ? `${product.sale_price}₫` : `${product.base_price}₫`}
        </Typography>
      </CardContent>
    </Card>
  );
}
