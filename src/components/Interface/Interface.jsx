import React from "react";
import styled from "styled-components";
import Round from "../Round/Round";
import Events from "../Events/Events";

const Container = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 1rem;
  position: absolute;
  right: 0;
  top: 0;
`;

const Interface = ({ show }) => (
  <Container>
    <Round show={show} />
    <Events />
  </Container>
);

export default Interface;
