
// ColorSelect.tsx
'use client';
import { useState, useEffect } from "react";
import { Box, Typography, Tooltip, styled } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const ColorButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'bgColor' && prop !== 'disabled'
})<{
  selected?: boolean;
  bgColor: string;
  disabled?: boolean;
}>(({ theme, selected, bgColor, disabled }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: bgColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: theme.transitions.create(['border', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  border: selected ? `2px solid ${theme.palette.common.black}` : '1px solid #e0e0e0',
  transform: selected ? 'scale(1.05)' : 'scale(1)',
  opacity: disabled ? 0.3 : 1,
  '&:hover': {
    transform: disabled ? 'scale(1)' : 'scale(1.05)',
    boxShadow: disabled ? 'none' : '0 2px 8px rgba(0,0,0,0.15)'
  }
}));

interface ColorSelectProps {
  colors: any[];
  onColorSelect?: (color: {
    color_id: number;
    color_name: string;
  }) => void;
  selectedColorId?: number | null;
  disabled?: boolean;
}

export default function ColorSelect({ 
  colors, 
  onColorSelect, 
  selectedColorId: externalSelectedColorId,
  disabled = false
}: ColorSelectProps) {
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(externalSelectedColorId || null);
  
  // Nếu selectedColorId được truyền từ bên ngoài thay đổi, cập nhật state nội bộ
  useEffect(() => {
    if (externalSelectedColorId !== undefined) {
      setSelectedColorId(externalSelectedColorId);
      
      // Cập nhật tên màu nếu có ID được chọn
      if (externalSelectedColorId) {
        const selectedColor = colors.find((c: any) => 
          c.color_id === externalSelectedColorId || 
          c.product_color?.color_id === externalSelectedColorId
        );
        if (selectedColor) {
          setSelectedColorName(selectedColor.product_color?.color_name || selectedColor.color_name);
        }
      } else {
        setSelectedColorName(null);
      }
    }
  }, [externalSelectedColorId, colors]);

  const handleColorChange = (colorId: number, colorName: string, quantity: number) => {
    // Chỉ cho phép chọn màu nếu còn hàng và component không bị disabled
    if (!disabled && quantity > 0) {
      setSelectedColorId(colorId);
      setSelectedColorName(colorName);
      onColorSelect?.({ color_id: colorId, color_name: colorName });
    }
  };

  // Xử lý để hiển thị màu không trùng lặp và có thông tin tồn kho
  const uniqueColors = Array.from(
    new Map(colors.map((c: any) => {
      const colorId = c.color_id || c.product_color?.color_id;
      return [colorId, c];
    })).values()
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
        {uniqueColors.map((c: any) => {
          const colorId = c.color_id || c.product_color?.color_id;
          const colorName = c.color_name || c.product_color?.color_name;
          const hexColor = c.hex_color || c.product_color?.hex_color || '#ccc';
          const quantity = c.quantity !== undefined ? c.quantity : (c.available === false ? 0 : 1);
          const isOutOfStock = quantity <= 0;
          
          return (
            <Tooltip
              key={c.product_variant_id || colorId}
              title={`${colorName}${isOutOfStock ? ' (Hết hàng)' : ''}`}
              arrow
            >
              <ColorButton
                bgColor={hexColor}
                selected={selectedColorId === colorId}
                disabled={disabled || isOutOfStock}
                onClick={() => handleColorChange(colorId, colorName, quantity)}
              >
                {selectedColorId === colorId && (
                  <CheckIcon sx={{
                    color: isLightColor(hexColor) ? 'black' : 'white',
                    fontSize: 18
                  }} />
                )}
              </ColorButton>
            </Tooltip>
          );
        })}
      </Box>

      {selectedColorName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Màu đã chọn: <strong>{selectedColorName}</strong>
        </Typography>
      )}
    </Box>
  );
}

// Helper check màu sáng tối
function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}