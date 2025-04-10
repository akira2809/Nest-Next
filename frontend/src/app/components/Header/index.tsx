"use client";

import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Badge,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Swal from "sweetalert2";
// Thêm import này cho action xóa item

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [aoAnchorEl, setAoAnchorEl] = useState<null | HTMLElement>(null);
  const [quanAnchorEl, setQuanAnchorEl] = useState<null | HTMLElement>(null);
  // Sử dụng Redux để lấy giỏ hàng
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch(); // Thêm dispatch để sử dụng cho removeFromCart

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("Doan Phan Kinh Kha");
    Swal.fire({
      title: "Chào mừng!",
      text: "Xin chào bạn Kha đẹp trai!!!.",
      icon: "success",
      confirmButtonText: "Đóng",
    });
  };
  // Thêm hàm xóa item khỏi giỏ hàng
  const removeItemFromCart = (
    productId: number,
    colorId: number,
    sizeId: number
  ) => {
    dispatch(
      removeFromCart({
        product_id: productId,
        color_id: colorId,
        size_id: sizeId,
      })
    );
  };

  // Thêm hàm xử lý thanh toán
  const handleCheckout = () => {
    setCartOpen(false);
    window.location.href = "/checkout";
  };

  // Trong component Header, thêm hàm này
  const handleIncreaseQuantity = (
    productId: number,
    colorId: number,
    sizeId: number
  ) => {
    dispatch(
      increaseQuantity({
        product_id: productId,
        color_id: colorId,
        size_id: sizeId,
      })
    );
  };

  // Thêm hàm giảm số lượng sản phẩm
  const handleDecreaseQuantity = (
    productId: number,
    colorId: number,
    sizeId: number
  ) => {
    dispatch(
      decreaseQuantity({
        product_id: productId,
        color_id: colorId,
        size_id: sizeId,
      })
    );
  };

  // Dropdown handlers for Áo
  const handleAoMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAoAnchorEl(event.currentTarget);
  };
  const handleAoMenuClose = () => {
    setAoAnchorEl(null);
  };

  // Dropdown handlers for Quần
  const handleQuanMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuanAnchorEl(event.currentTarget);
  };
  const handleQuanMenuClose = () => {
    setQuanAnchorEl(null);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Services", link: "/services" },
    { text: "Profile", link: "/profile" },
    { text: "Contact", link: "/contact" },
  ];

  const aoMenuItems = [
    { text: "Áo Phông", link: "/ao-phong" },
    { text: "Áo Sơ Mi", link: "/ao-so-mi" },
    { text: "Áo Khoác", link: "/ao-khoac" },
  ];

  const quanMenuItems = [
    { text: "Quần Jeans", link: "/quan-jeans" },
    { text: "Quần Short", link: "/quan-short" },
    { text: "Quần Tây", link: "/quan-tay" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: scrolling
            ? darkMode
              ? "rgba(0,0,0,0.9)"
              : "rgba(255,255,255,0.9)"
            : "transparent",
          backdropFilter: scrolling ? "blur(10px)" : "none",
          boxShadow: scrolling ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
          px: 2,
        }}
      >
        <Toolbar>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            sx={{
              display: { xs: "block", md: "none" },
              color: darkMode ? "white" : "black",
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px",
              color: darkMode ? "white" : "black",
            }}
          >
            FutureTech 2025
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                sx={{ color: darkMode ? "white" : "black" }}
                component={Link}
                href={item.link}
              >
                {item.text}
              </Button>
            ))}

            {/* Áo Dropdown */}
            <Box>
              <Button
                onMouseEnter={handleAoMenuOpen}
                sx={{
                  color: darkMode ? "white" : "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Áo
                <ExpandMoreIcon fontSize="small" />
              </Button>
              <Popper
                open={Boolean(aoAnchorEl)}
                anchorEl={aoAnchorEl}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1200 }}
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: "top center" }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleAoMenuClose}>
                        <MenuList
                          onMouseLeave={handleAoMenuClose}
                          autoFocusItem={Boolean(aoAnchorEl)}
                        >
                          {aoMenuItems.map((item) => (
                            <MenuItem
                              key={item.text}
                              component={Link}
                              href={item.link}
                              onClick={handleAoMenuClose}
                            >
                              {item.text}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>

            {/* Quần Dropdown */}
            <Box>
              <Button
                onMouseEnter={handleQuanMenuOpen}
                sx={{
                  color: darkMode ? "white" : "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Quần
                <ExpandMoreIcon fontSize="small" />
              </Button>
              <Popper
                open={Boolean(quanAnchorEl)}
                anchorEl={quanAnchorEl}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1200 }}
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: "top center" }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleQuanMenuClose}>
                        <MenuList
                          onMouseLeave={handleQuanMenuClose}
                          autoFocusItem={Boolean(quanAnchorEl)}
                        >
                          {quanMenuItems.map((item) => (
                            <MenuItem
                              key={item.text}
                              component={Link}
                              href={item.link}
                              onClick={handleQuanMenuClose}
                            >
                              {item.text}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          </Box>

          {/* Cart Icon */}
          <IconButton
            onClick={toggleCart}
            sx={{ ml: 2, color: darkMode ? "white" : "black" }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Login / Profile */}
          {isLoggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
                {userName[0]}
              </Avatar>
              <Typography
                sx={{
                  ml: 1,
                  fontWeight: "bold",
                  color: darkMode ? "white" : "black",
                }}
              >
                {userName}
              </Typography>
            </Box>
          ) : (
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: darkMode ? "white" : "black",
                color: darkMode ? "white" : "black",
                ml: 2,
              }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          )}

          {/* Dark Mode Toggle */}
          <IconButton
            onClick={toggleDarkMode}
            sx={{ ml: 2, color: darkMode ? "white" : "black" }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} onClick={handleDrawerToggle}>
              <Link
                href={item.link}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItemText primary={item.text} sx={{ color: "black" }} />
              </Link>
            </ListItem>
          ))}

          {/* Áo Submenu */}
          <ListItem
            button
            onClick={() => setAoAnchorEl(aoAnchorEl ? null : document.body)}
          >
            <ListItemText primary="Áo" />
            <ExpandMoreIcon />
          </ListItem>
          {Boolean(aoAnchorEl) && (
            <List component="div" disablePadding>
              {aoMenuItems.map((item) => (
                <ListItem
                  key={item.text}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          )}

          {/* Quần Submenu */}
          <ListItem
            button
            onClick={() => setQuanAnchorEl(quanAnchorEl ? null : document.body)}
          >
            <ListItemText primary="Quần" />
            <ExpandMoreIcon />
          </ListItem>
          {Boolean(quanAnchorEl) && (
            <List component="div" disablePadding>
              {quanMenuItems.map((item) => (
                <ListItem
                  key={item.text}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          )}
        </List>
      </Drawer>

      {/* Cart Drawer */}
      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <Box sx={{ width: 320, p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Shopping Cart
          </Typography>

          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography sx={{ mb: 2 }}>Your cart is empty</Typography>
              <Button variant="contained" onClick={toggleCart} size="small">
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <>
              <List sx={{ maxHeight: "60vh", overflow: "auto", mb: 2 }}>
                {cartItems.map((item) => (
                  <ListItem
                    key={`${item.product_id}-${item.color_id}-${item.size_id}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      borderBottom: "1px solid #eee",
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <img
                        src={item.main_image}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ borderRadius: "8px", objectFit: "cover" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "medium" }}
                        >
                          {item.name}
                        </Typography>

                        {/* Hiển thị màu và kích thước */}
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 0.5, mb: 0.5 }}
                        >
                          {item.color_name && (
                            <Chip
                              label={`Màu: ${item.color_name}`}
                              size="small"
                              sx={{ height: 20, fontSize: "0.7rem" }}
                            />
                          )}
                          {item.size_name && (
                            <Chip
                              label={`Size: ${item.size_name}`}
                              size="small"
                              sx={{ height: 20, fontSize: "0.7rem" }}
                            />
                          )}
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                          {item.sale_price
                            ? parseFloat(item.sale_price).toLocaleString()
                            : parseFloat(item.base_price).toLocaleString()}{" "}
                          VND
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() =>
                          removeItemFromCart(
                            item.product_id,
                            item.color_id,
                            item.size_id
                          )
                        }
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Quantity controls - Updated with new handlers */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDecreaseQuantity(
                            item.product_id,
                            item.color_id,
                            item.size_id
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() =>
                          handleIncreaseQuantity(
                            item.product_id,
                            item.color_id,
                            item.size_id
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              {/* Cart Summary - Using totalPrice from redux */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">
                    {totalPrice.toLocaleString()} VND
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {totalPrice.toLocaleString()} VND
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" fullWidth onClick={toggleCart}>
                  Continue Shopping
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  color="primary"
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
