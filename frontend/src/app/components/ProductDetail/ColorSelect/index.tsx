'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
export default function ColorSelect({ colors }: { colors: any }) {
    const [color, setColor] = useState<string | null>();

    const handleColorChange = (_event: React.MouseEvent<HTMLElement>, newColor: string | null) => {
        if (newColor !== null) setColor(newColor);
    };
    const uniqueColors = Array.from(
        new Map(colors.map((c: any) => [c.product_color.hex_color, c])).values()
    );
    return (

        <Box>
            <Typography>
                Màu đang chọn: {color}
            </Typography>
            <ToggleButtonGroup value={color} sx={{ gap: 2 }} exclusive onChange={handleColorChange}>
                {uniqueColors.map((c: any) => (
                    <Tooltip key={c.product_variant_id} title={c.product_color.color_name}>
                        <ToggleButton
                            value={c.product_color.color_name}
                            sx={{
                                backgroundColor: c.product_color.hex_color,
                                color: "white",
                                m: 0,
                                borderLeft: "none",
                                border: color === c.product_color.hex_color ? "3px solid #000" : "",
                                "&:hover": { backgroundColor: c.product_color.hex_color },
                                "&.Mui-selected, &.Mui-selected:hover ": {
                                    backgroundColor: c.product_color.hex_color,
                                    border: "3px solid gray",
                                },
                                borderRadius: 0,
                                width: 30,
                                height: 30,
                            }}
                        >

                        </ToggleButton>
                    </Tooltip>
                ))}
            </ToggleButtonGroup>

        </Box>
    );
}