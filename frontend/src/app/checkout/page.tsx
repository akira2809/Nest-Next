import Checkout from "@/components/checkout";
import { Container } from "@mui/material";
export default function CheckoutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 9 }}>
      <Checkout />
    </Container>
  );
}
