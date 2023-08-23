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
import { CartItem } from "@/redux/slices/cart";
import * as uuid from "uuid";
import { primaryShadow, secondaryShadow } from "@/theme/theme";
import { useAllSlicingMethodQuery } from "@/services/data-api";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddProductToCart({ product }: { product: Product }) {
  const {
    data: lSlicingMethods,
    isLoading,
    isFetching,
    isError,
  } = useAllSlicingMethodQuery({});
  const slicingMethods = lSlicingMethods || [];

  const { register, handleSubmit, watch, getValues } = useForm<CartItem>({
    defaultValues: {
      product: product,
      uuid: uuid.v4(),
      quantity: 1,
      productPrice: null,
      slicingMethod: null,
    },
  });
  const [price, setPrice] = useState(0);

  const productPrice = watch(["productPrice", "quantity"]);
  useEffect(() => {
    let values = getValues();
    values = {
      ...values,
      productPrice: product.prices.find(
        (price) => price.id == (values.productPrice as any)
      ),
      slicingMethod: slicingMethods.find(
        (slicingMethod) => slicingMethod.id == (values.slicingMethod as any)
      ),
    };

    if (values.productPrice && values.quantity) {
      setPrice(values.productPrice.price * values.quantity);
    }
  }, [productPrice]);

  const onSubmit: SubmitHandler<CartItem> = (data) => {
    handleClick();
    data = {
      ...data,
      productPrice: product.prices.find(
        (price) => price.id == (data.productPrice as any)
      ),
      slicingMethod: slicingMethods.find(
        (slicingMethod) => slicingMethod.id == (data.slicingMethod as any)
      ),
    };
    console.log(data);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          تم اضافة المنتج الى السلة بنجاح! يمكنك الان الذهاب الى السلة
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <FormControl fullWidth sx={{ flex: 2 }}>
            <InputLabel id="productPrice-label">حجم الذبيحة</InputLabel>
            <Select
              {...register("productPrice")}
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
                      style={{
                        flexGrow: 1,
                        textWrap: "initial",
                        marginInlineEnd: "10px",
                      }}
                    >
                      {size.name}
                    </span>
                    <span>{size.price} ريال</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel id="slicingMethod-label">طريقة التقطيع</InputLabel>
            <Select
              {...register("slicingMethod")}
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
