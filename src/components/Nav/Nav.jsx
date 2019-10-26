import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: transparent;
  color: #c7c6c4;

  svg {
    fill: #c7c6c4;
  }
`;

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding: 3vh 2vh;

  li {
    padding: 0.5rem;
    margin: 0 0.5rem;
  }
`;

const Nav = () => {
  return (
    <Navbar>
      <LinkList>
        <li>
          <a href="https://github.com/peelar">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/Pilarenko">
            <FaTwitter />
          </a>
        </li>
      </LinkList>
    </Navbar>
  );
};

export default Nav;
