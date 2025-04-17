'use client';

import Login from "@/components/Auth/Login";
import { Container } from "@mui/material";
export default function LoginPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 9 }}>
        <Login></Login>
        </Container>

    );
}