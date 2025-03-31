
import { Box } from "@mui/material";

export default function DescriptionProduct({ description }: { description: string }) {
    return (
        <Box>
            {description}
        </Box>
    );
}