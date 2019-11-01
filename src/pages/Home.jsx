import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import Button from "../components/Button/Button";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import Panes from "../components/Panes/Panes";

const HomeScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const NavLink = styled(Link)`
  z-index: 20;

  &:hover {
    text-decoration: none;
  }
`;

const BorderButton = styled(Button)`
  border: 2px solid black;

  &:hover {
    border: 2px solid black;
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const [on, toggle] = useState(false);

  return (
    <HomeScreen>
      <Nav />
      <Panes on={on} />
      <NavLink to="/game" onClick={() => toggle(true)}>
        <BorderButton type="button">
          <GiCrossedSwords />
          {t("play")}
        </BorderButton>
      </NavLink>
      <Footer />
    </HomeScreen>
  );
};

export default Home;
