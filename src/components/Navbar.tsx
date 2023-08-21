"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppDispatch } from "@/hooks/store";
import { useAuth } from "@/hooks/useAuth";
import { setCredentials } from "@/redux/slices/auth";
import logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import Logo from "./Logo";
import { useAllCategoriesQuery } from "@/services/categories-api";
import { showLoginDialog } from "@/redux/slices/showLogin";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AuthButton() {
  const userName = useAuth().user?.first_name?.charAt(0).toUpperCase();

  const appDispatch = useAppDispatch();

  const login = () => appDispatch(showLoginDialog());

  const logout = () => appDispatch(setCredentials({ token: null, user: null }));

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Logout") logout();
  };

  if (userName === undefined || userName === null)
    return (
      <Button
        variant="contained"
        onClick={login}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        تسجيل الدخول
      </Button>
    );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{userName}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url?: string | null) => {
    if (url != null) {
      var bodyRect = document.body.getBoundingClientRect(),
        elemRect = document.querySelector(url)?.getBoundingClientRect(),
        offset = (elemRect?.top ?? 0) - bodyRect.top;

      window.scrollTo({ top: offset - 100, behavior: "smooth" });
    }

    setAnchorElNav(null);
  };

  const { data = [] } = useAllCategoriesQuery({});

  return (
    <AppBar
      position="sticky"
      sx={{ borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: "none", md: "flex" } }} />
          <Box sx={{ flex: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {data.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => handleCloseNavMenu(`#category_${category.id}`)}
                >
                  <Typography textAlign="center">{category.name_ar}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo
            image={false}
            sx={{
              display: {
                xs: "flex",
                md: "none",
                flex: 1,
                justifyContent: "center",
              },
            }}
          />
          <Box sx={{ flex: 1, display: { xs: "flex", md: "none" } }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {data.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCloseNavMenu(`#category_${category.id}`)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {category.name_ar}
              </Button>
            ))}
          </Box>
          {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
            <AuthButton />
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
