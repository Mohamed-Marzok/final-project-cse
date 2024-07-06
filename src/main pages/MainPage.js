import { Outlet } from "react-router-dom";
import Nav from "../main component/Nav";
import styled from "styled-components";
import { Container } from "@mui/material";
import Sidebar from "../main component/Sidebar";

export default function MainPage() {
  return (
    <div>
      <Nav />

      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </div>
  );
}
const StyledContainer = styled(Container)`
  height: calc(100vh - 100px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 768px) {
    overflow: auto !important;
    height: 100%;
  }
`;
