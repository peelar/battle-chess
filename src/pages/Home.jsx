import React, { useState } from "react";
import styled from "styled-components";
import { GiCrossedSwords } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "react-spring";
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

const FadeContainer = styled(animated.div)`
  z-index: 20;
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
  const fadeOut = useSpring({
    opacity: on ? 0 : 1
  });

  return (
    <HomeScreen>
      <Nav animation={fadeOut} />
      <Panes on={on} />
      <FadeContainer style={fadeOut}>
        <BorderButton type="button" onClick={() => toggle(true)}>
          <GiCrossedSwords />
          {t("play")}
        </BorderButton>
      </FadeContainer>
    </HomeScreen>
  );
};

export default Home;
