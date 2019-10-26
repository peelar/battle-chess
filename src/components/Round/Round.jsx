import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Counter = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  align-items: flex-end;
  flex-direction: column;
  color: #c4c4c4;

  h1 {
    margin: 0;
    font-weight: normal;
    font-size: 3vh;
  }
`;

const Round = ({ show, count, team }) => {
  const { t } = useTranslation();

  return (
    <Counter show={show}>
      <h1>
        <strong>{`${t("round")}: `}</strong>
        {count}
      </h1>
      <h1>
        <strong>{`${t("team")}: `}</strong>
        {`${team === 0 ? t("team_0") : t("team_1")}`}
      </h1>
    </Counter>
  );
};

const mapStateToProps = state => ({
  count: state.gameState.round,
  team: state.gameState.activeTeam
});

export default connect(mapStateToProps)(Round);
