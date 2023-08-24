import { useAppSelector } from "@/hooks/store";
import { faker } from "@faker-js/faker";
import { Stack, Container, Typography, Button } from "@mui/material";

function page() {
  const cart = useAppSelector((s) => s.cart);
  const hasItems = (cart?.cartItems ?? []).length > 0;

  const handleClearCart = () => {
    appDispatch(clearCart());
    enqueueSnackbar("تم افراغ السلة", { variant: "success" });
  };
  const handleRemoveFromCart = (uuid: string) => {
    appDispatch(removeFromCart(uuid));
    enqueueSnackbar("تم الحذف من السلة", { variant: "success" });
  };

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
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>السلة</Typography>
          {hasItems && (
            <Button
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
        </div>
        <Stack sx={{ flex: 1 }} gap={2}>
          <Typography
            typography={"body1"}
            sx={{
              textWrap: "initial",
              color: "white",
              backgroundColor: "secondary.main",

              fontWeight: "bold",
              padding: "16.5px 32px",
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: "999px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {''}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default page;
