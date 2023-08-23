"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import bg from "../../assets/images/bg.png";
import location from "../../assets/icons/location.png";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setBranch } from "@/redux/slices/branch";
import { BranchModel, useAllBranchesQuery } from "@/services/data-api";
import { Backdrop, Paper, Skeleton, Stack } from "@mui/material";
import { secondaryShadow } from "@/theme/theme";
import Image from "next/image";
import zIndex from "@mui/material/styles/zIndex";

export default function BranchDialog() {
  const currentBranch = useAppSelector((state) => state.branch.value);
  const appDispatch = useAppDispatch();

  const open = currentBranch == null;

  const handleClose = (value: BranchModel | null) => {
    if (value != null) {
            appDispatch(setBranch(value));
    }
  };

  const handleListItemClick = (value: BranchModel | null) => {
    handleClose(value);
  };

  const { data = [], isLoading, isFetching, isError } = useAllBranchesQuery({});

  return (
    <Dialog
      onClose={() => handleClose(null)}
      open={open}
      style={{
        backdropFilter: "blur(25px)",
      }}
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
      <DialogTitle>قم باختيار الفرع</DialogTitle>

      {isError && <div>حدث خطا</div>}

      {isLoading && <Skeleton height={150} width={300} />}
      {isLoading && <Skeleton height={150} width={300} />}
      {isLoading && <Skeleton height={150} width={300} />}

      {data && (
        <List sx={{ pt: 0 }}>
          {data.map((branch) => (
            <ListItem key={branch.id} disableGutters>
              <ListItemButton
                sx={{
                  border: 1,
                  borderColor: "secondary.main",
                  borderStyle: "solid",
                  borderRadius: "999px",
                  boxShadow: secondaryShadow,
                  color: "secondary.main",
                  backgroundColor: "white",
                }}
                onClick={() => handleListItemClick(branch)}
                key={branch.id}
              >
                <ListItemText
                  primary={branch.name_ar}
                  primaryTypographyProps={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

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
            position: "absolute",
            bottom: "20px",
            width: "75px",
            height: "auto",
            placeSelf: "center",
          }}
          src={location}
          alt=""
        />
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
