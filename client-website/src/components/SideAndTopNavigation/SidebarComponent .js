import React, { useEffect, useState } from 'react';
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Logout } from "@mui/icons-material";

const menuConfig = [
  { label: "Dashboard", key: "/dashboard", icon: <PieChartOutlined />, roles: ["admin", "user"] },
  { label: "Courses", key: "/courses", icon: <DesktopOutlined />, roles: ["admin", "user"] },
  
  { label: "Teachers", key: "sub1", icon: <UserOutlined />, roles: ["admin", "user"], children: [
    { label: "Students", key: "/students", icon: <FileOutlined />, roles: ["admin", "user"] },
    { label: "Criteria", key: "5", roles: ["admin", "user"] },
  ] },
  { label: "Signout", key: "/signout", icon: <Logout />, roles: ["admin", "user"], danger: true },
];

const SidebarComponent = ({  hideSiderPaths, isSmallScreen }) => {
  const navigate = useNavigate();
  let location = useLocation();

  const role = 'user';


  const filterMenuItemsByRole = (items, role) => items?.filter(item => item?.roles?.includes(role) || (item?.roles[0] === 'guest'))
  .map(item => (item.children ? { ...item, children: filterMenuItemsByRole(item.children, role) } : item));

  
  const combinedMenuItems = [ ...menuConfig];

  const filteredMenuItems = filterMenuItemsByRole(combinedMenuItems, role);

//   const [current, setCurrent] = useState(
//     location.pathname === "/" || location.pathname === ""
//         ? "/dashboard"
//         : location.pathname,
// );
// useEffect(() => {
//     if (location) {
//         if( current !== location.pathname ) {
//             setCurrent(location.pathname);
//         }
//     }
// }, [location, current]);

  return (
    <Layout.Sider
      width={200}
      style={{
        background: '#fff',
        overflowY: "auto",
        position: "fixed",
        height: "100vh",
        left: 0,
        borderRight: '1px solid #ebdede',
        display: hideSiderPaths() ? 'none' : 'block',
      }}
    >
      <Menu
        mode="inline"
        onClick={(info) => {
            const keyParts = info.key.split('-');
            if (keyParts){
                navigate(info.key);
              }
        }}
        // defaultSelectedKeys={["/dashboard"]}
        //  selectedKeys={[current]}
        defaultOpenKeys={["sub1"]}
        style={{
          borderRight: 0,
          marginTop: 10,
          fontSize: 16,
          fontWeight: '600',
          color: '#0E162B'
        }}
        items={filteredMenuItems}
      />
    </Layout.Sider>
  );
};

export default SidebarComponent;
