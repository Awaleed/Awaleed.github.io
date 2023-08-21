import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import { SxProps, Theme } from "@mui/material";

function Logo({
  sx,
  image = true,
  text = true,
}: {
  sx?: SxProps<Theme>;
  image?: boolean;
  text?: boolean;
}) {
  return (
    <Box sx={sx} alignItems={"center"}>
      {image && <Image src={logo} alt="logo" width={50} height={50} />}{" "}
      {text && (
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          قصاب الوادي
        </Typography>
      )}
    </Box>
  );
}

export default Logo;
