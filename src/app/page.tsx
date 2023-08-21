import AdsCarousel from "@/components/AdsCarousel";
import Counter from "@/components/Counter";
import Products from "@/components/Products";
import { Container } from "@mui/system";

export default function Page() {
  return (
    <Container maxWidth="xl">
      <AdsCarousel />
      <Counter />
      <Products />
    </Container>
  );
}
