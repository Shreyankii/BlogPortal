import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import { useSelector } from "react-redux";


const Component = styled(AppBar)`
  background: #4a1048;
  color: #ffffff;
  position: fixed;
  top: 0;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  & > a,
  & > div {
    color: #ffffff;
    padding: 20px;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #aaaaaa;
    }
  }

  @media (max-width: 600px) {
    & > a {
      display: none;
    }
    & > div {
      display: flex;
      padding: 5px;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      right: 0;
    }
  }
`;

const LoginButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #ffffff;
  margin-left: 10px;
  transition: background 0.3s, color 0.3s, border 0.3s;
  &:hover {
    background: #ffffff;
    color: #2c2c2c;
    border: 1px solid #2c2c2c;
  }
`;

const MenuButton = styled(IconButton)`
  color: #ffffff;
  display: none;

  @media (max-width: 600px) {
    display: block;
    position: absolute;
    left: 4px;
    margin-left: 1px;
  }
`;

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: #2c2c2c;
    color: #ffffff;
  }
`;

const Header = ({ isAuthenticated }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
 

  // Note: Your reducer seems to store user inside state.user.user
  const { user } = useSelector((state) => state.user) || { user: null };

  const handleLogout = async () => {
    // Keep your existing endpoint; adjust if your backend uses a different path.
    window.open(`${BASE_URL}/api/users/logout`, "_self");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleDrawer = (openDrawer) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(openDrawer);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="HOME" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/about"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="ABOUT" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/contact"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="CONTACT" />
      </ListItem>
      <ListItem button onClick={toggleDrawer(false)}>
        {isAuthenticated ? (
          <LoginButton onClick={handleLogout}>Sign Out</LoginButton>
        ) : (
          <LoginButton onClick={handleLogin}>Log In</LoginButton>
        )}
      </ListItem>
    </List>
  );

  // Only treat as "logged in UI" if auth is true AND user object exists
  const showUserMenu = Boolean(isAuthenticated && user);

  return (
    <Component>
      <Container>
        <MenuButton edge="start" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </MenuButton>

        <DrawerStyled anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {menuItems}
        </DrawerStyled>

        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>

        <div>
          {showUserMenu ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                style={{ color: "#ffffff" }}
              >
                <Avatar
                  src={user?.PictureUrl || ""}
                  alt={user?.username || "user"}
                  imgProps={{
                    onError: (e) => {
                      // If image URL is bad, remove it to avoid broken img icon
                      e.currentTarget.src = "";
                    },
                  }}
                />
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/profile">
                  {user?.email || ""}
                </MenuItem>
                <MenuItem component={Link} to="/profile">
                  {user?.username || ""}
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <LoginButton onClick={handleLogin}>Log In</LoginButton>
          )}
        </div>
      </Container>
    </Component>
  );
};

export default Header;
