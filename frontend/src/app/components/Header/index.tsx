"use client";

import { useState, useEffect } from "react";
import {
    AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Badge, Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

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
    const [cartItems,] = useState([
        { id: 1, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/50" },
        { id: 2, name: "Sneakers", price: 50, image: "https://via.placeholder.com/50" },
    ]);

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
    };

    const menuItems = [
        { text: "Home", link: "/" },
        { text: "Services", link: "/services" },
        { text: "Profile", link: "/profile" },
        { text: "Contact", link: "/contact" },
    ];

    return (
        <>
            {/* Header */}
            <AppBar
                position="fixed"
                sx={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    transition: "background-color 0.3s ease-in-out",
                    backgroundColor: scrolling ? (darkMode ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)") : "transparent",
                    backdropFilter: scrolling ? "blur(10px)" : "none",
                    boxShadow: scrolling ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
                    px: 2,
                }}
            >
                <Toolbar>
                    {/* Mobile Menu Icon */}
                    <IconButton edge="start" sx={{ display: { xs: "block", md: "none" }, color: darkMode ? "white" : "black" }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "1px", color: darkMode ? "white" : "black" }}>
                        FutureTech 2025
                    </Typography>

                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        {menuItems.map((item) => (
                            <Button key={item.text} sx={{ color: darkMode ? "white" : "black" }} component={Link} href={item.link}>
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    {/* Cart Icon */}
                    <IconButton onClick={toggleCart} sx={{ ml: 2, color: darkMode ? "white" : "black" }}>
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* Login / Profile */}
                    {isLoggedIn ? (
                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                            <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>{userName[0]}</Avatar>
                            <Typography sx={{ ml: 1, fontWeight: "bold", color: darkMode ? "white" : "black" }}>
                                {userName}
                            </Typography>
                        </Box>
                    ) : (
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: "20px", borderColor: darkMode ? "white" : "black", color: darkMode ? "white" : "black", ml: 2 }}
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    )}

                    {/* Dark Mode Toggle */}
                    <IconButton onClick={toggleDarkMode} sx={{ ml: 2, color: darkMode ? "white" : "black" }}>
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer - Mobile Menu */}
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} onClick={handleDrawerToggle}>
                            <Link href={item.link} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                                <ListItemText primary={item.text} sx={{ color: "black" }} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Drawer - Cart */}
            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
                <List sx={{ width: 300, p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                        Shopping Cart
                    </Typography>
                    {cartItems.length === 0 ? (
                        <Typography sx={{ textAlign: "center", mt: 2 }}>Your cart is empty</Typography>
                    ) : (
                        cartItems.map((item) => (
                            <ListItem key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <img src={item.image} alt={item.name} width={50} height={50} style={{ borderRadius: "8px" }} />
                                <ListItemText primary={item.name} secondary={`$${item.price}`} />
                            </ListItem>
                        ))
                    )}
                </List>
            </Drawer>
        </>
    );
}
