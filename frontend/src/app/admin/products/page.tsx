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
  TablePagination,
  Chip,
  Avatar,
  Tooltip,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
  MenuItem
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Close as CloseIcon,
  LocalFireDepartment as HotIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { addProduct, updateProduct, deleteProduct, fetchAllProducts, fetchCategories } from '@/redux/slices/productSlice';

interface ProductFormData {
  name: string;
  type: string;
  base_price: number;
  sale_price: number;
  description: string;
  main_image: File | string;
  status: boolean;
  is_hot: boolean;
  category_id: number;
  main_image_file?: File | null;
}

const defaultValues: ProductFormData = {
  name: '',
  type: '',
  base_price: 0,
  sale_price: 0,
  description: '',
  main_image: '',
  category_id: 0,
  status: true,
  is_hot: false,
};

const AdminProductPage = () => {
  const theme = useTheme();
  const products = useSelector((state: RootState) => state.product.products);
  const categories = useSelector((state: RootState) => state.product.categories);
  const dispatch = useDispatch<AppDispatch>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({
    open: false,
    message: "",
    severity: "success"
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<ProductFormData>({ defaultValues });

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log(categories)

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('base_price', data.base_price.toString());
    formData.append('sale_price', data.sale_price.toString());
    formData.append('description', data.description);
    formData.append('category_id', Number(data.category_id) as any);

    // Handle image file properly
    if (data.main_image instanceof File) {
      formData.append('main_image', data.main_image);
    } else if (typeof data.main_image === 'string' && data.main_image.startsWith('http')) {
      formData.append('main_image_url', data.main_image);
    }

    formData.append('status', data.status ? 'true' : 'false');
    formData.append('is_hot', data.is_hot ? 'true' : 'false');

    if (editingIndex !== null) {
      dispatch(updateProduct({ id: products[editingIndex].product_id, data: formData } as any))

    } else {
      dispatch(addProduct(formData as any))
    }

    reset();
    setFormVisible(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (index: number) => {
    const product: any = products[index];
    reset(defaultValues);
    setValue('name', product.name || '');
    setValue('type', product.type || '');
    setValue('category_id', Number(product.category_id) || 0);
    setValue('base_price', Number(product.base_price) || 0);
    setValue('sale_price', Number(product.sale_price) || 0);
    setValue('description', product.description || '');
    setValue('main_image', product.main_image || '');
    setValue('status', Boolean(product.status));
    setValue('is_hot', Boolean(product.is_hot));
    setEditingIndex(index);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (index: number) => {
    setProductToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      dispatch(deleteProduct(products[productToDelete].product_id))
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const preview = watch();

  const handleView = (productId: number) => {
    // Implement view product detail logic here
    console.log(`Viewing product ID: ${productId}`);
    // Could open a modal or navigate to product detail page
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Quản lý sản phẩm
      </Typography>

      <Button
        variant={formVisible ? "outlined" : "contained"}
        color={formVisible ? "secondary" : "primary"}
        startIcon={formVisible ? <CloseIcon /> : <AddIcon />}
        sx={{ mb: 3, borderRadius: 2 }}
        onClick={() => {
          setFormVisible(!formVisible);
          if (formVisible) {
            reset();
            setEditingIndex(null);
          }
        }}
      >
        {formVisible ? 'Ẩn form' : 'Thêm sản phẩm mới'}
      </Button>

      {formVisible && (
        <Paper elevation={3} sx={{ borderRadius: 2, p: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {editingIndex !== null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <TextField
                  label="Tên sản phẩm"
                  fullWidth
                  {...register('name', { required: 'Tên không được để trống' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                  size="small"
                />
                <Controller
                  name="category_id"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      select
                      label="Loại sản phẩm"
                      fullWidth
                      margin="normal"
                      size="small"
                      {...field}
                    >
                      {categories.map((cat: any) => (
                        <MenuItem key={cat.category_id} value={cat.category_id}>
                          {cat.category}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Giá cơ bản (VNĐ)"
                      type="number"
                      fullWidth
                      {...register('base_price', {
                        valueAsNumber: true,
                        required: 'Giá là bắt buộc',
                        min: { value: 0, message: 'Giá không được âm' }
                      })}
                      error={!!errors.base_price}
                      helperText={errors.base_price?.message}
                      margin="normal"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography variant="caption">VNĐ</Typography>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Giá khuyến mãi"
                      type="number"
                      fullWidth
                      {...register('sale_price', {
                        valueAsNumber: true,
                        min: { value: 0, message: 'Giá không được âm' }
                      })}
                      error={!!errors.sale_price}
                      helperText={errors.sale_price?.message}
                      margin="normal"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography variant="caption">VNĐ</Typography>
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Mô tả"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description')}
                  margin="normal"
                  size="small"
                />

                <Stack direction="row" spacing={2} mt={2}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        }
                        label="Hiển thị"
                      />
                    )}
                  />
                  <Controller
                    name="is_hot"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        }
                        label="Hot trend"
                      />
                    )}
                  />
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    disabled={!isDirty}
                    sx={{ borderRadius: 2 }}
                  >
                    {editingIndex !== null ? 'Cập nhật' : 'Thêm sản phẩm'}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    sx={{ borderRadius: 2 }}
                    onClick={() => {
                      reset();
                      setEditingIndex(null);
                      setFormVisible(false);
                    }}
                  >
                    Hủy
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1 }}>
                    Ảnh sản phẩm
                  </Typography>

                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px dashed ${theme.palette.divider}`,
                      borderRadius: 1,
                      mb: 2
                    }}
                  >
                    <img
                      id="previewImage"
                      src={typeof preview.main_image === 'string' ? preview.main_image : 'https://via.placeholder.com/400x260?text=Chọn+ảnh'}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </Box>

                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Tải lên ảnh sản phẩm
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue('main_image', file, { shouldDirty: true });
                          const reader = new FileReader();
                          reader.onload = () => {
                            document.getElementById('previewImage')?.setAttribute('src', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Button>
                </Paper>

                <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1 }}>
                    Xem trước sản phẩm
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {preview.name || 'Tên sản phẩm'}
                    </Typography>

                    <Stack direction="row" spacing={1} mb={1}>
                      {preview.status && (
                        <Chip
                          label="Hiển thị"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                      {preview.is_hot && (
                        <Chip
                          icon={<HotIcon fontSize="small" />}
                          label="Hot"
                          size="small"
                          color="error"
                        />
                      )}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {preview.description || 'Mô tả sẽ hiển thị ở đây'}
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="h6" color="primary">
                        {Number(preview.base_price).toLocaleString()} VNĐ
                      </Typography>

                      {Number(preview.sale_price) > 0 && (
                        <Typography variant="body2" color="error" sx={{ textDecoration: 'line-through' }}>
                          {Number(preview.sale_price).toLocaleString()} VNĐ
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {/* Danh sách sản phẩm */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box p={2} sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
          <Typography variant="h6" fontWeight={600}>
            Danh sách sản phẩm ({products.length})
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Ảnh</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Tên sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Danh mục</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Giá (VNĐ)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Ngày tạo</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: theme.palette.grey[100] }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Không có sản phẩm nào
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product: any, index: number) => {
                    const actualIndex = page * rowsPerPage + index;
                    return (
                      <TableRow
                        key={product.product_id}
                        hover
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          bgcolor: editingIndex === actualIndex ? theme.palette.action.hover : 'inherit'
                        }}
                      >
                        <TableCell>{product.product_id}</TableCell>
                        <TableCell>
                          <Avatar
                            variant="rounded"
                            src={product.main_image || 'https://via.placeholder.com/100x100?text=No+Image'}
                            alt={product.name}
                            sx={{ width: 60, height: 60 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="column" spacing={1}>
                            <Typography variant="body1" fontWeight={500}>
                              {product.name}
                            </Typography>
                            {product.is_hot && (
                              <Chip
                                icon={<HotIcon fontSize="small" />}
                                label="Hot"
                                size="small"
                                color="error"
                                sx={{ width: 'fit-content' }}
                              />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {product.categories ? (
                            <Chip
                              label={product.categories.category}
                              size="small"
                              sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Chưa phân loại
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {Number(product.base_price).toLocaleString()}
                          </Typography>
                          {product.sale_price !== "0" && (
                            <Typography
                              variant="body2"
                              color="error"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              {Number(product.sale_price).toLocaleString()}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status ? "Hiển thị" : "Ẩn"}
                            color={product.status ? "success" : "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(product.created_at)}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="Xem chi tiết">
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleView(product.product_id)}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Chỉnh sửa">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEdit(actualIndex)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(actualIndex)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />
      </Paper>


      {/* Dialog variant */}

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>
          Xác nhận xóa sản phẩm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {productToDelete !== null && products[productToDelete] && (
              <>
                Bạn có chắc chắn muốn xóa sản phẩm "{products[productToDelete].name}" không? Hành động này không thể hoàn tác.
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProductPage;