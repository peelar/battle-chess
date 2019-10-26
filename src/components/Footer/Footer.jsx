import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  font-size: 0.75rem;
  color: #c7c6c4;

  a {
    color: #c7c6c4;
    margin: 0 4px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <span>
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </span>
    </Container>
  );
};

export default Footer;
