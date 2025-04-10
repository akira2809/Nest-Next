'use client';
import { useState, useEffect } from "react";
import { Box, Typography, Tooltip, styled } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const ColorButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'bgColor'
})<{
  selected?: boolean;
  bgColor: string;
}>(({ theme, selected, bgColor }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: bgColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create(['border', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  border: selected ? `2px solid ${theme.palette.common.black}` : '1px solid #e0e0e0',
  transform: selected ? 'scale(1.05)' : 'scale(1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  }
}));

interface ColorSelectProps {
  colors: any[];
  onColorSelect?: (color: {
    color_id: number;
    color_name: string;
  }) => void;
}

export default function ColorSelect({ colors, onColorSelect }: ColorSelectProps) {
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  const handleColorChange = (colorId: number, colorName: string) => {
    setSelectedColorId(colorId);
    setSelectedColorName(colorName);
    onColorSelect?.({ color_id: colorId, color_name: colorName }); // callback nèee
  };

  const uniqueColors = Array.from(
    new Map(colors.map((c: any) => [c.product_color.hex_color, c])).values()
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
        {uniqueColors.map((c: any) => (
          <Tooltip 
            key={c.product_variant_id} 
            title={c.product_color.color_name}
            arrow
          >
            <ColorButton 
              bgColor={c.product_color.hex_color}
              selected={selectedColorId === c.color_id}
              onClick={() =>
                handleColorChange(c.color_id, c.product_color.color_name)
              }
            >
              {selectedColorId === c.color_id && (
                <CheckIcon sx={{
                  color: isLightColor(c.product_color.hex_color) ? 'black' : 'white',
                  fontSize: 18
                }} />
              )}
            </ColorButton>
          </Tooltip>
        ))}
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
