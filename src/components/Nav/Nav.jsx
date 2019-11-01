/* eslint-disable @typescript-eslint/camelcase */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SVG from "react-inlinesvg";
import { englishFlag, polishFlag } from "../../assets/assets";

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
  z-index: 15;
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

  svg {
    width: 4vh;
  }
`;

const Nav = () => {
  const { i18n } = useTranslation();
  const [localLanguage, changeLocalLanguage] = useState("en_US");

  const changeLanguage = () => {
    const newLanguage = localLanguage === "en_US" ? "pl_PL" : "en_US";
    changeLocalLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    changeLocalLanguage(i18n.language);
  }, [i18n.language]);

  const flags = {
    en_US: {
      flag: polishFlag,
      title: "Polish flag"
    },
    pl_PL: {
      flag: englishFlag,
      title: "English flag"
    }
  };

  return (
    <Navbar>
      <Container>
        <FlagButton type="button" onClick={changeLanguage}>
          <SVG src={flags[localLanguage].flag} />
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
