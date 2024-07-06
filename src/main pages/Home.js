import React from "react";
import styled, { keyframes } from "styled-components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleBtnClick = (name) => {
    navigate(`/${name}`);
  };

  return (
    <Content>
      <Left>
        <Title>
          <span>STUDYING</span> Online Is Now Much Easier
        </Title>
        <Description>
          Acadmix is an interesting platform that will teach you in a more
          interactive way.
        </Description>
        <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleBtnClick("login")}
          >
            log in
          </Button>
          <Button variant="contained" onClick={() => handleBtnClick("signup")}>
            sign up
          </Button>
        </Stack>
      </Left>
      <Logo src="/shortlogo.png" />
    </Content>
  );
}

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: black; }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    height: calc(100vh - 110px);
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 5px;
  overflow: hidden;
  border-right: 0.15em solid #fff;
  white-space: nowrap;
  letter-spacing: 0.15em;
  animation-fill-mode: forwards;
  animation: ${typing} 3.5s steps(40, end), ${blink} 0.75s step-end 6;
  span {
    color: #f48c06;
    font-size: 40px;
  }
  @media (max-width: 768px) {
    white-space: wrap;
    animation: none;
    border-right: none;
  }
`;

const Description = styled.p`
  color: #777;
  font-size: 16px;
  overflow: hidden;
  border-right: 0.15em solid #fff;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: ${typing} 4s steps(50, end) 3.5s, ${blink} 0.75s step-end 6;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  visibility: visible;
  @media (max-width: 768px) {
    white-space: wrap;
    animation: none;
    border-right: none;
  }
`;

const Logo = styled.img`
  height: 30%;
  animation: upDownLogo 4s infinite linear;
  @keyframes upDownLogo {
    0% {
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(-50px);
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
