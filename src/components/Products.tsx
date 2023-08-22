"use client";

import { Card, Button, Grid, Typography, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setBranch } from "@/redux/slices/branch";
import { useAllCategoriesQuery } from "@/services/categories-api";
import { Product } from "@/models/category";

function ProductCard({ product }: { product: Product }) {
  return (
    <Grid item xs={6} sm={4} md={2.4}>
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
          style={{ width: "100%", aspectRatio: "1", objectFit: "fill" }}
          src={product.photo}
          alt={product.photo}
        />

        <Typography variant="body1" padding={"10px"} flex={2}>
          {product.name}
        </Typography>
        <Button
          variant="contained"
          href={`/products/${product.id}`}
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
  const appDispatch = useAppDispatch();
  const branchId = useAppSelector((state) => state.branch?.value?.id);
  
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useAllCategoriesQuery(branchId ?? 1);

  return (
    <>
      <Button onClick={() => appDispatch(setBranch(null))}>
        setBranch(null)
      </Button>
      {isError && <div>حدث خطا</div>}

      {isLoading && <Skeleton height={150} width={300} />}
      {isLoading && <Skeleton height={150} width={300} />}
      {isLoading && <Skeleton height={150} width={300} />}

      {data.map((value) => (
        <div key={`category_${value.id}`} id={`category_${value.id}`}>
          <Typography variant="h6">{value.name_ar}</Typography>
          <Grid container spacing={2} alignItems="stretch">
            {value.products.map((product) => (
              <ProductCard key={`product_${product.id}`} product={product} />
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
}
