// "use client";
// import Box from "@mui/material/Box";
// import { Container } from "@mui/material";
// import Grid2 from "@mui/material/Grid";
// import Image from "next/image";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// // import SizeSelect from "./SizeSelect";
// // import ColorSelect from "./ColorSelect";
// import ExchangePolicy from "./ExchangePolicy";
// import DescriptionProduct from "./DescriptionProduct";
// import { useState } from "react";
// import ColorSelect from "./ColorSelect";
// import SizeSelect from "./SizeSelect";

// // Định nghĩa interface cho sản phẩm
// interface Product {
//     id: string;
//     name: string;
//     main_image: string;
//     base_price: number;
//     description: string;
//     colors: string[];
//     sizes: string[];
//     sale_price?: number
//     product_variants: any[]
// }

// interface ProductDetailProps {
//     product: Product;
// }

// export default function ProductDetail({ product }: ProductDetailProps) {
//     const [changeComponent, setChangeComponent] = useState(0);
//     const [buttons, setButtons] = useState([
//         { id: 0, value: "MÔ TẢ SẢN PHẨM", underline: true, fontWeight: 500 },
//         { id: 1, value: "CHÍNH SÁCH ĐỔI HÀNG", underline: false, fontWeight: 100 },
//     ]);

//     const handleClick = (id: number) => {
//         setChangeComponent(id);
//         setButtons(
//             buttons.map((btn) =>
//                 btn.id === id
//                     ? { ...btn, underline: true, fontWeight: 500 }
//                     : { ...btn, underline: false, fontWeight: 100 }
//             )
//         );
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: "65px" }}>
//             <Grid2 container spacing={2} sx={{ py: 3, m: 0 }}>
//                 {/* Hình ảnh sản phẩm */}
//                 <Grid2 xs={12} sm={12} md={6}>
//                     <Box>
//                         <Image src={product.main_image} alt={product.name} width={500} height={500} />
//                     </Box>
//                 </Grid2>

//                 {/* Thông tin sản phẩm */}
//                 <Grid2 xs={12} sm={12} md={6}>
//                     <Box>
//                         <Typography variant="h5">{product.name}</Typography>
//                         <Typography variant="body2" sx={{ fontSize: 26, color: "#951329", fontWeight: 600 }}>
//                             {product.base_price.toLocaleString()}₫
//                         </Typography>

//                         Chọn màu & size
//                         <ColorSelect colors={product.product_variants} />
//                         <SizeSelect sizes={product.product_variants} />

//                         <Box sx={{ my: 3 }}>
//                             <Button variant="contained" sx={{ backgroundColor: "#c21935", color: "white" }}>
//                                 MUA NGAY
//                             </Button>
//                             <Button variant="outlined" sx={{ color: "#c21935", borderColor: "#c21935", ml: 2 }}>
//                                 THÊM GIỎ HÀNG
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Grid2>
//             </Grid2>

//             {/* Mô tả & Chính sách */}
//             <Container sx={{ backgroundColor: "#f9f9f9", borderRadius: 3 }}>
//                 <Box sx={{ display: "flex", gap: 2, my: 5 }}>
//                     {buttons.map((btn) => (
//                         <Typography
//                             variant="h6"
//                             key={btn.id}
//                             onClick={() => handleClick(btn.id)}
//                             sx={{ textDecoration: btn.underline ? "underline" : "none", textUnderlineOffset: 10, fontWeight: btn.fontWeight }}
//                         >
//                             {btn.value}
//                         </Typography>
//                     ))}
//                 </Box>
//                 <Box sx={{ py: 2 }}>{changeComponent === 0 ? <DescriptionProduct description={product.description} /> : <ExchangePolicy />}</Box>
//             </Container>
//         </Container>
//     );
// }
