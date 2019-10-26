import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import { useSpring, animated, config } from "react-spring";
import { GiCrossedSwords } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import Button from "../components/Button/Button";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

const HomeScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Home = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <HomeScreen>
      <Nav />
      <Button type="button" onClick={() => history.push("/game")}>
        <GiCrossedSwords />
        {t("play")}
      </Button>
      <Footer />
    </HomeScreen>
  );
};

export default Home;
