'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
export default function ColorSelect() {
    const [color, setColor] = useState<string | null>();

    const handleColorChange = (_event: React.MouseEvent<HTMLElement>, newColor: string | null) => {
        if (newColor !== null) setColor(newColor);
    };
    return (

        <Box>
            <Typography>
                Màu đang chọn: {color}
            </Typography>
            <ToggleButtonGroup value={color} sx={{ gap: 2 }} exclusive onChange={handleColorChange}>
                {["red", "blue", "green", "black"].map((c) => (
                    <Tooltip key={c} title={c}>
                        <ToggleButton
                            value={c}
                            sx={{
                                backgroundColor: c,
                                color: "white",
                                m: 0,
                                borderLeft: "none",
                                border: color === c ? "3px solid #000" : "",
                                "&:hover": { backgroundColor: c },
                                "&.Mui-selected, &.Mui-selected:hover ": {
                                    backgroundColor: c,
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