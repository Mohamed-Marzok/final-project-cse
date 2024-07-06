import React from "react";
import styled from "styled-components";
import { Card, Divider } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleChatClick = () => {
    const chatUrl = `https://chat.acadmix.online/home?token=${token}`;
    window.open(chatUrl, "_blank");
  };

  return (
    <Content>
      <List>
        <Item onClick={() => navigate("/auth/home")}>
          <LibraryBooksIcon className="logo" />
          <p>Courses</p>
        </Item>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "red" }}
        />
        <Item onClick={handleChatClick}>
          <ChatIcon className="logo" />
          <p>Chat</p>
        </Item>
      </List>
    </Content>
  );
}

const Content = styled(Card)`
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px;
  height: calc(100vh - 60px);
  padding: 50px 20px;
  border-radius: 0 !important;
  @media (max-width: 768px) {
    width: 70px;
    height: fit-content;
    text-align: center;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 3px;

  .logo {
    color: #888;
    transition: 0.5s;
  }

  p {
    font-size: 14px;
    font-weight: bold;
    color: #471fade3;
    position: relative;
  }

  p::before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #471fade3;
    left: 0;
    bottom: -2px;
    transition: 0.5s;
  }

  &:hover {
    p::before {
      width: 100%;
    }

    .logo {
      color: #471fade3;
    }
  }

  @media (max-width: 768px) {
    p {
      display: none;
    }
  }
`;
