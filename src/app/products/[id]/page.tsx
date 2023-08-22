"use client";

import EmblaCarousel from "@/components/AdsCarousel/EmblaCarousel";
import { useAppSelector } from "@/hooks/store";
import { Product } from "@/models/category";
import { useGetProductByIdAndBranchIdQuery } from "@/services/categories-api";
import { Container, Skeleton, Stack } from "@mui/material";
import React from "react";
import AddProductToCart from "./components/AddProductToCart";

function ProductDetils({ params }: { params: { id: number } }) {
  const branchId = useAppSelector((state) => state.branch?.value?.id);

  const { data, isLoading, isFetching, isError } =
    useGetProductByIdAndBranchIdQuery({
      productId: params.id,
      branchId: branchId ?? 0,
    });

  if (isError) {
    return <div>حدث خطا</div>;
  }

  if (isLoading) {
    return (
      <>
        <Skeleton height={150} width={300} />;
        <Skeleton height={150} width={300} />;
        <Skeleton height={150} width={300} />;
      </>
    );
  }

  const product = data as Product;
  return (
    <Container maxWidth="lg">
      <Stack
        sx={{
          display: "flex",
          gap: 2,

          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            style={{ aspectRatio: 1, borderRadius: "25px", width: "100%" }}
            src={product.photo}
          />
        </div>
        <div style={{ flex: 1 }}>
          <AddProductToCart product={product} />
        </div>
      </Stack>
    </Container>
  );
}

export default ProductDetils;
