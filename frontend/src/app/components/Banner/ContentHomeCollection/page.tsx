"use client";

import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";

const products = [
    {
        image: "https://file.hstatic.net/1000402464/file/jh-banner-web.jpg",
        title: "Clothing Collections 2030",
    },
    {
        image: "https://file.hstatic.net/1000402464/file/fl-banner-web.jpg",
        title: "Shoes Spring 2030",
    },
    {
        image: "https://file.hstatic.net/1000402464/file/fl-banner-web.jpg",
        title: "Accessories",
    },
];

export default function FashionGrid() {
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", padding: 4 }}>
            <Grid container spacing={4} maxWidth={"lg"}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ position: "relative", textAlign: "left", borderRadius: 8, overflow: "hidden" }}>
                            {/* Hình ảnh */}
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={400}
                                style={{ width: "100%", height: "auto", borderRadius: 8 }}
                            />

                            {/* Overlay Text & Button */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 3,
                                    background: "rgba(0, 0, 0, 0.4)", // Tạo lớp mờ
                                    color: "white",
                                    borderRadius: 8,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                    {product.title}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "white",
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        "&:hover": { backgroundColor: "#ddd" },
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
