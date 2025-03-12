'use client';
import Grid2 from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Image from 'next/image';
import Logo from '../../../../public/logo.png'
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
export default function Footer() {
    return (
        <Container sx={{ mt: 5, mp: 5 }}>
            <Grid2 container spacing={2}>
                <Grid2 xs={6} sm={6} md={3} sx={{ p: 2 }}>
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src={Logo} width={150} height={100} alt='Logo' />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box>
                                <HomeIcon sx={{ color: "#951329" }}></HomeIcon>
                            </Box>
                            <Box>
                                <Typography>Công ty TNHH T.M.G</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box>
                                <AddLocationIcon sx={{ color: "#951329" }}></AddLocationIcon>
                            </Box>
                            <Box>
                                <Typography>0914 516 446 - 0906 954 368</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box>
                                <PhoneIcon sx={{ color: "#951329" }}></PhoneIcon>
                            </Box>
                            <Box>
                                <Typography>cskh@viet-styles.com</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box>
                                <MailOutlineIcon sx={{ color: "#951329" }}></MailOutlineIcon>
                            </Box>
                            <Box>
                                <Typography>Công ty TNHH T.M.G</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 xs={6} sm={6} md={3} sx={{ p: 2, color: "rgb(102, 102, 102)" }}>
                    <Typography variant='h6'>CÔNG TY</Typography>
                    <ul style={{ paddingLeft: "15px" }}>
                        <li>Về chúng tôi</li>
                        <li>Xu hướng</li>
                        <li>Liên hệ</li>
                        <li>Tuyển dụng</li>
                        <li>Theo dõi đơn hàng</li>
                        <li>Nhượng quyền</li>
                        <li>Ưu đãi VIP member</li>
                    </ul>
                </Grid2>
                <Grid2 xs={6} sm={6} md={3} sx={{ p: 2, color: "rgb(102, 102, 102)" }}>
                    <Typography variant='h6'>CHÍNH SÁCH</Typography>
                    <ul style={{ paddingLeft: "15px" }}>
                        <li>Đăng ký thành viên</li>
                        <li>Hướng dẫn thanh toán</li>
                        <li>Giao hàng và phí vận chuyển</li>
                        <li>Chính sách đổi trả</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản và thanh toán</li>
                    </ul>
                </Grid2>
                <Grid2 xs={6} sm={6} md={3} sx={{ p: 2, color: "rgb(102, 102, 102)" }}>
                    <Typography variant='h6'>KẾT NỐI VỚI CHÚNG TÔI</Typography>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid2>
            </Grid2>
        </Container>
    );
}