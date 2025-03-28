'use client';
import Box from '@mui/material/Box';
import Image from "next/image";
import ProductItem from './ProductItem';
export default function BlockProduct() {
    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 0.7 }}>
                <Image
                    src="https://file.hstatic.net/1000402464/file/new_arrivals_jhfl-01_fd12227841c447aabf30cb801184065b.jpg"
                    alt=""
                    width={500}
                    height={200}
                    style={{ width: "100%", height: "auto" }} />

            </Box>
            <ProductItem />
            <ProductItem />
        </Box>
    );
}
