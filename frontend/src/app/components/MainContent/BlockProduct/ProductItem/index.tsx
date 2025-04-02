"use client";
import { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useRouter } from "next/navigation";

interface Product {
  product_id: number;
  name: string;
  base_price: string;
  sale_price?: string;
  main_image: string;
  slug: string;
  is_hot?: boolean;
}

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState<boolean>(false);

  // Calculate discount percentage if both prices exist
  const discountPercentage =
    product.sale_price && product.base_price
      ? Math.round(
          (1 - parseInt(product.sale_price) / parseInt(product.base_price)) *
            100
        )
      : 0;

  const hasSale =
    product.sale_price &&
    product.base_price &&
    product.sale_price !== product.base_price;

  return (
    <Card
      sx={{
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
        transition: "all 0.4s ease",
        "&:hover": {
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-5px)",
        },
        backgroundColor: "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: "relative", paddingTop: "100%", width: "100%" }}>
        {" "}
        {/* Aspect ratio container */}
        {/* Sale badge - prominent red */}
        {hasSale && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bgcolor: "#ff0000",
              color: "white",
              py: 0.5,
              px: 1.5,
              fontWeight: "bold",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <LocalOfferIcon sx={{ fontSize: 16 }} />
            SALE
          </Box>
        )}
        {/* Hot product badge */}
        {product.is_hot && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bgcolor: "orange",
              color: "white",
              py: 0.5,
              px: 1.5,
              fontWeight: "bold",
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <WhatshotIcon sx={{ fontSize: 16 }} />
            HOT
          </Box>
        )}
        {/* Image with black and white filter when not hovered */}
        <CardMedia
          component="img"
          image={product.main_image}
          alt={product.name}
          loading="lazy"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "all 0.5s ease",
            filter: hovered ? "none" : "grayscale(100%)",
            opacity: hovered ? 1 : 0.9,
          }}
        />
        {/* Black overlay on hover */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />
        {/* Buy Now button - red accent with border */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: hovered
              ? "translate(-50%, -50%)"
              : "translate(-50%, 70%)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.4s ease",
            zIndex: 2,
            width: "70%",

          }}
        >
          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontWeight: "bold",
              width: "100%",
              py: 1,
              backgroundColor: "transparent",
              color: "white",
              borderRadius: 0,
              borderColor: "white",
              borderWidth: "2px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "white",
                color: "#ff0000",
                borderColor: "white",
                borderWidth: "2px",
              },
            }}
            onClick={() => router.push(`/product/${product.slug}`)}
          >
            MUA NGAY
          </Button>
        </Box>
        {/* Action buttons - minimalist black and white with red hover */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            display: "flex",
            gap: 1,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 2,
          }}
        >
          <Tooltip title="Yêu thích">
            <IconButton
              sx={{
                bgcolor: "white",
                color: "#000000",
                "&:hover": {
                  bgcolor: "#ffffff",
                  transform: "scale(1.1)",
                  color: "#ff0000",
                },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thêm vào giỏ hàng">
            <IconButton
              sx={{
                bgcolor: "white",
                color: "#000000",
                "&:hover": {
                  bgcolor: "#ffffff",
                  transform: "scale(1.1)",
                  color: "#ff0000",
                },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent
        sx={{
          textAlign: "center",
          padding: "16px 16px 24px 16px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            minHeight: "48px",
            transition: "color 0.3s",
            color: "#000000",
            "&:hover": {
              color: "#ff0000",
            },
            cursor: "pointer",
          }}
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          {product.name}
        </Typography>

        <Box sx={{ mt: "auto", pt: 1.5 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#ff0000",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {hasSale ? `${product.sale_price}₫` : `${product.base_price}₫`}
          </Typography>

          {/* Discount information - contrast with black and red */}
          {hasSale && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "#777777" }}
              >
                {product.base_price}₫
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffffff",
                  bgcolor: "#000000",
                  px: 1,
                  fontWeight: "medium",
                }}
              >
                -{discountPercentage}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
