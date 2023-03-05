import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { startLogOut } from "../../store/auth";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(startLogOut());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        // en pantallas pequeñas ocupa todo el ancho
        width: { sm: `calc(100vw - ${drawerWidth}px)` },
        // pantallas más grandes habrá un ml de 240px
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>JournalApp</Typography>
          <IconButton color="error" onClick={handleLogOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
