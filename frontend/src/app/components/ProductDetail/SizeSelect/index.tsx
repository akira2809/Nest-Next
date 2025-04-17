// SizeSelect.tsx
'use client';
import { useState } from "react";
import { Box, Typography, styled } from "@mui/material";

const SizeButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'outOfStock'
})<{
  selected?: boolean;
  outOfStock?: boolean;
}>(({ theme, selected, outOfStock }) => ({
  width: 44,
  height: 44,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: outOfStock ? 'not-allowed' : 'pointer',
  transition: theme.transitions.create(['background-color', 'border', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  backgroundColor: selected ? '#c21935' : theme.palette.background.paper,
  color: selected ? theme.palette.common.white : outOfStock ? theme.palette.text.disabled : theme.palette.text.primary,
  border: `1px solid ${selected ? '#c21935' : outOfStock ? theme.palette.divider : theme.palette.divider}`,
  opacity: outOfStock ? 0.5 : 1,
  fontWeight: selected ? 500 : 400,
  '&:hover': {
    backgroundColor: outOfStock ? theme.palette.background.paper : (selected ? '#951329' : theme.palette.action.hover),
    transform: outOfStock ? 'none' : 'translateY(-2px)'
  }
}));

export default function SizeSelect({
  sizes,
  onSizeSelect,
  selectedSizeId,
}: {
  sizes: any;
  onSizeSelect: (data: { size_id: number; size_name: string }) => void;
  selectedSizeId?: number | null;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (sizeId: number, sizeName: string) => {
    setSelectedSize(sizeName);
    onSizeSelect({ size_id: sizeId, size_name: sizeName });
  };

  // Tạo danh sách size không trùng lặp và kiểm tra tồn kho
  const uniqueSizes = Array.from(
    new Map(sizes.map((s: any) => [s.product_size?.size_id || s.size_id, s])).values()
  );

  // Kiểm tra xem size có còn hàng không
  const isSizeOutOfStock = (size: any) => {
    // Nếu đã có thông tin về tồn kho trực tiếp trong object size
    if (size.available === false) {
      return true;
    }
    
    // Kiểm tra trong product_variants nếu có
    if (size.product_variants && Array.isArray(size.product_variants)) {
      const totalStock = size.product_variants.reduce((sum: number, variant: any) => {
        return sum + (variant.quantity || 0);
      }, 0);
      return totalStock <= 0;
    }
    
    // Giả sử size có tồn kho trừ khi được xác định rõ ràng là không
    return false;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
        {uniqueSizes.map((s: any) => {
          const sizeId = s.product_size?.size_id || s.size_id;
          const sizeName = s.product_size?.size_name || s.size_name;
          const outOfStock = isSizeOutOfStock(s);
          return (
            <SizeButton
              key={s.product_variant_id || sizeId}
              selected={selectedSizeId === sizeId || selectedSize === sizeName}
              outOfStock={outOfStock}
              onClick={() => !outOfStock && handleSizeChange(sizeId, sizeName)}
            >
              {sizeName}
            </SizeButton>
          );
        })}
      </Box>

      {selectedSize && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Size đã chọn: <strong>{selectedSize}</strong>
        </Typography>
      )}
    </Box>
  );
}