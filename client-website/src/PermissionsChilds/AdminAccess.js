// import { useEffect } from "react";
// import { fetchUser } from "../globalStore/Slices/AuthSlice";
// import { useSelector } from "react-redux";

// export const AdminAccess = ({ dispatch, children }) => {
//   const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  
//   // Array of allowed full names
//   const permissions = ["waqas ahmed", "ahmed", "rizwan", "myname"];


 
  
//   useEffect(() => {
//     // Fetch user when admin access check permissions
//     if (isAuthenticated) {
//       dispatch(fetchUser());
//     }
//   }, [dispatch, isAuthenticated]);
  
//   // Check if the user fullname exists in the allowed fullnames array
//   if (user?.fullname && permissions.includes(user.fullname.toLowerCase())) {
//     return (
//       <>
//         {children}
//       </>
//     );
//   }
  
//   return null; // Return null instead of navigating to a different route
// };
// import { useEffect } from "react";
// import { fetchUser } from "../globalStore/Slices/AuthSlice";
// import { useSelector } from "react-redux";

// export const AdminAccess = ({ dispatch, children }) => {
//   const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  
//   // Array of allowed full names
//   const permissions = ["waqas ahmed", "ahmed", "rizwan", "myname"];


 
  
//   useEffect(() => {
//     // Fetch user when admin access check permissions
//     if (isAuthenticated) {
//       dispatch(fetchUser());
//     }
//   }, [dispatch, isAuthenticated]);
  
//   // Check if the user fullname exists in the allowed fullnames array
//   if (user?.fullname && permissions.includes(user.fullname)) {
//     return (
//       <>
//         {children}
//       </>
//     );
//   }
  
//   return null; // Return null instead of navigating to a different route
// };


import { useEffect } from "react";
import { fetchUser } from "../globalStore/Slices/AuthSlice";
import { useSelector } from "react-redux";

export const AdminAccess = ({ dispatch, children }) => {
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
   const role = "addmin"
  // Array of allowed full names
  const permissions = ["waqas ahmed", "ahmed", "rizwan", "myname"];
  // Array for super admin permissions
  const onlypermission2 = ["waqar ahmad"];

  useEffect(() => {
    // Fetch user when admin access check permissions
    if (isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  // Check if the user's full name exists in the allowed full names array
  const hasPermission = user?.fullname && permissions.includes(user.fullname.toLowerCase());
  
  // Check if the user's full name exists in the super admin permissions array
  const hasSuperAdminPermission = role && onlypermission2.includes(role);

  // if ((role === "admin" && hasSuperAdminPermission) || hasPermission) {
    if (user?.role === "admin") {

    return (
      <>
        {children}
      </>
    );
  }

  return null; // Return null instead of navigating to a different route
};

