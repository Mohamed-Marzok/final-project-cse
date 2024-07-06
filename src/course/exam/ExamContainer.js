import React from "react";
import Nav from "../../main component/Nav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Container } from "@mui/material";

export default function ExamContainer() {
  return (
    <div>
      <Nav />
      <Container sx={{ overflow: "hidden" }}>
        <Outlet />
      </Container>
    </div>
  );
}
