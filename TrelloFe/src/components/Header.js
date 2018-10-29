import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Column1>TRELLO</Column1>
      <Column2>
        <Name>HELLO ANCA</Name>
        <Status>Log out</Status>
      </Column2>
    </Container>
  );
};

const Container = styled.div`
  background: #472f6b;
  height: 3em;
  display: grid;
  grid-template-columns: 80% 20%;
`;
const Column1 = styled.div`
  display: flex;
  align-items: center;
  color: #00d6c0;
  font-size: 1.7em;
  margin-left: 3em;
  font-weight: bold;
`;
const Column2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1em;
`;
const Name = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1em;
  margin-right: 2em;
`;
const Status = styled.div`
  color: white;
  font-size: 0.8em;
`;

export default Header;
