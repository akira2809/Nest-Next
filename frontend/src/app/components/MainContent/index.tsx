'use client';

import { Container } from "@mui/material";
import BlockProduct from "./BlockProduct/spmoi";
import Sphot from "./BlockProduct/sphot";

export default function MainContent() {
    return (
        <Container maxWidth="lg" sx={{ py: 1 }}>
            <BlockProduct />
            <Sphot />
        </Container>
    );
}
