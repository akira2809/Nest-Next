'use client';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import Grid2 from '@mui/material/Grid';
import logoSmall from '../../../../public/logo_small.png'
import Image from 'next/image';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SizeSelect from './SizeSelect'
import ColorSelect from './ColorSelect'
import ExchangePolicy from './ExchangePolicy'
import DescriptionProduct from './DescriptionProduct'
import { useState } from 'react';
import ProductItem from '../MainContent/BlockProduct/ProductItem';
export default function ProductDetail() {
    const [changeComponent, setChangeComponent] = useState(0)
    const [buttons, setButtons] = useState([
        { id: 0, value: "MÔ TẢ SẢN PHẨM", underline: true, fontWeight: 500 },
        { id: 1, value: "CHÍNH SÁCH ĐỔI HÀNG", underline: false, fontWeight: 100 },
    ]);
    const handleClick = (id: number) => {
        console.log(id)
        setChangeComponent(id)
        setButtons(buttons.map((btn) =>
            btn.id === id
                ? {
                    ...btn,
                    underline: true,
                    fontWeight: 500
                }
                : {
                    ...btn,
                    underline: false,
                    fontWeight: 100
                }

        ))
    }
    return (
        <Container maxWidth="lg" >
            <Grid2 container spacing={2} sx={{ py: 3, m: 0 }}>
                <Grid2 xs={12} sm={12} md={6} >
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                </Grid2>
                <Grid2 xs={12} sm={12} md={6} >
                    <Box>
                        <Box>
                            <Image src={logoSmall} alt='' width={200} height={38} />
                        </Box>
                        <Typography variant='h5'>
                            Thắt Lưng Đầu Tăng Đơ BE24FH30-EP
                        </Typography>
                        <Typography variant='body2' sx={{ fontSize: 26 }}>
                            600,000₫
                        </Typography>
                        {/* color */}
                        <ColorSelect></ColorSelect>
                        {/* size */}
                        <SizeSelect></SizeSelect>
                        <Box sx={{ my: 3 }}>
                            <Button variant="contained" sx={{ backgroundColor: "#c21935", color: "white" }}>MUA NGAY</Button>
                            <Button variant="outlined" sx={{ color: "#c21935", borderColor: "#c21935", ml: 2 }}>THÊM GIỎ HÀNG</Button>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <Container sx={{ backgroundColor: "#f9f9f9", borderRadius: 3 }}>
                <Grid2 container spacing={2} sx={{ py: 3, m: 0 }}>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: " center", justifyContent: "center", height: 150 }} >
                        <Box sx={{ display: "flex", alignItems: " center", gap: 1 }}>
                            <Box sx={{ height: 64 }}>
                                <Image src="https://file.hstatic.net/1000402464/file/time.png" width={64} height={64} alt=''></Image>
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                                    GIAO HÀNG NHANH
                                </Typography>
                                <Typography>
                                    TỪ 2-5 NGÀY
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
            <Container sx={{ p: "0 !important" }}>
                <Box sx={{ display: "flex", gap: 2, my: 5 }}>
                    {buttons.map((btn) => (
                        <Typography
                            variant='h6'
                            key={btn.id}
                            onClick={() => handleClick(btn.id)}
                            sx={{ textDecoration: btn.underline ? "underline" : "none", textUnderlineOffset: 10, fontWeight: btn.fontWeight }}
                        >
                            {btn.value}
                        </Typography>
                    ))}
                </Box>
                <Box sx={{ py: 2 }}>
                    {changeComponent === 0 ? <DescriptionProduct></DescriptionProduct> : <ExchangePolicy></ExchangePolicy>}
                </Box>
            </Container>
            <Container sx={{ p: "0 !important", my: 2 }}>
                <Typography variant='h5' sx={{ textAlign: "center", textDecoration: "underline", mb: 3, textUnderlineOffset: 10 }}>
                    SẢN PHẨM LIÊN QUAN
                </Typography>
                <ProductItem></ProductItem>
            </Container>
        </Container >
    );
}