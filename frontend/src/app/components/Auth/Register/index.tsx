'use client';
import { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// Định nghĩa interface cho form data bao gồm luôn cả email
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [message, setMessage] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeTerms' ? checked : value,
    });
  };

  // Hàm validate email cơ bản
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên người dùng";
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    
    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        });
        if (response.ok) {
          setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Đăng ký thất bại. Hãy thử lại sau.");
        }
      } catch (error) {
        setMessage("Lỗi kết nối, hãy thử lại sau.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ 
          backgroundColor: "#c21935", 
          color: "white", 
          py: 3,
          px: 2,
          textAlign: "center"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>ĐĂNG KÝ TÀI KHOẢN</Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Typography sx={{ mb: 3, color: "#555" }} align="center">
            Tạo tài khoản mới
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField 
              label="Tên người dùng" 
              name="name"
              variant="outlined" 
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || ""}
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />
            
            <TextField 
              label="Email" 
              name="email"
              variant="outlined" 
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || ""}
              InputProps={{ sx: { borderRadius: 1.5 } }}
            />
            
            <TextField 
              label="Mật khẩu" 
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined" 
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || ""}
              InputProps={{
                sx: { borderRadius: 1.5 },
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
            
            <TextField 
              label="Xác nhận mật khẩu" 
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined" 
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || ""}
              InputProps={{
                sx: { borderRadius: 1.5 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  Tôi đồng ý với <Link href="/terms" style={{ color: "#c21935" }}>Điều khoản</Link> và <Link href="/privacy" style={{ color: "#c21935" }}>Chính sách bảo mật</Link>
                </Typography>
              }
              sx={{ mb: 1 }}
            />
            {errors.agreeTerms && (
              <Typography color="error" variant="caption" sx={{ mt: -2 }}>
                {errors.agreeTerms}
              </Typography>
            )}
            
            {message && (
              <Typography align="center" sx={{ color: message.includes("thành công") ? "green" : "red" }}>
                {message}
              </Typography>
            )}
            
            <Button 
              type="submit"
              variant="contained" 
              fullWidth
              sx={{ 
                backgroundColor: "#c21935", 
                py: 1.5,
                borderRadius: 1.5,
                '&:hover': { backgroundColor: "#a01529" }
              }}
            >
              ĐĂNG KÝ
            </Button>
            
            <Divider sx={{ my: 1 }}>
              <Typography variant="body2" sx={{ color: "#777" }}>HOẶC</Typography>
            </Divider>
            
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ 
                  borderColor: "#ddd", 
                  color: "#555",
                  py: 1,
                  borderRadius: 1.5,
                  '&:hover': { borderColor: "#bbb", backgroundColor: "#f5f5f5" }
                }}
              >
                Google
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<FacebookIcon />}
                sx={{ 
                  borderColor: "#ddd", 
                  color: "#555",
                  py: 1,
                  borderRadius: 1.5,
                  '&:hover': { borderColor: "#bbb", backgroundColor: "#f5f5f5" }
                }}
              >
                Facebook
              </Button>
            </Stack>
          </Box>
        </Box>
        
        <Box sx={{ backgroundColor: "#f9f9f9", py: 3, textAlign: "center" }}>
          <Typography>
            Đã có tài khoản?{' '}
            <Link href="/login" style={{ color: "#c21935", fontWeight: 500, textDecoration: "none" }}>
              Đăng nhập
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
