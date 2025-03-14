import { Box } from "@mui/material";
import Image from "next/image";
export default function ExchangePolicy() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image
                src="https://file.hstatic.net/1000402464/file/doi_tra_hang.jpg"
                alt=""
                width={890}
                height={1259}
            />
        </Box>
    );
}