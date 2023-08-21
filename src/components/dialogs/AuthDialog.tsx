"use client";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import bg from "../../assets/images/bg.png";
import location from "../../assets/icons/location.png";
import Image from "next/image";
import { useState } from "react";
import { Button, Paper, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { MuiTelInput } from "mui-tel-input";
import { hideLoginDialog } from "@/redux/slices/showLogin";
import { primaryShadow, secondaryShadow } from "@/theme/theme";

export default function AuthDialog() {
  const open = useAppSelector((state) => state.showLogin.value);
  const appDispatch = useAppDispatch();

  const handleClose = () => {
    appDispatch(hideLoginDialog());
  };

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (newValue: any) => {
    setPhone(newValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          margin: 2,
          p: 2,
          width: "300px",
          height: "500px",
          borderRadius: "25px",
          backgroundImage: bg,
        },
        style: {
          position: "relative",
          zIndex: 100,
        },
      }}
    >
      <DialogTitle> تسجيل الدخول</DialogTitle>

      <Stack display={"flex"} sx={{ height: "100%" }}>
        <MuiTelInput
          value={phone}
          onChange={handlePhoneChange}
          dir="ltr"
          defaultCountry="SA"
          onlyCountries={["SA"]}
          focused={true}
        />
        <div style={{ flex: 1 }}></div>
        <LoadingButton
          loading={true}
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
          ارسال رمز التحقق
        </LoadingButton>
      </Stack>

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
    </Dialog>
  );
}
