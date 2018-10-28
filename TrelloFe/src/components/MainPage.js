import React from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { lifecycle, compose, withState, withHandlers } from "recompose";
import Header from "./Header";

import Story from "./Story";

const MainPage = ({
  searchValue,
  onChange,
  onClick,
  stories = [],
  openModal,
  updateOpenModal
}) => {
  return (
    <Container>
      <Header />
      {console.log(openModal)}
      {openModal ? (
        <Story show={openModal} handleClose={updateOpenModal} />
      ) : (
        ""
      )}
      <FirstContainer>
        <FontAwesomeIcon icon="search" color="#818284" />
        <InputSearch
          type="text"
          name="search"
          value={searchValue}
          placeholder="Search label"
          onChange={onChange}
        />
        <AddStoryButton type="submit" value="Add story" onClick={onClick} />
      </FirstContainer>

      <ContainerCards>
        {stories.length === 0 ? (
          <div>There are no stories .</div>
        ) : (
          stories
            .filter(story => story.label.toLowerCase().includes(searchValue))
            .map((story, index) => (
              <Card key={index} title={story.title} label={story.label} />
            ))
        )}
      </ContainerCards>
    </Container>
  );
};

const enhance = compose(
  withState("searchValue", "updateSearchValue", ""),
  withState("openModal", "updateOpenModal", false),
  withHandlers({
    onChange: props => event => {
      props.updateSearchValue(event.target.value);
    },
    onClick: props => event => {
      event.preventDefault();
      props.updateOpenModal(!props.openModal);
    }
  }),
  lifecycle({
    componentDidMount() {
      fetch("http://192.168.100.13:3000/stories") // or whatever URL you want
        .then(response => response.json())
        .then(stories => this.setState({ stories }));
    }
  })
);
export default enhance(MainPage);

const Container = styled.div``;
const FirstContainer = styled.div`
  padding-top: 1em;
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-left: 3em;
`;
const InputSearch = styled.input`
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 60%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 15px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em;
`;

const AddStoryButton = styled.input`
  background: #472f6b;
  color: white;
  padding: 5px 10px;
  margin: 0em 2em;
  outline: none;
  border-radius: 15px;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  font-size: 0.8em;
  &:hover {
    border: 1px solid #0099cc;
    background-color: #472f6b;
    color: white;
    padding: 5px 10px;
  }
`;
const ContainerCards = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
