import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Counter = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: flex-end;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  color: black;
  padding: 3vw;

  h1 {
    margin: 0;
    font-weight: normal;
  }
`;

const Interface = ({ show, count, team }) => (
  <Counter show={show}>
    <h1>
      <strong>Round: </strong>
      {count}
    </h1>
    <h1>
      <strong>Team: </strong>
      {`${team === 0 ? 'Black' : 'White'}`}
    </h1>
  </Counter>
);

const mapStateToProps = (state) => ({
  count: state.gameState.round,
  team: state.gameState.activeTeam,
});

export default connect(
  mapStateToProps,
)(Interface);
