import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from "react-spring";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  visibility: ${props => (props.hidden ? "hidden" : "unset")};
  height: 75px;

  h1 {
    margin: 0;
  }
`;

const Feedback = ({ events }) => {
  const [dispatched, dispatchAnimation] = useState(false);
  const [prevEvents, changePrevEvents] = useState([]);

  useEffect(() => {
    dispatchAnimation(false);
    setTimeout(() => {
      if (prevEvents.length !== events.length) {
        changePrevEvents(events);

        setTimeout(() => {
          dispatchAnimation(true);
        }, 250);
      }
    });

    setTimeout(() => {
      dispatchAnimation(false);
    }, 2500);
  }, [events]);

  const { xy, opacity } = useSpring({
    from: { opacity: 0, xy: [0, 100] },
    opacity: dispatched ? 1 : 0,
    xy: dispatched ? [0, 0] : [0, 100],
    config: config.gentle
  });

  const show = events.length !== 0;
  const targetEvent = show ? events[events.length - 1].text : null;

  return (
    <Container>
      {dispatched && show && (
        <animated.h1
          style={{
            transform: xy.interpolate((x, y) => `translate(${x}px, ${y}px)`),
            opacity: opacity.interpolate(transparency => transparency)
          }}
        >
          {targetEvent}
        </animated.h1>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  events: state.gameState.events
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedback);
