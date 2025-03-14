'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
export default function ProductDetail() {
    const [size, setSize] = useState<string | null>();

    const handleSizeChange = (_event: React.MouseEvent<HTMLElement>, newSize: string | null) => {
        if (newSize !== null) setSize(newSize);
    };
    return (

        <Box>
            <Typography>
                Size bạn đang chọn: {size}
            </Typography>
            <ToggleButtonGroup value={size} sx={{ gap: 2 }} exclusive onChange={handleSizeChange}>
                {["S", "M", "L", "XL"].map((s) => (
                    <ToggleButton
                        key={s}
                        value={s}
                        sx={{
                            backgroundColor: "transparent",
                            border: "1px solid #e5e5e5 !important",
                            color: "black",
                            m: 0,

                            "&.Mui-selected, &.Mui-selected:hover": {
                                backgroundColor: "#c21935",
                                border: "3px solid #000",
                                color: "white"
                            },
                            borderRadius: "5px !important",
                            width: 40,
                            height: 40,
                            // borderLeft: "0px slide #000",
                        }}
                    >
                        {s}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>

    );
}