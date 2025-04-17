'use client';
<<<<<<< HEAD
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Login() {
    return (
        <Container maxWidth='sm' sx={{ border: "1px solid rgb(218, 218, 218)", py: 4, px: 3, my: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 500 }} align="center">ĐĂNG NHẬP TÀI KHOẢN</Typography>
            <Typography sx={{ color: "#7a7a7a", my: 1.5 }} align="center">Nhập email và mật khẩu của bạn</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Email" variant="outlined" />
                <TextField label="Password" type="password"
                    autoComplete="current-password" variant="outlined" />
                <Typography sx={{ color: "#7a7a7a" }} align="center">
                    Khách hàng mới?&nbsp;
                    <Link href={"/register"} style={{ color: "#65d1e6", fontWeight: 200, textDecoration: "none" }}>Tạo tài khoản</Link>
                </Typography>
                <Typography sx={{ color: "#7a7a7a" }} align="center">
                    Quên mật khẩu ?&nbsp;
                    <Link style={{ color: "#65d1e6", fontWeight: 200, textDecoration: "none" }} href={"/register"}>Lấy lại mật khẩu</Link>
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: "#c21935", py: 1.5 }}>
                    ĐĂNG NHẬP
                </Button>
            </Box>
        </Container>
    );
}
=======
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';

// Định nghĩa interface cho form data đăng nhập sử dụng email
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  // Hàm validate email cơ bản (nếu cần bổ sung)
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate client-side
    if (!validateEmail(formData.email)) {
      setError('Email không hợp lệ.');
      return;
    }
    if (formData.password.trim().length === 0) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.access_token) {
        // Lưu token vào localStorage (nếu cần)
        localStorage.setItem('access_token', data.access_token);
        Swal.fire({
          title: 'Chào mừng!',
          text: 'Đăng nhập thành công.',
          icon: 'success',
          confirmButtonText: 'Tiếp tục'
        }).then(() => {
          // Lấy redirect từ query param, nếu không có thì về trang chủ
          const redirectUrl = searchParams.get('redirect') || '/';
          router.push(redirectUrl);
        });
      } else {
        setError(data.message || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setError('Lỗi kết nối, hãy thử lại sau.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundColor: '#c21935',
            color: 'white',
            py: 3,
            px: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            ĐĂNG NHẬP
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#c21935',
                py: 1.5,
                borderRadius: 1.5,
                '&:hover': { backgroundColor: '#a01529' }
              }}
            >
              ĐĂNG NHẬP
            </Button>
            <Typography align="center">
              Chưa có tài khoản?{' '}
              <Link href="/register" style={{ color: '#c21935', fontWeight: 500, textDecoration: 'none' }}>
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
>>>>>>> d
