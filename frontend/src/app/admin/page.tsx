// 🚀 Admin - Dashboard
// File: /app/admin/page.tsx
'use client'

import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  Button,
  IconButton,
  Stack,
  Chip,
} from '@mui/material'
import {
  TrendingUp,
  People,
  ShoppingCart,
  Inventory2,
  AttachMoney,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  CheckCircle,
  Error,
  Schedule,
} from '@mui/icons-material'
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from 'recharts'

const summary = {
  totalUsers: 120,
  totalOrders: 85,
  totalProducts: 56,
  revenue: 48000000,
  stats: {
    userGrowth: 12,
    orderGrowth: -5,
    productGrowth: 8,
    revenueGrowth: 15,
  }
}

const pieChartData = [
  { name: 'Đơn hàng đã giao', value: 45 },
  { name: 'Đơn hàng đang xử lý', value: 30 },
  { name: 'Đơn hàng bị hủy', value: 10 },
]

const COLORS = ['#4CAF50', '#2196F3', '#F44336', '#FF9800']

const recentOrders = [
  { id: 'ORD-1234', customer: 'Nguyễn Văn A', date: '08/04/2025', amount: 1500000, status: 'Đã giao' },
  { id: 'ORD-1233', customer: 'Trần Thị B', date: '07/04/2025', amount: 850000, status: 'Đang giao' },
  { id: 'ORD-1232', customer: 'Lê Văn C', date: '06/04/2025', amount: 2100000, status: 'Đang xử lý' },
  { id: 'ORD-1231', customer: 'Phạm Thị D', date: '05/04/2025', amount: 750000, status: 'Đã hủy' },
]

const revenueData = [
  { name: 'T1', value: 15000000 },
  { name: 'T2', value: 18000000 },
  { name: 'T3', value: 22000000 },
  { name: 'T4', value: 25000000 },
  { name: 'T5', value: 28000000 },
  { name: 'T6', value: 32000000 },
  { name: 'T7', value: 35000000 },
  { name: 'T8', value: 30000000 },
  { name: 'T9', value: 26000000 },
  { name: 'T10', value: 28000000 },
  { name: 'T11', value: 45000000 },
  { name: 'T12', value: 48000000 },
]

const productCategories = [
  { name: 'Điện thoại', products: 18 },
  { name: 'Laptop', products: 12 },
  { name: 'Máy tính bảng', products: 8 },
  { name: 'Phụ kiện', products: 15 },
  { name: 'Khác', products: 3 },
]

const AdminDashboardPage = () => {
  const theme = useTheme()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return theme.palette.success.main
      case 'Đang giao':
        return theme.palette.info.main
      case 'Đang xử lý':
        return theme.palette.warning.main
      case 'Đã hủy':
        return theme.palette.error.main
      default:
        return theme.palette.grey[500]
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return <CheckCircle fontSize="small" sx={{ color: theme.palette.success.main }} />
      case 'Đang giao':
      case 'Đang xử lý':
        return <Schedule fontSize="small" sx={{ color: status === 'Đang giao' ? theme.palette.info.main : theme.palette.warning.main }} />
      case 'Đã hủy':
        return <Error fontSize="small" sx={{ color: theme.palette.error.main }} />
      default:
        return null
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          Dashboard
        </Typography>
        <Button variant="contained" color="primary" disableElevation>
          Tạo báo cáo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Card Thống kê */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(25, 118, 210, 0.12)', width: 48, height: 48 }}>
                  <People sx={{ color: theme.palette.primary.main }} />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color={summary.stats.userGrowth >= 0 ? "success.main" : "error.main"}
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    {summary.stats.userGrowth >= 0 ? 
                      <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} /> : 
                      <ArrowDownward fontSize="small" sx={{ mr: 0.5 }} />}
                    {Math.abs(summary.stats.userGrowth)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                {summary.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng số người dùng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(156, 39, 176, 0.12)', width: 48, height: 48 }}>
                  <ShoppingCart sx={{ color: theme.palette.secondary.main }} />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color={summary.stats.orderGrowth >= 0 ? "success.main" : "error.main"}
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    {summary.stats.orderGrowth >= 0 ? 
                      <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} /> : 
                      <ArrowDownward fontSize="small" sx={{ mr: 0.5 }} />}
                    {Math.abs(summary.stats.orderGrowth)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                {summary.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng số đơn hàng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.12)', width: 48, height: 48 }}>
                  <Inventory2 sx={{ color: theme.palette.success.main }} />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color={summary.stats.productGrowth >= 0 ? "success.main" : "error.main"}
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    {summary.stats.productGrowth >= 0 ? 
                      <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} /> : 
                      <ArrowDownward fontSize="small" sx={{ mr: 0.5 }} />}
                    {Math.abs(summary.stats.productGrowth)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                {summary.totalProducts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng số sản phẩm
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.12)', width: 48, height: 48 }}>
                  <AttachMoney sx={{ color: theme.palette.warning.main }} />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color={summary.stats.revenueGrowth >= 0 ? "success.main" : "error.main"}
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    {summary.stats.revenueGrowth >= 0 ? 
                      <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} /> : 
                      <ArrowDownward fontSize="small" sx={{ mr: 0.5 }} />}
                    {Math.abs(summary.stats.revenueGrowth)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                {summary.revenue.toLocaleString()}đ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng doanh thu
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ doanh thu */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Doanh thu theo tháng
              </Typography>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value/1000000}tr`}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()}đ`, 'Doanh thu']}
                  contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ trạng thái đơn hàng */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Trạng thái đơn hàng
              </Typography>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} đơn hàng`, '']}
                    contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {pieChartData.map((entry, index) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length], mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {entry.name} ({entry.value})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Đơn hàng gần đây */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Đơn hàng gần đây
              </Typography>
              <Button size="small" color="primary" sx={{ textTransform: 'none' }}>
                Xem tất cả
              </Button>
            </Box>
            <List sx={{ width: '100%' }}>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ px: 0, py: 1.5 }}
                    secondaryAction={
                      <Chip
                        size="small"
                        label={order.status}
                        icon={getStatusIcon(order.status) || undefined}
                        sx={{ 
                          backgroundColor: `${getStatusColor(order.status)}20`,
                          color: getStatusColor(order.status),
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: 'inherit'
                          }
                        }}
                      />
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.id}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block' }}>
                            {order.customer}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {order.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {order.amount.toLocaleString()}đ
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Danh mục sản phẩm */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Danh mục sản phẩm
              </Typography>
              <Button size="small" color="primary" sx={{ textTransform: 'none' }}>
                Quản lý
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              {productCategories.map((category) => (
                <Box key={category.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.products} sản phẩm
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(category.products / Math.max(...productCategories.map(c => c.products))) * 100} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 1,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: category.name === 'Điện thoại' ? theme.palette.primary.main :
                                         category.name === 'Laptop' ? theme.palette.success.main :
                                         category.name === 'Máy tính bảng' ? theme.palette.warning.main :
                                         category.name === 'Phụ kiện' ? theme.palette.secondary.main :
                                         theme.palette.info.main
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboardPage