// /app/admin/products/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper as MuiPaper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { addProduct, updateProduct, deleteProduct, fetchAllProducts , fetchCategories } from '@/redux/slices/productSlice';

interface ProductFormData {
  name: string;
  type: string;
  base_price: number;
  description: string;
  short_description: string;
  main_image: string;
  status: boolean;
  is_hot: boolean;
  slug: string;
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
};

const AdminProductPage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({ defaultValues });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const onSubmit = (data: ProductFormData) => {
    if (editingIndex !== null) {
      dispatch(updateProduct({ id: products[editingIndex].id, data }));
      setEditingIndex(null);
    } else {
      dispatch(addProduct(data));
    }
    reset();
    setFormVisible(false);
  };

  const handleEdit = (index: number) => {
    const product = products[index];
    Object.entries(product).forEach(([key, value]) => {
      setValue(key as keyof ProductFormData, value);
    });
    setEditingIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index: number) => {
    dispatch(deleteProduct(products[index].id));
    if (editingIndex === index) {
      reset();
      setEditingIndex(null);
    }
  };

  const preview = watch();

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Quản lý sản phẩm siêu chất lượng
      </Typography>

      <Button
        variant="outlined"
        color={formVisible ? 'secondary' : 'primary'}
        sx={{ mb: 2, borderRadius: 2 }}
        onClick={() => {
          setFormVisible(!formVisible);
          if (formVisible) {
            reset();
            setEditingIndex(null);
          }
        }}
      >
        {formVisible ? ' Ẩn form' : '➕ Thêm sản phẩm mới'}
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
                <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                  Upload ảnh chính
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setValue('main_image', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
                <Stack direction="row" spacing={2} mt={2}>
                  <FormControlLabel control={<Checkbox {...register('status')} />} label="Hiển thị" />
                  <FormControlLabel control={<Checkbox {...register('is_hot')} />} label="Hot trend" />
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 2 }}>
                  {editingIndex !== null ? '✏️ Cập nhật' : ' Thêm sản phẩm'}
                </Button>
                <Button sx={{ ml: 2 }} onClick={() => { reset(); setEditingIndex(null); setFormVisible(false); }}>❌ Hủy</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Xem trước sản phẩm
                </Typography>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <img src={preview.main_image || 'https://via.placeholder.com/400x260?text=Preview'} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  <Typography variant="h6" fontWeight={600} mt={2}>{preview.name || 'Tên sản phẩm'}</Typography>
                  <Typography variant="body2" color="text.secondary">{preview.short_description || 'Mô tả ngắn sẽ hiển thị ở đây'}</Typography>
                  <Typography variant="subtitle1" mt={1}> {preview.base_price?.toLocaleString() || 0} VNĐ</Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    {preview.status && <Checkbox checked={preview.status} disabled size="small" />}
                    {preview.is_hot && <Typography variant="caption" color="error">Hot</Typography>}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {/* Danh sách sản phẩm dạng bảng */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight={600} gutterBottom>Danh sách sản phẩm</Typography>
        <TableContainer component={MuiPaper} sx={{ boxShadow: 2, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Mô tả ngắn</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.base_price.toLocaleString()} VNĐ</TableCell>
                  <TableCell>{product.short_description}</TableCell>
                  <TableCell><img src={product.main_image || 'https://via.placeholder.com/100x100?text=No+Image'} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} /></TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(index)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminProductPage;