"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Newsletter() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Kiểm tra nếu màn hình nhỏ hơn "sm
  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", px: 2, py: 4 }}>
      <Grid item xs={12} md={7} sx={{ mb: 2, height: 350 }}>
        <Image
          src="https://owen.cdn.vccloud.vn/media/amasty/ampromobanners/Sale_150225.jpg"
          alt="Bản tin thời trang"
          width={1250}
          height={900}
          style={{
            width: "100%",
            height: "100%",
            objectFit: isMobile ? "contain" : "cover", // Mobile giữ nguyên ảnh
            borderRadius: "5px",
          }}
        />
      </Grid>
      <Grid container spacing={2} alignItems="stretch">
        {/* Hình ảnh chiếm 60% */}
        <Grid item xs={12} md={7} sx={{ height: 350 }}>
          <Image
            src="https://owen.cdn.vccloud.vn/media/amasty/ampromobanners/Email_220125.jpg"
            alt="Bản tin thời trang"
            width={750}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Grid>

        {/* Form chiếm 40% */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              backgroundColor: "#f6f6f2",
              height: "100%", // Đảm bảo bằng với ảnh
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
              borderRadius: "5px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              ĐĂNG KÝ NHẬN BẢN TIN
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn
            </Typography>

            {/* Ô nhập email không có bo góc */}
            <TextField
              fullWidth
              variant="standard"
              placeholder="Nhập email của bạn"
              sx={{
                mb: 2,
                "& .MuiInputBase-root": { borderRadius: 0 }, // Xóa bo góc
                "& .MuiInput-underline:before": { borderBottomColor: "black" }, // Viền màu đen
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#555",
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              ĐĂNG KÝ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
