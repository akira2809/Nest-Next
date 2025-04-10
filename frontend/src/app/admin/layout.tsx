// ✨ Nâng cấp Admin Layout
// File: /app/admin/layout.tsx
'use client'

import React, { useState } from 'react'
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  Collapse,
  ListItemSecondaryAction,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Dashboard,
  Category,
  ShoppingCart,
  Inventory2,
  People,
  Notifications,
  Settings,
  Logout,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Assessment,
  Discount,
  StorefrontOutlined,
} from '@mui/icons-material'

const drawerWidth = 260

const menuItems = [
  { text: 'Tổng quan', icon: <Dashboard />, href: '/admin' },
  { 
    text: 'Danh mục & Sản phẩm',
    icon: <Category />,
    children: [
      { text: 'Danh mục', icon: <Category />, href: '/admin/categories' },
      { text: 'Sản phẩm', icon: <Inventory2 />, href: '/admin/products' },
    ]
  },
  { text: 'Đơn hàng', icon: <ShoppingCart />, href: '/admin/orders' },
  { text: 'Người dùng', icon: <People />, href: '/admin/users' },
  { text: 'Báo cáo & Thống kê', icon: <Assessment />, href: '/admin/reports' },
  { text: 'Khuyến mãi', icon: <Discount />, href: '/admin/promotions' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const pathname = usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  
  // Xác định menu nào đang expanded dựa trên đường dẫn hiện tại
  React.useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children && item.children.some(child => pathname === child.href)) {
        setExpandedMenu(item.text)
      }
    })
  }, [pathname])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleExpandClick = (itemText: string) => {
    setExpandedMenu(expandedMenu === itemText ? null : itemText)
  }

  const drawer = (
    <>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 1.5,
        px: 2,
        backgroundColor: theme.palette.primary.main,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StorefrontOutlined sx={{ color: '#fff', fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
            ADMIN PANEL
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 40, height: 40 }}>AD</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              Admin User
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Quản trị viên
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List component="nav" sx={{ px: 1 }}>
        {menuItems.map((item) => (
          !item.children ? (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.href} 
                sx={{ 
                  px: 2, 
                  py: 1.2,
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: pathname === item.href ? 
                    `${theme.palette.primary.main}10` : 'transparent',
                  '&:hover': {
                    backgroundColor: pathname === item.href ? 
                      `${theme.palette.primary.main}20` : `${theme.palette.grey[200]}`
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: pathname === item.href ? theme.palette.primary.main : theme.palette.text.secondary,
                  minWidth: 36
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: pathname === item.href ? 600 : 500,
                    color: pathname === item.href ? theme.palette.primary.main : theme.palette.text.primary
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleExpandClick(item.text)}
                  sx={{ 
                    px: 2, 
                    py: 1.2,
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor: expandedMenu === item.text ? 
                      `${theme.palette.primary.main}10` : 'transparent',
                    '&:hover': {
                      backgroundColor: expandedMenu === item.text ? 
                        `${theme.palette.primary.main}20` : `${theme.palette.grey[200]}`
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: expandedMenu === item.text ? theme.palette.primary.main : theme.palette.text.secondary,
                    minWidth: 36
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: expandedMenu === item.text ? 600 : 500,
                      color: expandedMenu === item.text ? theme.palette.primary.main : theme.palette.text.primary
                    }} 
                  />
                  <ListItemSecondaryAction>
                    {expandedMenu === item.text ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
              <Collapse in={expandedMenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.text} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={child.href}
                        sx={{ 
                          pl: 5, 
                          py: 1,
                          borderRadius: 1,
                          mb: 0.5,
                          backgroundColor: pathname === child.href ? 
                            `${theme.palette.primary.main}10` : 'transparent',
                          '&:hover': {
                            backgroundColor: pathname === child.href ? 
                              `${theme.palette.primary.main}20` : `${theme.palette.grey[200]}`
                          }
                        }}
                      >
                        <ListItemIcon sx={{ 
                          color: pathname === child.href ? theme.palette.primary.main : theme.palette.text.secondary,
                          minWidth: 36
                        }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={child.text} 
                          primaryTypographyProps={{ 
                            fontWeight: pathname === child.href ? 600 : 500,
                            fontSize: '0.9rem',
                            color: pathname === child.href ? theme.palette.primary.main : theme.palette.text.primary
                          }} 
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <ListItemButton
          sx={{
            borderRadius: 1,
            p: 1,
            '&:hover': { backgroundColor: theme.palette.grey[200] }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
        </ListItemButton>
      </Box>
    </>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.grey[50] }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 500, color: theme.palette.text.secondary }}
          >
            {pathname === '/admin' ? 'Dashboard' : 
              pathname.includes('categories') ? 'Quản lý danh mục' :
              pathname.includes('products') ? 'Quản lý sản phẩm' :
              pathname.includes('orders') ? 'Quản lý đơn hàng' :
              pathname.includes('users') ? 'Quản lý người dùng' :
              pathname.includes('reports') ? 'Báo cáo & Thống kê' :
              pathname.includes('promotions') ? 'Quản lý khuyến mãi' : 'Admin Panel'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                AD
              </Avatar>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} href="/admin/profile">Hồ sơ</MenuItem>
              <MenuItem component={Link} href="/admin/settings">Cài đặt</MenuItem>
              <Divider />
              <MenuItem component={Link} href="/logout">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar for mobile */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>

        {/* Sidebar for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, md: 3 },
          mt: { xs: 7, sm: 8 }
        }}
      >
        {children}
      </Box>
    </Box>
  )
}