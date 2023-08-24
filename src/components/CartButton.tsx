import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  DialogTitle,
  IconButton,
  useMediaQuery,
  Fab,
  Theme,
  Typography,
  Card,
  Box,
  CardContent,
  CardMedia,
  Button,
  PopoverOrigin,
} from "@mui/material";
import React from "react";
import bg from "../assets/images/bg.png";
import { primaryShadow, secondaryShadow } from "@/theme/theme";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Delete from "@mui/icons-material/Delete";
import styled, { useTheme } from "styled-components";
import {
  CartItem,
  clearCart,
  removeFromCart,
  setCart,
} from "@/redux/slices/cart";
import { enqueueSnackbar } from "notistack";

function CartButton() {
  const appDispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const cart = useAppSelector((s) => s.cart);

  const theme = useTheme();
  const matches = useMediaQuery((theme) =>
    (theme as Theme).breakpoints.down("md")
  );
  const popOverProps: {
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
  } = {
    anchorOrigin: {
      vertical: matches ? "top" : "center",
      horizontal: matches ? "center" : "left",
    },

    transformOrigin: {
      vertical: matches ? "bottom" : "top",
      horizontal: matches ? "center" : "left",
    },
  };

  const handleClearCart = () => {
    appDispatch(clearCart());
    enqueueSnackbar("تم افراغ السلة", { variant: "success" });
  };
  const handleRemoveFromCart = (uuid: string) => {
    appDispatch(removeFromCart(uuid));
    enqueueSnackbar("تم الحذف من السلة", { variant: "success" });
  };

  const hasItems = (cart?.cartItems ?? []).length > 0;
  return (
    <>
      {!matches && (
        <IconButton
          aria-describedby={id}
          aria-label="قائمة المشتريات"
          onClick={handleClick}
          sx={{
            color: "white",
          }}
        >
          <ShoppingCartIcon />
          {hasItems && <Typography>({cart!.cartItems!.length})</Typography>}
        </IconButton>
      )}
      {matches && (
        <Fab
          color="secondary"
          aria-describedby={id}
          aria-label="قائمة المشتريات"
          onClick={handleClick}
        >
          <ShoppingCartIcon />
          {hasItems && <Typography>({cart!.cartItems!.length})</Typography>}
        </Fab>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        {...popOverProps}
        slotProps={{
          root: {
            sx: {
              margin: 2,
            },
            BackdropProps: {
              style: {
                backgroundColor: "#00000066",
              },
            },
          },
          paper: {
            sx: {
              p: 2,
              borderRadius: "25px",
              backgroundImage: bg,
              maxWidth: "500px",
              minWidth: "300px",
              alignItems: "center",
              justifyContent: "center",
            },
            style: {
              zIndex: 100,
            },
          },
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <DialogTitle>السلة</DialogTitle>
          {hasItems && (
            <Button
              aria-describedby={id}
              aria-label="افراغ السلة"
              color="error"
              onClick={handleClearCart}
            >
              افراغ السلة
              <Delete />
            </Button>
          )}
        </Stack>

        {
          <Stack sx={{ pt: 0, gap: 2 }}>
            {(cart.cartItems ?? []).map((item) => (
              <Card key={item.uuid} sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 75, borderRadius: "4px" }}
                  image={item.product?.photo}
                  alt=""
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      paddingY: 0,
                      paddingX: 1.5,
                      width: "100%",
                    }}
                  >
                    <Typography component="div" variant="body1">
                      {item.product?.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {item.productPrice?.name}
                      <br />
                      {item.slicingMethod?.name}
                      <br />
                      الكمية: {item.quantity}
                    </Typography>
                    <Typography
                      typography={"body2"}
                      // sx={{
                      //   textWrap: "initial",
                      //   color: "white",
                      //   backgroundColor: "primary.main",
                      //   // fontWeight: "bold",
                      //   padding: "4px 8px",
                      //   borderRadius: "999px",
                      //   textAlign: "center",
                      //   justifyContent: "center",
                      //   alignItems: "center",
                      //   width: "100%",
                      // }}
                    >
                      {`الاجمالي ${(
                        (item.productPrice?.price ?? 0) * (item.quantity ?? 0)
                      )?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "SAR",
                      })}`}
                    </Typography>
                  </CardContent>
                  <Button
                    aria-describedby={id}
                    aria-label="حذف من السلة"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.uuid ?? "")}
                    style={{
                      alignSelf: "self-end",
                    }}
                  >
                    حذف من السلة
                    <Delete />
                  </Button>
                </Box>
              </Card>
            ))}
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
          </Stack>
        }

        <Stack
          style={{
            overflow: "hidden",
            position: "absolute",
            zIndex: -100,
            width: "100%",
            height: "auto",
            right: "0",
            left: "0",
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          <Image
            style={{
              width: "150%",
              height: "auto",
              placeSelf: "center",
            }}
            src={bg}
            alt=""
          />
        </Stack>
      </Popover>
    </>
  );
}

export default CartButton;
