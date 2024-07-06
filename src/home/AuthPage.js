import { Outlet } from "react-router-dom";
import Nav from "../main component/Nav";
import styled from "styled-components";
import { Container } from "@mui/material";
import Sidebar from "../main component/Sidebar";

export default function AuthPage() {
  return (
    <div>
      <Nav />
      <Sidebar />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </div>
  );
}
const StyledContainer = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 200px);
  transform: translate(200px, 0px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    height: 100%;
    padding: 0px 30px;
    width: calc(100vw - 70px);
    transform: translateX(70px);
  }
`;
