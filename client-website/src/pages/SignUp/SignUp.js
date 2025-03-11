import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  styled,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { register } from "../../globalStore/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/CustomLoader/CustomLoader";

const theme = createTheme();

const CssTextField = styled(TextField)({
    
//   "& label.Mui-focused": {
//     color: "white"
//   },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6497df"
    },
    "&:hover fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6497df"
    }
  },
//   "& .MuiInputLabel-root": {
//     color: "white"
//   },
//   "& .MuiInputBase-input": {
//     color: "white"
//   }
});

const SignUp = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);


  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const [role, setRole] = React.useState(""); // State for role selection

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password?.current?.value, 'password');
    console.log(confirmPassword?.current?.value, 'confirm-password');

    if (password?.current?.value !== confirmPassword?.current?.value) {
      // confirmPassword.current.setCustomValidity(
      //   "password is not matching... Please write carefully"
      // );
      console.log('not match')
    } else {
      const user = {
        fullname: userName.current.value,
        username: userName.current.value,
        email: email.current.value,
        password: password.current.value,
        role: role, // Add role to the user object

      };
     
      try {
        const resultAction = await dispatch(register(user));
        if (register.fulfilled.match(resultAction)) {
          navigate("/signin");
        } else {
          console.log(resultAction.payload);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  if (loading) {
    return <LoadingScreen />;
  }


  return (
    <>
  

     


      <ThemeProvider theme={theme}>
        <Container component="main" style={{ display: "flex", height: "100vh" }}>
          <CssBaseline />
          <Grid container sx = {{justifyContent:  "center"}} >
           
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent:  "center" ,
                // alignItems: {md: 'center'},
                backgroundColor: mediaLessthanmd ? "#f5f5f5" : "transparent",
                padding: mediaLessthanmd ? "20px" : "40px",
              }}
            >
              <form style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleSubmit}>
                <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign:'center' }}>
                  SIGN UP
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <CssTextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      inputRef={userName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                  <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      inputRef={email}
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                  <CssTextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      inputRef={password}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                              <CssTextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              autoFocus
              inputRef={confirmPassword}
              type="password"
            />
                    </Grid>
                    {/* Role Selection Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Role</InputLabel>
                    <Select value={role} onChange={(e) => setRole(e.target.value)} label="Select Role">
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                    <Grid item md={12} xs={12}  justifyContent="center" >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  
                </Grid>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignUp;
