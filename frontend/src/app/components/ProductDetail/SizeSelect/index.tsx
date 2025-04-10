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
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  border: `1px solid ${selected ? '#c21935' : theme.palette.divider}`,
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
}: {
  sizes: any;
  onSizeSelect: (data: { size_id: number; size_name: string }) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (sizeId: number, sizeName: string) => {
    setSelectedSize(sizeName);
    onSizeSelect({ size_id: sizeId, size_name: sizeName });
  };

  const uniqueSizes = Array.from(
    new Map(sizes.map((s: any) => [s.product_size.size_name, s])).values()
  );

  const isSizeOutOfStock = (size: any) => {
    // Replace with real logic if needed
    return false;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
        {uniqueSizes.map((s: any) => {
          const outOfStock = isSizeOutOfStock(s);
          return (
            <SizeButton
              key={s.product_variant_id}
              selected={selectedSize === s.product_size.size_name}
              outOfStock={outOfStock}
              onClick={() =>
                !outOfStock &&
                handleSizeChange(s.product_size.size_id, s.product_size.size_name)
              }
            >
              {s.product_size.size_name}
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
