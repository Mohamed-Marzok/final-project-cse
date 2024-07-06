import React from "react";
import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Card from "@mui/material/Card";
import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
export default function ContactUs() {
  return (
    <Content>
      <Left>
        <h1>Contact Information</h1>
        <List>
          <Item>
            <MailOutlineIcon className="logo" />
            <a href="mailto:aaa116510@gmail.com">Mail</a>
          </Item>
          <Item>
            <LocalPhoneIcon className="logo" />
            <p>01010604596</p>
          </Item>
          <Item>
            <RoomIcon className="logo" />
            <p>Zagazig</p>
          </Item>
        </List>
        <div style={{ marginTop: "40px" }}></div>
        <h1>Social</h1>
        <List>
          <Item>
            <TwitterIcon className="logo" />
            <a href="#">info@example.com</a>
          </Item>
          <Item>
            <FacebookIcon className="logo" />
            <a href="#">info@example.com</a>
          </Item>
          <Item>
            <YouTubeIcon className="logo" />
            <a href="#">info@example.com</a>
          </Item>
          <Item>
            <LinkedInIcon className="logo" />
            <a href="#">info@example.com</a>
          </Item>
          <Item>
            <InstagramIcon className="logo" />
            <a href="#">info@example.com</a>
          </Item>
        </List>
      </Left>
      <Right>
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
        </Stack>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          defaultValue=""
        />
        <SendBtn variant="contained">Send</SendBtn>
      </Right>
    </Content>
  );
}
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 100%;
  width: 100%;
  padding: 50px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  background-color: #f13c3c;
  padding: 20px;
  border-radius: 20px;
  h1 {
    color: #fff;
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 20px;
  }
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 3px;

  .logo {
    color: #fff;
  }
  p {
    font-size: 16px;
    color: #fff;
  }
  a {
    color: #fff;

    text-decoration: none;
  }
`;
const Right = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
const SendBtn = styled(Button)`
  width: 80px;
  align-self: flex-end;
  background-color: #f13c3c !important;
`;
