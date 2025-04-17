import Register from "@/components/Auth/Register";
import { Container } from "@mui/material";
export default function RegisterPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 9 }}>
         <Register></Register>
        </Container>
    );
}