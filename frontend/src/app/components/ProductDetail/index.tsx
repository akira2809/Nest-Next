"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
  Breadcrumbs,
  Link,
  Stack,
  Chip,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import ColorSelect from "./ColorSelect";
import SizeSelect from "./SizeSelect";
import DescriptionProduct from "./DescriptionProduct";
import ExchangePolicy from "./ExchangePolicy";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

interface Product {
  slug: any;
  product_id: string;
  name: string;
  main_image: string;
  base_price: number;
  description: string;
  colors: string[];
  sizes: string[];
  sale_price?: number;
  product_variants: any[];
  stock: number;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedSizeName, setSelectedSizeName] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Thêm state mới để lưu trữ các màu khả dụng dựa trên size đã chọn
  const [availableColors, setAvailableColors] = useState<any[]>([]);

  const [currentStock, setCurrentStock] = useState<number | null>(null);

  // Thêm state để đếm tổng số lượng màu cho mỗi size
  const [colorCountBySize, setColorCountBySize] = useState<number>(0);
  // Đếm số lượng variant cho màu đã chọn
  const [variantCountByColor, setVariantCountByColor] = useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  // Hàm xử lý cập nhật các màu có sẵn khi chọn size
  useEffect(() => {
    if (selectedSizeId) {
      // Lọc ra các biến thể sản phẩm có size_id trùng với size đã chọn
      const colorsForSelectedSize = product.product_variants.filter(
        (variant) => variant.size_id === selectedSizeId
      );

      setAvailableColors(colorsForSelectedSize);

      // Đếm số lượng màu khả dụng cho size này
      const uniqueColors = new Set(
        colorsForSelectedSize.map((variant) => variant.color_id)
      );
      setColorCountBySize(uniqueColors.size);

      // Tính tổng số lượng tồn kho cho size đã chọn
      const totalStockForSize = colorsForSelectedSize.reduce(
        (total, variant) => total + (variant.quantity || 0),
        0
      );
      setCurrentStock(totalStockForSize);

      // Reset color selection if the previously selected color is no longer available
      if (selectedColorId) {
        const colorStillAvailable = colorsForSelectedSize.some(
          (variant) => variant.color_id === selectedColorId
        );

        if (!colorStillAvailable) {
          setSelectedColorId(null);
          setSelectedColorName(null);
          setVariantCountByColor(0);
        }
      }
    } else {
      // Nếu chưa chọn size, không có màu nào khả dụng
      setAvailableColors([]);
      setColorCountBySize(0);
      setCurrentStock(null); // Không có stock nếu chưa chọn size
    }
  }, [selectedSizeId, product.product_variants, selectedColorId]);

  // Tính số lượng tồn kho khi chọn màu và size
  useEffect(() => {
    // Nếu đã chọn size + color → hiển thị stock theo cặp size + color
    if (selectedSizeId && selectedColorId) {
      const selectedVariants = product.product_variants.filter(
        (variant) =>
          variant.size_id === selectedSizeId &&
          variant.color_id === selectedColorId
      );
      const stock = selectedVariants.reduce(
        (total, variant) => total + (variant.stock || 0),
        0
      );
      setCurrentStock(stock);
    }
    // Nếu chỉ chọn size → hiển thị tổng stock của size đó
    else if (selectedSizeId && !selectedColorId) {
      const selectedVariants = product.product_variants.filter(
        (variant) => variant.size_id === selectedSizeId
      );
      const stock = selectedVariants.reduce(
        (total, variant) => total + (variant.stock || 0),
        0
      );
      setCurrentStock(stock);
    }
    // Nếu chưa chọn gì → hiện tổng stock toàn bộ
    else {
      const totalStock = product.product_variants.reduce(
        (total, variant) => total + (variant.stock || 0),
        0
      );
      setCurrentStock(totalStock);
    }
  }, [selectedSizeId, selectedColorId, product.product_variants]);

  // Update stock based on selected size and color
  useEffect(() => {
    if (selectedSizeId && selectedColorId) {
      const selectedVariants = product.product_variants.filter(
        (variant) =>
          variant.size_id === selectedSizeId &&
          variant.color_id === selectedColorId
      );

      const totalStock = selectedVariants.reduce(
        (total, variant) => total + (variant.stock || 0),
        0
      );

      setCurrentStock(totalStock); // Update stock based on selected size and color
    }
  }, [selectedSizeId, selectedColorId, product.product_variants]);

  useEffect(() => {
    if (product.product_variants) {
      // Tính tổng tồn kho của tất cả các biến thể (size + color)
      const totalStock = product.product_variants.reduce(
        (total, variant) => total + (variant.stock || 0),
        0
      );
      setCurrentStock(totalStock); // Cập nhật tồn kho tổng
    }
  }, [product.product_variants]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const handleAddToCart = async () => {

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("⚠️ Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    if (!selectedSizeId || !selectedColorId) {
      setErrorMessage("Vui lòng chọn kích thước và màu sắc!");
      return;
    }

    setErrorMessage(null);

    try {
      const queryParams = new URLSearchParams({
        product_id: product.product_id,
        color_id: selectedColorId.toString(),
        size_id: selectedSizeId.toString(),
      });

      const res = await fetch(
        `http://localhost:3001/products/product_variant?${queryParams}`
      );
      if (!res.ok) {
        throw new Error("Không tìm thấy biến thể sản phẩm");
      }

      const variant = await res.json();

      const productToAdd = {
        product_id: Number(product.product_id),
        name: product.name,
        base_price: String(product.base_price),
        sale_price: product.sale_price ? String(product.sale_price) : undefined,
        main_image: product.main_image,
        slug: product.slug,
        quantity,
        stock: variant.stock,
        color_id: selectedColorId,
        size_id: selectedSizeId,
        variant_id: Number(variant.id),
        color_name: selectedColorName || undefined,
        size_name: selectedSizeName || undefined,
      };

      dispatch(addToCart(productToAdd));
      alert("🛒 Sản phẩm đã được thêm vào giỏ!");
    } catch (error) {
      console.error("Lỗi khi thêm giỏ hàng:", error);
      alert("Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
    }
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const discountPercentage = product.sale_price
    ? Math.round(
        ((product.base_price - product.sale_price) / product.base_price) * 100
      )
    : 0;

  const displayPrice = product.sale_price || product.base_price;

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4, md: 8 }, mb: 8 }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Sản phẩm
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              position: "relative",
              height: { xs: "350px", sm: "450px", md: "550px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Image
              src={product.main_image}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.sale_price && (
              <Chip
                label={`-${discountPercentage}%`}
                color="error"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight="500">
                {product.name}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Rating value={4.5} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  (12 đánh giá)
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}
              >
                <Typography variant="h5" color="error.main" fontWeight="600">
                  {displayPrice.toLocaleString()}₫
                </Typography>
                {product.sale_price && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.base_price.toLocaleString()}₫
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Kích thước
              </Typography>

              <SizeSelect
                sizes={product.product_variants}
                onSizeSelect={({ size_id, size_name }) => {
                  setSelectedSizeId(size_id);
                  setSelectedSizeName(size_name);
                }}
              />
              {currentStock !== null && selectedSizeId && !selectedColorId && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Còn {currentStock} sản phẩm trong size này
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Màu sắc
              </Typography>
              {selectedSizeId ? (
                <>
                  <ColorSelect
                    colors={availableColors}
                    onColorSelect={({ color_id, color_name }) => {
                      setSelectedColorId(color_id);
                      setSelectedColorName(color_name);
                    }}
                  />
                  {currentStock !== null &&
                    selectedSizeId &&
                    selectedColorId && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Còn {currentStock} sản phẩm với màu và size đã chọn
                      </Typography>
                    )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Vui lòng chọn kích thước trước
                </Typography>
              )}
            </Box>
            {currentStock !== null && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {/* Còn {currentStock} sản phẩm trong kho */}
              </Typography>
            )}

            <Box>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Số lượng
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  -
                </Button>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, width: "40px", textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuantityChange(1)}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  +
                </Button>
              </Box>
            </Box>

            {currentStock !== null && !selectedSizeId && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Tổng số sản phẩm trong kho: {currentStock} sản phẩm
              </Typography>
            )}

            {/* Các phần còn lại */}
            {errorMessage && (
              <Typography color="error" sx={{ mt: 1 }}>
                ⚠️ {errorMessage}
              </Typography>
            )}

            {/* Các nút hành động */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={!selectedSizeId || !selectedColorId}
                sx={{
                  bgcolor: "#c21935",
                  "&:hover": { bgcolor: "#951329" },
                  py: 1.5,
                }}
              >
                THÊM VÀO GIỎ HÀNG
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  color: "#c21935",
                  borderColor: "#c21935",
                  "&:hover": {
                    borderColor: "#951329",
                    backgroundColor: "rgba(194, 25, 53, 0.04)",
                  },
                  py: 1.5,
                }}
              >
                MUA NGAY
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocalShippingOutlinedIcon color="action" />
                  <Typography variant="body2">
                    Miễn phí vận chuyển cho đơn hàng trên 500.000₫
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AssignmentReturnOutlinedIcon color="action" />
                  <Typography variant="body2">
                    Đổi trả miễn phí trong vòng 30 ngày
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ mt: 6, borderRadius: 2 }}>
        <Tabs
          value={selectedTabIndex}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              fontWeight: selectedTabIndex === 0 ? 600 : 400,
              py: 2,
            },
          }}
        >
          <Tab label="MÔ TẢ SẢN PHẨM" />
          <Tab label="CHÍNH SÁCH ĐỔI HÀNG" />
        </Tabs>

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {selectedTabIndex === 0 ? (
            <DescriptionProduct description={product.description} />
          ) : (
            <ExchangePolicy />
          )}
        </Box>
      </Paper>
    </Container>
  );
}
