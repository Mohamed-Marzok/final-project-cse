import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeNewAcc, closeSignfail, userSignup } from "../redux/loginSlice";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const newAccMsg = useSelector((state) => state.login.newAccMsg);
  const signFailMsg = useSelector((state) => state.login.signFailMsg);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userSignup(signupData));
  };

  const handleSnackbarNewAccClose = () => {
    dispatch(closeNewAcc());
  };
  const handleSnackbarSignFailClose = () => {
    dispatch(closeSignfail());
  };

  return (
    <Content>
      <LoginCard>
        <Stack spacing={2} direction="row">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            required
            onChange={handleChange}
          />
        </Stack>
        <TextField
          id="userName"
          name="userName"
          label="User Name"
          variant="outlined"
          required
          InputProps={{
            pattern: "[a-zA-Z0-9]+",
            title: "Username should only contain letters and numbers",
          }}
          onChange={handleChange}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          required
          InputProps={{
            pattern: ".{6,}",
            title: "Password must be at least 6 characters",
          }}
          onChange={handleChange}
        />
        <FormControl fullWidth required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            id="role"
            name="role"
            value={signupData.role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </Select>
        </FormControl>
        <SignupBtn variant="contained" onClick={handleSubmit}>
          Sign up
        </SignupBtn>
        <LoginBtn>
          <p>Have an account?</p>
          <a href="login">Log In Now.</a>
        </LoginBtn>
      </LoginCard>
      <Snackbar
        open={newAccMsg}
        autoHideDuration={5000}
        onClose={handleSnackbarNewAccClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#4caf50",
          }}
          message="Congratulations! You have successfully joined us."
        />
      </Snackbar>
      <Snackbar
        open={signFailMsg}
        autoHideDuration={5000}
        onClose={handleSnackbarSignFailClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#f44336",
          }}
          message="Operation failed. Please check your input data and try again."
        />
      </Snackbar>
    </Content>
  );
}

const Content = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 20px;
  @media (max-width: 768px) {
    height: calc(100vh - 40px);
  }
`;

const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 50px;
  gap: 20px;
`;

const SignupBtn = styled(Button)`
  white-space: nowrap;
`;

const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  a {
    text-decoration: none;
    color: #471fade3;
  }
`;
