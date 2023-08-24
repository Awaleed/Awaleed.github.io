import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Product } from "@/models/category";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { CartItem, addToCart, setCart } from "@/redux/slices/cart";
import * as uuid from "uuid";
import { primaryShadow, secondaryShadow } from "@/theme/theme";
import { useAllSlicingMethodQuery } from "@/services/data-api";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

const schema = yup
  .object({
    quantity: yup.number().positive().integer().required(),
    productPriceId: yup.number().positive().integer().required(),
    slicingMethodId: yup.number().positive().integer().required(),
  })
  .required();

export default function AddProductToCart({ product }: { product: Product }) {
  const appDispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: lSlicingMethods,
    isLoading,
    isFetching,
    isError,
  } = useAllSlicingMethodQuery({});
  const slicingMethods = lSlicingMethods || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [price, setPrice] = useState(0);

  const productPrice = watch(["productPriceId", "quantity"]);
  useEffect(() => {
    let values = getValues();
    const productPrice = product.prices.find(
      (price) => price.id == values.productPriceId
    );

    if (productPrice && values.quantity) {
      setPrice(productPrice.price * values.quantity);
    }
  }, [productPrice]);

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (data) => {
            enqueueSnackbar("تم اضافة المنتج الى السلة بنجاح!", {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              autoHideDuration: 3000,

              action: (key) => (
                <>
                  <Button
                    href="/cart"
                    type="submit"
                    variant="text"
                    sx={{
                      border: 1,
                      borderColor: "secondary.main",
                      borderStyle: "solid",
                      borderRadius: "999px",
                      boxShadow: secondaryShadow,
                      color: "white",
                      backgroundColor: "secondary.main",
                      ":hover": {
                        boxShadow: primaryShadow,
                        borderColor: "primary.main",
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    الذهاب الى السلة
                  </Button>
                </>
              ),
            });

            const cartItem: CartItem = {
              product: product,
              uuid: uuid.v4(),
              quantity: data.quantity,
              productPrice: product.prices.find(
                (price) => price.id == data.productPriceId
              ),
              slicingMethod: slicingMethods.find(
                (slicingMethod) => slicingMethod.id == data.slicingMethodId
              ),
            };

            appDispatch(addToCart(cartItem));
          },
          (data) => {
            console.log(data.productPriceId);

            if (!!errors.productPriceId) {
              enqueueSnackbar("يجب اختيار حجم الذبيحة", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" },
              });
            } else if (!!errors.slicingMethodId) {
              enqueueSnackbar("يجب اختيار طريقة التقطيع", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" },
              });
            }
          }
        )}
      >
        <Stack gap={2}>
          <FormControl
            fullWidth
            sx={{ flex: 2 }}
            error={!!errors.productPriceId}
          >
            <InputLabel id="productPrice-label">حجم الذبيحة</InputLabel>
            <Select
              {...register("productPriceId")}
              label="حجم الذبيحة"
              labelId="productPrice-label"
              sx={{ borderRadius: "999px" }}
            >
              {product.prices.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <span
                      style={
                        {
                          flexGrow: 1,
                          textWrap: "initial",
                          marginInlineEnd: "10px",
                        } as any
                      }
                    >
                      {size.name}
                    </span>
                    <span>{size.price} ريال</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ flex: 1 }}
            error={!!errors.slicingMethodId}
          >
            <InputLabel id="slicingMethod-label">طريقة التقطيع</InputLabel>
            <Select
              {...register("slicingMethodId")}
              label="طريقة التقطيع"
              labelId="slicingMethod-label"
              sx={{ borderRadius: "999px" }}
            >
              {slicingMethods.map((slicingMethod) => (
                <MenuItem key={slicingMethod.id} value={slicingMethod.id}>
                  {slicingMethod.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 2 }}>
            <InputLabel id="quantity-label">الكمية</InputLabel>
            <Select
              {...register("quantity")}
              label="الكمية"
              labelId="quantity-label"
              sx={{ borderRadius: "999px" }}
              defaultValue={1}
            >
              {Array.from(Array(20).keys()).map(function (q) {
                q++;
                return (
                  <MenuItem key={q} value={q}>
                    {q}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography
            typography={"body1"}
            sx={{
              flex: 1,
              textWrap: "initial",
              color: "white",
              backgroundColor: "primary.main",
              fontWeight: "bold",
              padding: "16.5px 32px",
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: "999px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {`الاجمالي ${price.toLocaleString("en-US", {
              style: "currency",
              currency: "SAR",
            })}`}
          </Typography>

          <LoadingButton
            loading={isLoading || isFetching}
            type="submit"
            variant="text"
            sx={{
              padding: "16.5px 32px",
              border: 1,
              borderColor: "secondary.main",
              borderStyle: "solid",
              borderRadius: "999px",
              boxShadow: secondaryShadow,
              color: "white",
              backgroundColor: "secondary.main",
              margin: { xs: "0 0 2rem 0", md: 0 },
              ":hover": {
                boxShadow: primaryShadow,
                borderColor: "primary.main",
                backgroundColor: "primary.main",
              },
            }}
          >
            اضافة الى السلة
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
