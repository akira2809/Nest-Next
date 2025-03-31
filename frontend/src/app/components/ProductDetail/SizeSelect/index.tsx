'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
export default function ProductDetail({ sizes }: { sizes: any }) {
    const [size, setSize] = useState<string | null>();

    const handleSizeChange = (_event: React.MouseEvent<HTMLElement>, newSize: string | null) => {
        if (newSize !== null) setSize(newSize);
    };
    const uniqueSizes = Array.from(
        new Map(sizes.map((c: any) => [c.product_size.size_name, c])).values()
    );
    console.log(uniqueSizes)
    return (

        <Box>
            <Typography>
                Size bạn đang chọn: {size}
            </Typography>
            <ToggleButtonGroup value={size} sx={{ gap: 2 }} exclusive onChange={handleSizeChange}>
                {uniqueSizes.map((s: any) => (
                    <ToggleButton
                        key={s.product_variant_id}
                        value={s.product_size.size_name}
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
                        {s.product_size.size_name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>

    );
}