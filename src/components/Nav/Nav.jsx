/* eslint-disable @typescript-eslint/camelcase */

import React, { useState } from "react";
import styled from "styled-components";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SVG from "react-inlinesvg";
import polishFlag from "../../assets/polish.svg";
import englishFlag from "../../assets/english.svg";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: transparent;
  color: #c7c6c4;
  padding: 0;
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding-left: 0;

  svg {
    fill: #c7c6c4;
  }

  li {
    padding: 0.5rem;
    margin: 0 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 2vh;
  width: 100%;
`;

const FlagButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 5vh;
  }
`;

const Nav = () => {
  const { i18n } = useTranslation();
  const flags = {
    en_US: polishFlag,
    pl_PL: englishFlag
  };
  const [localLanguage, changeLocalLanguage] = useState(i18n.language);

  const changeLanguage = () => {
    const newLanguage = localLanguage === "en_US" ? "pl_PL" : "en_US";
    changeLocalLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Navbar>
      <Container>
        <FlagButton type="button" onClick={changeLanguage}>
          <img alt="Flag" src={flags[localLanguage]} />
        </FlagButton>
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
      </Container>
    </Navbar>
  );
};

export default Nav;
