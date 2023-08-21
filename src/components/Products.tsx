"use client";

import {
  Card,
  Button,
  Grid,
  Typography,

} from "@mui/material";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setBranch } from "@/redux/slices/branch";

function ProductCard({ value }: { value: any }) {
  return (
    <Grid item xs={6} md={4} lg={2}>
      <Card
        sx={{
          borderRadius: "16px",
          width: "100%",
          overflowWrap: "anywhere",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <img
          src={faker.image.url()}
          alt="random image"
          style={{
            aspectRatio: 1,
            width: "100%",
            objectFit: "fill",
          }}
        />
        <Typography variant="body1" padding={"10px"} flex={2}>
          {faker.commerce.productName() +
            " " +
            (faker.datatype.boolean() ? "" : faker.commerce.productName())}
        </Typography>
        <Button
          variant="contained"
          sx={{
            margin: "10px",
            backgroundColor: "#aaa",
            borderRadius: "8px",
            color: "red",
            placeSelf: "center",
          }}
        >
          اطلب الان
        </Button>
      </Card>
    </Grid>
  );
}

export default function Products() {
  // const currentBranch = useAppSelector((state) => state.branch.value);
  // const appDispatch = useAppDispatch();

  const products = Array.from({ length: 50 }, (_, i) => i + 1);
  return (
    <>
      {/* <Typography variant="h6"> */}
        {/* CurrentBranch {currentBranch?.name_ar} */}
      {/* </Typography> */}
      {/* <Button variant="contained" onClick={() => appDispatch(setBranch(null))}> */}
        {/* ChangeBranch */}
      {/* </Button> */}
      <Grid container spacing={2} alignItems="stretch">
        {products.map((value) => (
          <ProductCard key={value} value={value} />
        ))}
      </Grid>
    </>
  );
}
