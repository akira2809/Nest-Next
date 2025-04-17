"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";

interface CartItem {
  product_id: number;
  name: string;
  main_image: string;
  base_price: number;
  sale_price?: number;
  quantity: number;
  variant_id: number;
}

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total: number, item: { base_price: number; quantity: number }) =>
      total + item.base_price * item.quantity,
    0
  );
  const total = subtotal - discount;

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth) return null;

  const handleApplyVoucher = () => {
    if (voucher === "GENZ100") {
      setDiscount(100000);
    } else {
      setDiscount(0);
      alert("Mã giảm giá không hợp lệ 😢");
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ productId: id, quantity }));
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Bạn cần đăng nhập để thanh toán!");
      return;
    }

    const payload = {
      paymentMethod: getPaymentMethodText(paymentMethod),
      totalPrice: total,
      voucherCode: voucher || null,
      address: "123 ABC Street", // TODO: cho người dùng nhập hoặc lấy từ profile
      phone_number: "0123456789", // TODO: cho người dùng nhập
      status: "PENDING",
      order_details: cartItems.map((item) => ({
        product_variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.sale_price || item.base_price,
      }))
    };

    try {
      const res = await fetch("http://localhost:3001/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Thanh toán thất bại");

      const data = await res.json();

      if (data?.payUrl) {
        window.location.href = data.payUrl;
      } else {
        alert("✅ Đặt hàng thành công! Đơn của bạn sẽ sớm được xử lý.");
      }
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      alert("❌ Có lỗi xảy ra trong quá trình thanh toán.");
    }
  };

  const getPaymentMethodText = (code: string) => {
    switch (code) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "momo":
        return "Momo";
      case "zalo":
        return "ZaloPay";
      case "bank":
        return "Chuyển khoản ngân hàng";
      default:
        return "Không xác định";
    }
  };

  return (
    <Box display="grid" gap={3}>
      <Typography variant="h4" fontWeight={600}>
        Thanh toán đơn hàng 🛒
      </Typography>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent>
            <Typography>Bạn chưa có sản phẩm nào trong giỏ hàng 😢</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sản phẩm của bạn
              </Typography>
              {cartItems.map((item: CartItem) => (
                <Box
                  key={item.product_id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Image
                    src={item.main_image}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <Box flex={1} ml={2}>
                    <Typography fontWeight={500}>{item.name}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography>
                    {(
                      parseFloat(item.base_price.toString()) * item.quantity
                    ).toLocaleString()}₫
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.product_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mã giảm giá 🎁
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  label="Nhập mã giảm giá"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  fullWidth
                />
                <Button onClick={handleApplyVoucher} variant="contained">
                  Áp dụng
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Phương thức thanh toán 💳
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="payment-method-label">Chọn phương thức</InputLabel>
                <Select
                  labelId="payment-method-label"
                  value={paymentMethod}
                  label="Chọn phương thức"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="cod">Thanh toán khi nhận hàng (COD)</MenuItem>
                  <MenuItem value="momo">Momo</MenuItem>
                  <MenuItem value="zalo">ZaloPay</MenuItem>
                  <MenuItem value="bank">Chuyển khoản ngân hàng</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tổng kết đơn hàng
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tạm tính:</Typography>
                <Typography>{subtotal.toLocaleString()}₫</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Giảm giá:</Typography>
                <Typography>-{discount.toLocaleString()}₫</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" fontWeight={600}>
                <Typography>Tổng thanh toán:</Typography>
                <Typography>{total.toLocaleString()}₫</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleCheckout}
              >
                Xác nhận đặt hàng 🚀
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
