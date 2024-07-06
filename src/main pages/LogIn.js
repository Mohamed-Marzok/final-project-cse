import {
  Button,
  Card,
  TextField,
  CircularProgress,
  Hidden,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.login);
  const [loginData, setLoginData] = useState({
    email: "Mohamed22@gmail.com",
    Password: "Mohamed_123456789",
  });

  const handleLoginBtn = async () => {
    const resultAction = await dispatch(getUser(loginData));
    if (getUser.fulfilled.match(resultAction)) {
      console.log("dddddd");
      navigate("/auth");
    } else {
      console.error("Failed to log in");
    }
  };

  return (
    <Content>
      <LoginCard>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          value={loginData.email}
          onChange={(e) =>
            setLoginData((prevData) => ({ ...prevData, email: e.target.value }))
          }
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          value={loginData.Password}
          onChange={(e) =>
            setLoginData((prevData) => ({
              ...prevData,
              Password: e.target.value,
            }))
          }
        />
        <LoginBtn
          variant="contained"
          onClick={handleLoginBtn}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Log in"}
        </LoginBtn>
        <SignupBtn style={{ visibility: isLoading ? "hidden" : "visible" }}>
          <p>New User?</p>
          <a href="signup">Sign Up Now.</a>
        </SignupBtn>
      </LoginCard>
    </Content>
  );
}

const Content = styled.div`
  height: 100%;
  transform: translateY(-50px);
  display: grid;
  place-items: center;
  align-content: center;
  gap: 20px;
  @media (max-width: 768px) {
    height: calc(100vh - 110px);
  }
`;

const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 50px;
  gap: 20px;
`;

const LoginBtn = styled(Button)`
  white-space: nowrap;
`;

const SignupBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  a {
    text-decoration: none;
    color: #471fade3;
  }
`;
