import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPathPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const userFromSlice = useSelector((state) => state.login.user);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [userFromSlice]);
  const handleClick = () => {
    if (user) {
      navigate("/auth/home");
    } else {
      navigate("/home");
    }
  };
  return (
    <ErrorContainer>
      <ErrorImage src="/error.svg" alt="Error" />
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      <p>We couldn't find the page you were looking for.</p>
      <p>
        Please check the URL or go back to the{" "}
        <span
          onClick={handleClick}
          style={{ color: "blue", cursor: "pointer" }}
        >
          homepage
        </span>
      </p>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const ErrorImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
