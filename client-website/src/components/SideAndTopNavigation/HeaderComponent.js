import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  MenuOutlined,
  AutoStoriesOutlined,
  BorderColor,
} from "@mui/icons-material";
import { Button, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchAutoComplete from "../SearchAutoComplete/SearchAutoComplete";
import Avatar from "@mui/material/Avatar";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../globalStore/Slices/AuthSlice"; 

const generateCategoryMenuItems = (categories) =>
  categories.map((category) => ({
    label: category.category_name,
    key: `category-${category.id}`,
    icon: <AutoStoriesOutlined />,
    roles: ["guest"],
    // onClick: category.subCategories.length === 0 ? () => navigate("/courses") : null,
    children:
      category?.subCategories && category.subCategories.length > 0
        ? category.subCategories.map((subCategory) => ({
            label: subCategory.sub_category_name,
            key: `subcategory-${subCategory.id}`,
            icon: <AutoStoriesOutlined />,
            roles: ["guest"],
          }))
        : null,
  }));

const HeaderComponent = ({ showDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { categories, loading } = useSelector((state) => state.categories);
  const role = "user";
  const isMediumScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 960px)"
  );
  const isLargeScreen = useMediaQuery("(min-width: 961px)");

  const dynamicMenuItemsForUser =
    categories?.length > 0
      ? [
          {
            label: <span style={{ color: "#ffffff" }}>Categories</span>,
            key: "categories",
            children: generateCategoryMenuItems(categories),
            roles: ["guest"],
          },
        ]
      : [];
  const filterMenuItemsByRole = (items, role) =>
    items
      ?.filter(
        (item) => item?.roles?.includes(role) || item?.roles[0] === "guest"
      )
      .map((item) =>
        item.children
          ? { ...item, children: filterMenuItemsByRole(item.children, role) }
          : item
      );
  const menuItems = [...dynamicMenuItemsForUser];
  const filteredMenuItemsForUser = filterMenuItemsByRole(menuItems, role);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <>
      <div className="demo-logo" />
      {!isLargeScreen && (
        <MenuOutlined
          sx={{ color: "white", cursor: "pointer" }}
          onClick={showDrawer}
        />
      )}
      <Typography
        sx={{
          color: "white",
          fontFamily: "fantasy",
          fontSize: 20,
          marginLeft: isLargeScreen ? "0px" : "6px",
        }}
      >
        Quran Academy
      </Typography>
      {isLargeScreen && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 5,
          }}
        >
          <Box sx={{ flex: 1, display: "flex", gap: 4, alignItems: "center" }}>
            <Menu
              mode="horizontal"
              items={filteredMenuItemsForUser}
              selectedKeys={[]}
              onClick={(info) => {
                const keyParts = info.key.split("-");
                if (keyParts[0] === "category") {
                  const searchCoursesId = keyParts[1];
                  const type = "category";
                  navigate("/courses", { state: { searchCoursesId, type } });
                  localStorage.setItem('searchCoursesId', searchCoursesId);
                  localStorage.setItem('type', type);
                } else if (keyParts[0] === "subcategory") {
                  const searchCoursesId = keyParts[1];
                  const type = "subcategory";
                  navigate("/courses", { state: { searchCoursesId, type } });
                  localStorage.setItem('searchCoursesId', searchCoursesId);
                  localStorage.setItem('type', type);
                } else if (info.key === "/signout") {
                  navigate("/");
                } else {
                  navigate(info.key);
                }
              }}
              defaultOpenKeys={["sub1"]}
              style={{ fontSize: 18, backgroundColor: "#0E162B" }}
            />
            <SearchAutoComplete />
          </Box>

          {}
          {isAuthenticated ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        marginLeft: 1,
                        width: 32,
                        height: 32,
                        color: "white",
                      }}
                    >
                      M
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <MuiMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> {user?.fullname}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </MuiMenu>
            </React.Fragment>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                style={{
                  backgroundColor: "#0E162B",
                  BorderColor: "white",
                  color: "white",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/signin")}
              >
                Signin
              </Button>
              <Button
                style={{
                  backgroundColor: "#0E162B",
                  BorderColor: "white",
                  color: "white",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default HeaderComponent;
