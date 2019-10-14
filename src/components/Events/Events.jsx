import React from 'react';
import styled from 'styled-components';
import uuid4 from 'uuid';
import { connect } from 'react-redux';

const Container = styled.ul`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  background-color: white;
  list-style: none;
  z-index: 2;
  padding: 1rem;
  margin-right: 3vh;

  h2 {
    margin: 0;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
  }
`;

const Event = styled.li`
  padding: 0.25rem 0;
`;

const Events = ({ events }) => {
  if (events.length === 0) return null;
  return (
    <Container>
      <h2>Events</h2>
      {events.map((event) => <Event key={uuid4()}>{event.text}</Event>)}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  events: state.gameState.events,
});

export default connect(
  mapStateToProps,
)(Events);
