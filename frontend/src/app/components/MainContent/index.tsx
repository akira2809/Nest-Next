'use client';

import { Container } from "@mui/material";
import BlockProduct from "./BlockProduct";

export default function MainContent() {
    return (
        <Container maxWidth="lg" sx={{ py: 1 }}>
            <BlockProduct></BlockProduct>
        </Container>
    );
}