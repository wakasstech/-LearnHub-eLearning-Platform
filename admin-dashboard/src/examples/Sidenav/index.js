// /**
// =========================================================
// * Argon Dashboard 2 PRO MUI - v3.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import { useEffect, useState } from "react";

// // react-router-dom components
// import { useLocation, NavLink } from "react-router-dom";

// // prop-types is a library for typechecking of props.
// import PropTypes from "prop-types";

// // @mui material components
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import Link from "@mui/material/Link";
// import Icon from "@mui/material/Icon";

// // Argon Dashboard 2 PRO MUI components
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";

// // Argon Dashboard 2 PRO MUI example components
// import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// import SidenavList from "examples/Sidenav/SidenavList";
// import SidenavItem from "examples/Sidenav/SidenavItem";
// import SidenavFooter from "examples/Sidenav/SidenavFooter";

// // Custom styles for the Sidenav
// import SidenavRoot from "examples/Sidenav/SidenavRoot";
// import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// // Argon Dashboard 2 PRO MUI context
// import { useArgonController, setMiniSidenav } from "context";

// const Sidenav = ({ color = 'white', brand, brandName, routes, ...rest }) => {
//   const [openCollapse, setOpenCollapse] = useState(false);
//   const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
//   const [controller, dispatch] = useArgonController();
//   const { miniSidenav, darkSidenav, layout } = controller;
//   const location = useLocation();
//   const { pathname } = location;
//   const collapseName = pathname.split("/").slice(1)[0];
//   const itemName = pathname.split("/").slice(1)[1];

//   const closeSidenav = () => setMiniSidenav(dispatch, true);

//   useEffect(() => {
//     // A function that sets the mini state of the sidenav.
//     function handleMiniSidenav() {
//       setMiniSidenav(dispatch, window.innerWidth < 1200);
//     }

//     /** 
//      The event listener that's calling the handleMiniSidenav function when resizing the window.
//     */
//     window.addEventListener("resize", handleMiniSidenav);

//     // Call the handleMiniSidenav function to set the state with the initial value.
//     handleMiniSidenav();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleMiniSidenav);
//   }, [dispatch, location]);

//   // Render all the nested collapse items from the routes.js
//   const renderNestedCollapse = (collapse) => {
//     const template = collapse.map(({ name, route, key, href }) =>
//       href ? (
//         <Link key={key} href={href} target="_blank" rel="noreferrer">
//           <SidenavItem name={name} nested />
//         </Link>
//       ) :  (
//         name !== 'Edit Product'   &&<NavLink to={route} key={key}>
//           <SidenavItem name={name} active={route === pathname} nested />
//         </NavLink>
//       )
//     );

//     return template;
//   };

//   // Render the all the collpases from the routes.js
//   const renderCollapse = (collapses) =>
//     collapses.map(({ name, collapse, route, href, key }) => {
//       let returnValue;

//       if (collapse) {
//         returnValue = (
//           <>
//           <SidenavItem
//             key={key}
//             name={name}
//             active={key === itemName}
//             open={openNestedCollapse === name}
//             onClick={() =>
//               openNestedCollapse === name
//                 ? setOpenNestedCollapse(false)
//                 : setOpenNestedCollapse(name)
//             }
//           >
//             {renderNestedCollapse(collapse)}
//           </SidenavItem>
//           </>
//         );
//       } else {
//         returnValue = href ? (
//           <Link href={href} key={key} target="_blank" rel="noreferrer">
//             <SidenavItem name={name} active={key === itemName} />
//           </Link>
//         ) : (
//           name !== 'Edit Category' &&  name !== 'Edit Brand' && <NavLink to={route} key={key}>
//             <SidenavItem name={name} active={key === itemName} />
//           </NavLink>
//         );
//       }
//       return <SidenavList key={key}>{returnValue}</SidenavList>;
//     });

//   // Render all the routes from the routes.js (All the visible items on the Sidenav)
//   const renderRoutes = routes.map(
//     ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
//       let returnValue;

//       if (type === "collapse") {
//         if (href) {
//           returnValue = (
//             <Link href={href} key={key} target="_blank" rel="noreferrer">
//               <SidenavCollapse
//                 name={name}
//                 icon={icon}
//                 active={key === collapseName}
//                 noCollapse={noCollapse}
//               />
//             </Link>
//           );
//         } else if (noCollapse && route) {
//           returnValue = (
//             <NavLink to={route} key={key}>
//               <SidenavCollapse
//                 name={name}
//                 icon={icon}
//                 noCollapse={noCollapse}
//                 active={key === collapseName}
//               >
//                 {collapse ? renderCollapse(collapse) : null}
//               </SidenavCollapse>
//             </NavLink>
//           );
//         } else {
//           returnValue = (
//             <>
//             {name!== 'Authentication' && (
//                <SidenavCollapse
//                key={key}
//                name={name}
//                icon={icon}
//                active={key === collapseName}
//                open={openCollapse === key}
//                onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
//              >
//                {collapse ? renderCollapse(collapse) : null}
//              </SidenavCollapse>
//             )}
//              </>
//           );
//         }
//       } else if (type === "title") {
//         returnValue = (
//           <ArgonTypography
//             key={key}
//             color={darkSidenav ? "white" : "dark"}
//             display="block"
//             variant="caption"
//             fontWeight="bold"
//             textTransform="uppercase"
//             opacity={0.6}
//             pl={3}
//             mt={2}
//             mb={1}
//             ml={1}
//           >
//             {title}
//           </ArgonTypography>
//         );
//       } else if (type === "divider") {
//         returnValue = <Divider key={key} light={darkSidenav} />;
//       }

//       return returnValue;
//     }
//   );

//   return (
//     <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
//       <ArgonBox pt={3} pb={1} px={4} textAlign="center">
//         <ArgonBox
//           display={{ xs: "block", xl: "none" }}
//           position="absolute"
//           top={0}
//           right={0}
//           p={1.625}
//           onClick={closeSidenav}
//           sx={{ cursor: "pointer" }}
//         >
//           <ArgonTypography variant="h6" color="secondary">
//             <Icon sx={{ fontWeight: "bold" }}>close</Icon>
//           </ArgonTypography>
//         </ArgonBox>
//         <ArgonBox component={NavLink} to="/" display="flex" alignItems="center">
//           {brand && (
//             <ArgonBox component="img" src={"https://www.shutterstock.com/image-vector/boycott-israel-israeli-all-products-600nw-2386842211.jpg"} alt="Argon Logo" width="2rem" mr={0.25} />
//           )} 
//           <ArgonBox
//             width={!brandName && "100%"}
//             sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
//           >
//             <ArgonTypography
//               component="h6"
//               variant="button"
//               fontWeight="medium"
//               color={darkSidenav ? "white" : "dark"}
//             >
//               BOYCOTT
//             </ArgonTypography>
//           </ArgonBox>
//         </ArgonBox>
//       </ArgonBox>
//       <Divider light={darkSidenav} />
//       <List>{renderRoutes}</List>

//       {/* <ArgonBox pt={1} mt="auto" mb={2} mx={2}>
//         <SidenavFooter />
//       </ArgonBox> */}
//     </SidenavRoot>
//   );
// }

// // Setting default values for the props of Sidenav
// Sidenav.defaultProps = {
//   color: "info",
//   brand: "",
// };

// // Typechecking props for the Sidenav
// Sidenav.propTypes = {
//   color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
//   brand: PropTypes.string,
//   brandName: PropTypes.string.isRequired,
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export default Sidenav;
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavFooter from "examples/Sidenav/SidenavFooter";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { useArgonController, setMiniSidenav } from "context";
import boxShadow from "assets/theme/functions/boxShadow";
import { BorderAllRounded } from "@mui/icons-material";

const Sidenav = ({ color = 'white', brand, brandName, routes, ...rest }) => {
  const [openCollapse, setOpenCollapse] = useState(() => {
    const initialOpenCollapse = {};
    routes.forEach(({ type, key }) => {
      if (type === "collapse") {
        initialOpenCollapse[key] = true;
      }
    });
    return initialOpenCollapse;
  });
  const [openNestedCollapse, setOpenNestedCollapse] = useState(() => {
    const initialOpenNestedCollapse = {};
    routes.forEach(({ type, collapse, key }) => {
      if (type === "collapse" && collapse) {
        collapse.forEach((nested) => {
          initialOpenNestedCollapse[nested.key] = true;
        });
      }
    });
    return initialOpenNestedCollapse;
  });

  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderNestedCollapse = (collapse) => {
    return collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link key={key} href={href} target="_blank" rel="noreferrer">
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        name !== 'Edit Product' &&   name !== 'Product Info' && <NavLink to={route} key={key}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );
  };

  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <>
            <SidenavItem
              key={key}
              name={name}
              active={key === itemName}
              open={openNestedCollapse[key]}
              onClick={() =>
                setOpenNestedCollapse((prevState) => ({
                  ...prevState,
                  [key]: !prevState[key],
                }))
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          </>
        );
      } else {
        returnValue = href ? (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem name={name} active={key === itemName} />
          </Link>
        ) : (
          name !== 'Edit Category' && name !== 'Edit Brand'  && name !== 'Blog Details' && name !== 'Edit Blog Details' &&
          name !== 'Edit Ad' && name!== 'Edit feature item'  && name!== 'Create feature item' &&  name!== 'Features Item' &&
          name!== 'Lecture Detail' &&  name!== 'Course Detail' && name!== 'Video Detail' &&(
            <NavLink to={route} key={key}>
              <SidenavItem name={name} active={key === itemName} />
            </NavLink>
          )
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link href={href} key={key} target="_blank" rel="noreferrer">
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <>
              {name !== 'Authentication' && (
                <SidenavCollapse
                  key={key}
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  open={openCollapse[key]}
                  onClick={() =>
                    setOpenCollapse((prevState) => ({
                      ...prevState,
                      [key]: !prevState[key],
                    }))
                  }
                >
                  {collapse ? renderCollapse(collapse) : null}
                </SidenavCollapse>
              )}
            </>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <ArgonTypography
            key={key}
            color={darkSidenav ? "white" : "dark"}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </ArgonTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} light={darkSidenav} />;
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot  {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
      <ArgonBox pt={3} pb={1} px={4} textAlign="center">
        <ArgonBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <ArgonTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <ArgonBox component="img" src={"https://png.pngtree.com/template/20190810/ourmid/pngtree-holy-al-quran-logo-illustration-sign-symbol-icon-image_292631.jpg"} alt="Argon Logo" width="2rem" mr={0.25} style={{borderRadius: 20}} />
          )}
          <ArgonBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <ArgonTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={darkSidenav ? "white" : "dark"}
            >
              QUARAN ACADEMY
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      <Divider light={darkSidenav} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};

Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
