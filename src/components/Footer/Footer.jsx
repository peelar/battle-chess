import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 1rem 0;
  font-size: 0.75rem;
  color: #c7c6c4;

  a {
    color: #c7c6c4;
    margin: 0 4px;
  }
`;

const Content = styled.div`
  padding: 0 2rem;
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Content>
        {t("icons_info")}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
        {t("icons_from")}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </Content>
    </Container>
  );
};

export default Footer;
