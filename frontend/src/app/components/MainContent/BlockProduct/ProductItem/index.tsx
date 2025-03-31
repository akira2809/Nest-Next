"use client";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardMedia, CardContent, IconButton, Tooltip, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from 'next/navigation'; // Dùng next/navigation thay vì next/router

interface Product {
    product_id: number;
    name: string;
    base_price: string;
    sale_price?: string;
    main_image: string;
    slug: string;
}

export default function ProductItem() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/product");
                if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <Typography>Đang tải sản phẩm...</Typography>;
    if (error) return <Typography color="error">Lỗi: {error}</Typography>;

    return (
        <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                SẢN PHẨM BÁN CHẠY NHẤT
            </Typography>

            <Grid container spacing={3}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
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
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    image={product.main_image}
                                    alt={product.name}
                                    sx={{
                                        height: 380,
                                        width: "100%",
                                        objectFit: "cover",
                                        transition: "opacity 0.3s ease",
                                        opacity: hoveredIndex === index ? 0.9 : 1,
                                    }}
                                />

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
                                        onClick={() => router.push(`/product/${product.slug}`)} // Điều hướng đến trang chi tiết sản phẩm
                                    >
                                        Mua ngay
                                    </Button>
                                </Box>

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

                            <CardContent sx={{ textAlign: "center", padding: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#d32f2f", fontWeight: 600, mt: 1 }}>
                                    {product.sale_price ? `${product.sale_price}₫` : `${product.base_price}₫`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
