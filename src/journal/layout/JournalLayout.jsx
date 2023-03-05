import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;
export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate_fadeIn animate_faster"
    >
      {/* NavBar */}
      <NavBar drawerWidth={drawerWidth} />
      {/* SideBar */}
      <SideBar drawerWidth={drawerWidth} />
      {/* MainBox */}
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
