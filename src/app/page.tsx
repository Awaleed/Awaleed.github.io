import EmblaCarousel from "@/components/AdsCarousel/EmblaCarousel";
import Counter from "@/components/Counter";
import Logo from "@/components/Logo";
import Products from "@/components/Products";
import { Stack } from "@mui/material";
import { Container } from "@mui/system";

export default function Page() {
  return (
    <Container maxWidth="lg">
      <Stack
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row-reverse" } }}
      >
        <EmblaCarousel />
        {/* <div style={{ flex: 1 }}></div> */}
      </Stack>
      <Products />
    </Container>
  );
}
