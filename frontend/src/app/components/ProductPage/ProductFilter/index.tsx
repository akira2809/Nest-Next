'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Slider, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  InputAdornment,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface Props {
  categories: string[];
  onFilterChange: (category: string, minPrice: number, maxPrice: number) => void;
}

export default function ProductFilter({ categories, onFilterChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  // Handle category change
  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
  };

  // Handle price input changes
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value)); // Ensuring non-negative values
    setMinPrice(value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(minPrice, Number(e.target.value)); // Ensure max is not less than min
    setMaxPrice(value);
    setPriceRange([priceRange[0], value]);
  };

  // Handle slider change
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const range = newValue as number[];
    setPriceRange(range);
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };

  // Apply filters
  const handleFilterApply = () => {
    onFilterChange(selectedCategory, minPrice, maxPrice);
  };

  // Reset filters
  const handleReset = () => {
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(1000000);
    setPriceRange([0, 1000000]);
    onFilterChange('', 0, 1000000);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        <FilterAltIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Lọc sản phẩm
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Category selection */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="category-select-label">Danh mục</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Danh mục"
          >
            <MenuItem value="">
              <em>Tất cả danh mục</em>
            </MenuItem>
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Price range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Khoảng giá
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Giá tối thiểu"
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Giá tối đa"
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
            step={10000}
            valueLabelFormat={(value) => `${value.toLocaleString()} đ`}
          />
        </Box>
      </Box>
      
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleFilterApply}
        >
          Áp dụng
        </Button>
        <Button 
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleReset}
        >
          Đặt lại
        </Button>
      </Box>
    </Paper>
  );
}
