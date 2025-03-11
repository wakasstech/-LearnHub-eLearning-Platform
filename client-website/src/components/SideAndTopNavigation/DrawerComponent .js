import React from 'react';
import { Drawer, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
 import { Add, AddOutlined, AutoStoriesOutlined, Category, ChecklistOutlined, DoneAllOutlined, InfoRounded, Logout, MenuOpen } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const menuConfig = [
  { label: "Dashboard", key: "/dashboard", icon: <PieChartOutlined />, roles: ["admin", "user"] },
  { label: "Courses", key: "/courses", icon: <DesktopOutlined />, roles: ["admin", "user"] },
  
  { label: "Teachers", key: "sub1", icon: <UserOutlined />, roles: ["admin", "user"], children: [
    { label: "Students", key: "/students", icon: <FileOutlined />, roles: ["admin", "user"] },
    { label: "Criteria", key: "5", roles: ["admin", "user"] },
  ] },
  { label: "Signout", key: "/signout", icon: <Logout />, roles: ["admin", "user"], danger: true },
];
const generateCategoryMenuItems = (categories) => categories.map(category => ({
  label: category.category_name,
  key: `category-${category.id}`,
  icon:  <AutoStoriesOutlined/>,
  roles: ["guest"],
  // onClick: category.subCategories.length === 0 ? () => navigate("/courses") : null,
  children: category.subCategories.length > 0 ? category.subCategories.map(subCategory => ({
    label: subCategory.sub_category_name,
    key: `subcategory-${subCategory.id}`,
    icon: <AutoStoriesOutlined />,
    roles: ["guest"]
  })) : null,
}));


const DrawerComponent = ({ isDrawerVisible, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const role = 'user';


  const filterMenuItemsByRole = (items, role) => items?.filter(item => item?.roles?.includes(role) || (item?.roles[0] === 'guest'))
  .map(item => (item.children ? { ...item, children: filterMenuItemsByRole(item.children, role) } : item));
  
    const dynamicMenuItems = categories?.length > 0
    ? [{ label: "Categories", key: "categories", children: generateCategoryMenuItems(categories), icon: <Category />, roles: ["guest"] }]
    : [];
  
  const combinedMenuItems = [...dynamicMenuItems, ...menuConfig];
  const filteredMenuItems = filterMenuItemsByRole(combinedMenuItems, role);

  
  return (
    <Drawer
    title="Basic Drawer"
    placement="left"
    onClose={onClose}
    visible={isDrawerVisible}
  >
    <Menu
      mode="inline"
      selectedKeys={[]}
      defaultOpenKeys={["sub1"]}
      style={{
        borderRight: 0,
      }}
      items={filteredMenuItems}
      onClick={(info) => {
        const keyParts = info.key.split('-');
        if (keyParts[0] === 'category') {
          const searchCoursesId = keyParts[1];
          const type = "category";
          navigate("/courses", { state: { searchCoursesId, type } });
          localStorage.setItem('searchCoursesId', searchCoursesId);
      localStorage.setItem('type', type);
          onClose();
        } else if (keyParts[0] === 'subcategory') {
          const searchCoursesId = keyParts[1];
          const type = "subcategory";
          navigate("/courses", { state: { searchCoursesId , type} });
          localStorage.setItem('searchCoursesId', searchCoursesId);
          localStorage.setItem('type', type);
          onClose();
        } else if (info.key === '/signout') {
          navigate("/");
          onClose();
        } else {
          navigate(info.key);
          onClose();
        }
      }}
    />
  </Drawer>
  )

}

export default DrawerComponent;
