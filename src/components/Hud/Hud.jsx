import React from "react";
import styled from "styled-components";
import Round from "../Round/Round";
import Feedback from "../Feedback/Feedback";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 3vw;
  background-color: whitesmoke;
`;

const Hud = ({ show }) => (
  <Container>
    <Feedback />
    <Round show={show} />
  </Container>
);

export default Hud;
