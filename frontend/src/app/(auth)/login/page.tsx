'use client';

import Login from "@/components/Auth/Login";
<<<<<<< HEAD

export default function LoginPage() {
    return (
        <Login></Login>
=======
import { Container } from "@mui/material";
export default function LoginPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 9 }}>
        <Login></Login>
        </Container>

>>>>>>> d
    );
}