// 🌟 Admin - Quản lý Sản phẩm Siêu Đẹp Có Swag (Thêm / Sửa / Xóa)
// File: /app/admin/products/page.tsx
'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Paper,
  Divider,
  Stack,
  Chip,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useForm } from 'react-hook-form'

interface ProductFormData {
  name: string
  type: string
  base_price: number
  description: string
  short_description: string
  main_image: string
  status: boolean
  is_hot: boolean
  slug: string
}

const defaultValues: ProductFormData = {
  name: '',
  type: '',
  base_price: 0,
  description: '',
  short_description: '',
  main_image: '',
  status: true,
  is_hot: false,
  slug: '',
}

const AdminProductPage = () => {
  const [products, setProducts] = useState<ProductFormData[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formVisible, setFormVisible] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({ defaultValues })

  const onSubmit = (data: ProductFormData) => {
    if (editingIndex !== null) {
      const updated = [...products]
      updated[editingIndex] = data
      setProducts(updated)
      setEditingIndex(null)
    } else {
      setProducts([...products, data])
    }
    reset()
    setFormVisible(false)
  }

  const handleEdit = (index: number) => {
    const product = products[index]
    Object.entries(product).forEach(([key, value]) => {
      setValue(key as keyof ProductFormData, value)
    })
    setEditingIndex(index)
    setFormVisible(true)
  }

  const handleDelete = (index: number) => {
    const updated = [...products]
    updated.splice(index, 1)
    setProducts(updated)
    if (editingIndex === index) {
      reset()
      setEditingIndex(null)
    }
  }

  const preview = watch()

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        🎨 Quản lý sản phẩm siêu chất lượng
      </Typography>

      <Button
        variant="outlined"
        color={formVisible ? 'secondary' : 'primary'}
        sx={{ mb: 2, borderRadius: 2 }}
        onClick={() => {
          setFormVisible(!formVisible)
          if (formVisible) {
            reset()
            setEditingIndex(null)
          }
        }}
      >
        {formVisible ? '🔽 Ẩn form' : '➕ Thêm sản phẩm mới'}
      </Button>

      {formVisible && (
        <Paper elevation={3} sx={{ borderRadius: 4, p: 3, mb: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField label="Tên sản phẩm" fullWidth {...register('name', { required: 'Tên không được để trống' })} error={!!errors.name} helperText={errors.name?.message} margin="normal" />
                <TextField label="Loại sản phẩm" fullWidth {...register('type')} margin="normal" />
                <TextField label="Giá cơ bản (VNĐ)" type="number" fullWidth {...register('base_price', { valueAsNumber: true, required: 'Giá là bắt buộc' })} error={!!errors.base_price} helperText={errors.base_price?.message} margin="normal" />
                <TextField label="Slug" fullWidth {...register('slug')} margin="normal" />
                <TextField label="Mô tả ngắn" fullWidth {...register('short_description')} margin="normal" />
                <TextField label="Mô tả dài" fullWidth multiline rows={4} {...register('description')} margin="normal" />
                <TextField label="Link ảnh chính" fullWidth {...register('main_image')} margin="normal" />
                <Stack direction="row" spacing={2} mt={2}>
                  <FormControlLabel control={<Checkbox {...register('status')} />} label="Hiển thị" />
                  <FormControlLabel control={<Checkbox {...register('is_hot')} />} label="Hot trend" />
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 2 }}>
                  {editingIndex !== null ? '✏️ Cập nhật' : '💾 Thêm sản phẩm'}
                </Button>
                <Button sx={{ ml: 2 }} onClick={() => { reset(); setEditingIndex(null); setFormVisible(false) }}>❌ Hủy</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  🔍 Xem trước sản phẩm
                </Typography>
                <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                  <CardMedia component="img" height="260" image={preview.main_image || 'https://via.placeholder.com/400x260?text=Preview'} alt="Preview Image" />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>{preview.name || 'Tên sản phẩm'}</Typography>
                    <Typography variant="body2" color="text.secondary">{preview.short_description || 'Mô tả ngắn sẽ hiển thị ở đây'}</Typography>
                    <Typography variant="subtitle1" mt={1}>💸 {preview.base_price?.toLocaleString() || 0} VNĐ</Typography>
                    <Stack direction="row" spacing={1} mt={2}>
                      {preview.status && <Chip label="Hiển thị" color="success" />}
                      {preview.is_hot && <Chip label="🔥 Hot" color="error" />}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {/* Danh sách sản phẩm */}
      <Box>
        <Typography variant="h5" fontWeight={600} gutterBottom>📦 Danh sách sản phẩm</Typography>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardMedia component="img" height="200" image={product.main_image || 'https://via.placeholder.com/400x260?text=No+Image'} alt={product.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.short_description}</Typography>
                  <Typography variant="subtitle2" color="primary">💵 {product.base_price.toLocaleString()} VNĐ</Typography>
                </CardContent>
                <Stack direction="row" justifyContent="space-between" px={2} pb={2}>
                  <IconButton color="primary" onClick={() => handleEdit(index)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default AdminProductPage;