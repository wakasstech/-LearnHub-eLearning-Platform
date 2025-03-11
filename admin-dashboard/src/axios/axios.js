import axios from 'axios';
import {BASEURL} from '../Config/config';
import Swal from 'sweetalert2';

const instance = axios.create({
  baseURL: BASEURL, // Replace this with your desired base URL
});


instance.interceptors.request.use(config => {
  const authToken = localStorage.getItem('jwt');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

instance.interceptors.response.use(
    response => response,
    async (error) =>  {
      const status = error.response ? error.response.status : null;
      
      // if (status === 401) {
      //   // Handle unauthorized access
      //   console.log("Unauthorized access");
      //   const willDelete =await Swal({
      //       title: "Session Expired",
      //       text: "Your session has been expired , Please Login again.",
      //       icon: "warning",
      //       dangerMode: true,
      //     });
      //     if (willDelete) {
      //       Swal("Logout!", "Logout Successfully!", "success");
      //       localStorage.removeItem('jwt')
      //       window.location.href = '/authentication/sign-in/basic'
      //     }
      // }
      if (status === 401) {
        // Handle unauthorized access
        console.log("Unauthorized access");
    
        const result = await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please login again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "OK",
            dangerMode: true,
        });
    
        if (result.isConfirmed) {
            Swal.fire({
                title: "Logout!",
                text: "Logout!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                localStorage.removeItem('jwt');
                localStorage.clear();
                window.location.href = '/authentication/sign-in/basic';
            });
        }
    }
       else if (status === 404) {
        // Handle not found error

        console.log("Post not found");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
      
      return Promise.reject(error);
    }
  );

export default instance;