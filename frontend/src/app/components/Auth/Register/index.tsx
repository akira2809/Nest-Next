'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Register() {
    return (
        <Container maxWidth='sm' sx={{ border: "1px solid rgb(218, 218, 218)", py: 4, px: 3, my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 500 }} align="center">TẠO TÀI KHOẢN</Typography>
            <Typography sx={{ color: "#7a7a7a", my: 1.5 }} align="center">Quý khách vui lòng nhập thông tin để đăng ký</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Tên" variant="outlined" />
                <TextField label="Email" variant="outlined" />
                <TextField label="Phone" variant="outlined" />
                <TextField label="Password" type="password"
                    autoComplete="current-password" variant="outlined" />
                <Typography sx={{ color: "#7a7a7a" }} align="center">
                    Đăng nhập tài khoản ?&nbsp;
                    <Link style={{ color: "#65d1e6", fontWeight: 200, textDecoration: "none" }} href={"/login"}>Đăng nhập</Link>
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: "#c21935", py: 1.5 }}>
                    ĐĂNG KÝ
                </Button>
            </Box>
        </Container>
    );
}