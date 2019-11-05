import React from "react";
import styled from "styled-components";
import uuid4 from "uuid";
import { connect } from "react-redux";
import { DESKTOP_LARGE } from "../../breakpoints";
import { GameEvents } from "../../redux/game/interface";

const Container = styled.div`
  display: none;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
  z-index: 2;
  margin-right: 3vh;
  padding: 1rem;

  @media (min-width: ${DESKTOP_LARGE}) {
    display: flex;
  }

  h2 {
    margin: 0;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
  }
`;

const List = styled.ol`
  display: flex;
  flex-direction: column-reverse;
  list-style: none;
  overflow: scroll;
  padding-left: 0;
  max-height: 30vh;
`;

const Event = styled.li`
  padding: 0.25rem 0;
`;

const Events: React.FunctionComponent<GameEvents> = ({
  events
}: GameEvents) => {
  if (events.length === 0) return null;
  return (
    <Container>
      <h2>Events</h2>
      <List>
        {events.map(event => (
          <Event key={uuid4()}>{event.text}</Event>
        ))}
      </List>
    </Container>
  );
};

const mapStateToProps = state => ({
  events: state.gameState.events
});

export default connect(mapStateToProps)(Events);
