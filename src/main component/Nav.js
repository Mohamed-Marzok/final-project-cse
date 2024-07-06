import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupIcon from "@mui/icons-material/Group";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Nav(props) {
  const [user, setUser] = useState();
  const userFromSlice = useSelector((state) => state.login.user);
  const [activeIcon, setActiveIcon] = useState("home");
  const navigate = useNavigate();
  const handleItemClick = (name) => {
    navigate(`${name}`);
    setActiveIcon(name);
  };
  const handleLogoutClick = (name) => {
    navigate(`/`);
    localStorage.clear();
    setUser("");
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [userFromSlice]);
  console.log(user);
  return (
    <Content>
      <Left>
        <Logo src="/logo.png" onClick={() => handleItemClick("home")} />
        <List>
          <Item onClick={() => handleItemClick("home")}>
            <HomeIcon
              className="logo"
              style={{
                color: activeIcon === "home" ? "#471fade3" : "",
              }}
            />
            <p
              style={{
                borderBottom:
                  activeIcon === "home" ? "2px #471fade3 solid" : "",
              }}
            >
              Home
            </p>
          </Item>
          <Item onClick={() => handleItemClick("contactus")}>
            <LocalPhoneIcon
              className="logo"
              style={{
                color: activeIcon === "contactus" ? "#471fade3" : "",
              }}
            />
            <p
              style={{
                borderBottom:
                  activeIcon === "contactus" ? "2px #471fade3 solid" : "",
              }}
            >
              Contact US
            </p>
          </Item>
          <Item onClick={() => handleItemClick("aboutus")}>
            <GroupIcon
              className="logo"
              style={{
                color: activeIcon === "aboutus" ? "#471fade3" : "",
              }}
            />
            <p
              style={{
                borderBottom:
                  activeIcon === "aboutus" ? "2px #471fade3 solid" : "",
              }}
            >
              About Us
            </p>
          </Item>
        </List>
      </Left>
      {user && user.FirstName ? (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleLogoutClick("logout")}
        >
          log out
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleItemClick("login")}
        >
          log in
        </Button>
      )}
    </Content>
  );
}
const Content = styled.div`
  height: 60px;
  padding: 20px;
  box-shadow: 0 5px 15px #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000000;
  /* background-color: antiquewhite; */
`;
const Left = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    gap: 10px;
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
const Logo = styled.img`
  height: 80px;
  margin-right: 10px;
  cursor: pointer;
`;
