import React from "react";
import styled from "styled-components";

const Card = ({title,label}) => {
  let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container>
      <Button>
        <CardContainer>
          <Title>{capitalizeFirstLetter(title)}</Title>
          <NoteText>
            <Label>Label : {label}</Label>
          </NoteText>
        </CardContainer>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  max-width: 30%;
  height: 40%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0.5em;
  margin-bottom: 2em;
  padding-bottom:1em;
`;
const Button = styled.button`
  background-color: Transparent;
  outline: none;
  border: none;
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-rows: 30% 70%;
`;
const Title = styled.div`
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  padding-top: 1em;
  margin-bottom:1em;
  text-align: center;
  color: #472f6b;
  font-size: 1.4em;
`;
const NoteText = styled.div`
  max-width: 100%;
`;
const Label = styled.div`
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  padding: 0em 1em;
  color: #727272;
  font-size: 1.1em;
  word-wrap: break-word;
  max-width: 90%;
`;



export default Card;
