import { Card, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function AboutUs() {
  const persons = [
    {
      name: "Mahmoud Youssef",
      role: "UI UX Designer",
      img: "/team img/Mahmoud Youssef.png",
      href: "",
    },
    {
      name: "Abdhullh Eldsoky",
      role: "UI UX Designer",
      img: "/team img/Abdhullh Eldsoky.png",
      href: "",
    },
    {
      name: "Mohamed Elswadfy",
      role: "Front-end Developer",
      img: "/team img/1.png",
      href: "",
    },
    {
      name: "Mohamed Magdy",
      role: "Front-end Developer",
      img: "/team img/Mohamed Magdy.png",
      href: "https://www.linkedin.com/in/mohamed-marzok-bb239a294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mohamed Farag",
      role: " Back-end Developer",
      img: "/team img/Mohamed Farag.png",
      href: "https://www.linkedin.com/in/mohamed-farag-1a5a6b204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Mohamed Abdelmonim",
      role: " Back-end Developer",
      img: "/team img/Mohamed Abdelmonim.png",
      href: "",
    },
    {
      name: "Ahmed Abdelwahd",
      role: " Back-end Developer",
      img: "/team img/Ahmed Abdelwahd.png",
      href: "",
    },
    {
      name: "Mahmoud Abdelhamid",
      role: " Penetration Tester",
      img: "/team img/Mahmoud Abdelhamid.png",
      href: "",
    },
  ];
  const navigate = useNavigate();
  const personList = useMemo(() => {
    return persons.map((person) => {
      return (
        <PersonCard onClick={() => window.open(person.href, "_blank")}>
          <Stack spacing={2} direction="row" alignItems="center">
            <img src={person.img} />
            <div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
          </Stack>
        </PersonCard>
      );
    });
  }, []);

  return <Content>{personList}</Content>;
}

const Content = styled.div`
  padding: 50px 0;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  place-items: center;
`;
const PersonCard = styled(Card)`
  cursor: pointer;
  padding: 10px;
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 100px;
  }
  h3 {
    color: #f48c06;
  }
  p {
    color: #777;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
