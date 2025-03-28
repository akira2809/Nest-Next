"use client";
import { Box, Grid, Typography, Card, CardMedia, CardContent, IconButton, Tooltip, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";

const products = [
    {
        name: "Áo Blazer - BL241350",
        price: "2.150.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Quần Tây - QRT242800",
        price: "680.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Áo Len - AG231672",
        price: "398.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Áo Sơ Mi - AJ240724DT",
        price: "760.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Áo Blazer - BL241350",
        price: "2.150.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Quần Tây - QRT242800",
        price: "680.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Áo Len - AG231672",
        price: "398.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    },
    {
        name: "Áo Sơ Mi - AJ240724DT",
        price: "760.000₫",
        image: "https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
    }
];

export default function ProductItem() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Box sx={{ textAlign: "center", my: 4 }}>
            {/* Tiêu đề to & đậm */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                SẢN PHẨM BÁN CHẠY NHẤT
            </Typography>

            <Grid container spacing={3}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                position: "relative",
                                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Hình ảnh sản phẩm */}
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        height: 380,
                                        width: "100%",
                                        objectFit: "cover",
                                        transition: "opacity 0.3s ease",
                                        opacity: hoveredIndex === index ? 0.9 : 1,
                                    }}
                                />

                                {/* Hover hiện nút "Mua ngay" */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: hoveredIndex === index ? "translate(-50%, -50%)" : "translate(-50%, 70%)",
                                        opacity: hoveredIndex === index ? 1 : 0,
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        size="small"
                                        sx={{ fontWeight: "bold", textTransform: "none" }}
                                    >
                                        Mua ngay
                                    </Button>
                                </Box>

                                {/* Icon ❤️ & 🛒 */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        right: 10,
                                        display: "flex",
                                        gap: 1,
                                        opacity: hoveredIndex === index ? 1 : 0,
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

                            {/* Thông tin sản phẩm */}
                            <CardContent sx={{ textAlign: "center", padding: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#d32f2f", fontWeight: 600, mt: 1 }}>
                                    {product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
