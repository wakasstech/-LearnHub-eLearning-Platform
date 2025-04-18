import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  styled,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { login } from "../../globalStore/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/CustomLoader/CustomLoader";

const theme = createTheme();

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6497df",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6497df",
    },
  },
});

const SignIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const resultAction = await dispatch(login(user));
      if (login.fulfilled.match(resultAction)) {
        navigate("/"); // Or wherever you want to navigate after login
      } else {
        console.log(resultAction.payload);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          style={{ display: "flex", height: "100vh" }}
        >
          <CssBaseline />
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                // alignItems: {md: 'center'},
                backgroundColor: mediaLessthanmd ? "#f5f5f5" : "transparent",
                padding: mediaLessthanmd ? "20px" : "40px",
              }}
            >
              <form
                style={{ width: "100%", maxWidth: "400px" }}
                onSubmit={handleSubmit}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ mb: 3, textAlign: "center" }}
                >
                  SIGN IN
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
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
                      inputRef={password}
                      type="password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  {/* <Grid item>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
};

export default SignIn;
