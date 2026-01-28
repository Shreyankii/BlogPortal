import React, { useState } from "react";
import { Box, TextField, Button, styled, Typography, Link } from "@mui/material";
import blogimg from "../../assets/blog.png";
import axios from "axios";
import { setUser } from "../../redux/user/userSlice";
import { BASE_URL } from "../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Comp = styled(Box)`
  width: 400px;
  margin: auto;
  background-color: #ebe4ed;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  paddingTop: "55px",
});

const Wrapp = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #d96ee7;
  border-radius: 7px;
  height: 45px;
  &:hover {
    background-color: #c907e2;
  }
`;

const SignupBtn = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const ErrorText = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 1.2;
  margin-top: 10px;
  font-weight: 600;
`;

const ForgotPasswordLink = styled(Link)`
  color: #31363f;
  text-decoration: none;
  font-size: 0.9rem;
`;

function getAxiosErrorMessage(err) {
  // axios errors often have: err.response.data.message
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Something went wrong! Please try again."
  );
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInitialValues = { name: "", username: "", email: "", password: "" };
  const loginInitialValues = { username: "", password: "" };

  const [account, setAccount] = useState("login"); // "login" | "signup"
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");

  const toggle = () => setAccount((prev) => (prev === "signup" ? "login" : "signup"));

  const onSignupChange = (e) => setSignup({ ...signup, [e.target.name]: e.target.value });
  const onLoginChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const registration = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${BASE_URL}/user/signup`, signup, { withCredentials: true });

      toast.success("Signup successful! Please login.");
      setSignup(signupInitialValues);

      setTimeout(() => setAccount("login"), 800);
    } catch (err) {
      const msg = getAxiosErrorMessage(err);
      toast.error(msg);
      setError(msg);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, login, {
        withCredentials: true,
      });

      // make sure response has user
      const user = response?.data?.user;
      if (!user) {
        throw new Error("Login succeeded but user data is missing from response.");
      }

      dispatch(setUser(user));
      toast.success("Login successful!");

      // Navigate without reloading (reload breaks redux)
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      const msg = getAxiosErrorMessage(err);
      toast.error(msg);
      setError(msg);
    }
  };

  return (
    <Comp>
      <Box component="form" onSubmit={account === "login" ? loginUser : registration}>
        <Image src={blogimg} alt="login" />

        {account === "login" ? (
          <Wrapp>
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              value={login.username}
              onChange={onLoginChange}
            />

            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
              type="password"
              value={login.password}
              onChange={onLoginChange}
            />

            {error && <ErrorText>{error}</ErrorText>}

            <div style={{ marginBottom: "0.5rem" }}>
              <ForgotPasswordLink component={NavLink} to="/email">
                Forgot Password
              </ForgotPasswordLink>
            </div>

            <LoginButton type="submit" variant="contained">
              Login
            </LoginButton>

            <Text style={{ textAlign: "center" }}>OR</Text>

            <SignupBtn onClick={toggle} style={{ marginBottom: 50 }}>
              Create an account
            </SignupBtn>
          </Wrapp>
        ) : (
          <Wrapp>
            <TextField
              variant="standard"
              name="name"
              label="Enter Name"
              value={signup.name}
              onChange={onSignupChange}
            />
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              value={signup.username}
              onChange={onSignupChange}
            />
            <TextField
              variant="standard"
              name="email"
              label="Enter Email"
              value={signup.email}
              onChange={onSignupChange}
            />
            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
              type="password"
              value={signup.password}
              onChange={onSignupChange}
            />

            {error && <ErrorText>{error}</ErrorText>}

            <SignupBtn type="submit">Signup</SignupBtn>

            <Text style={{ textAlign: "center" }}>OR</Text>

            <LoginButton variant="contained" onClick={toggle}>
              Already have an account
            </LoginButton>
          </Wrapp>
        )}
      </Box>

      <ToastContainer />
    </Comp>
  );
};

export default Login;
