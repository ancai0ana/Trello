import React from 'react'
import Story from './Story'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { lifecycle, compose, withState, withHandlers } from 'recompose'
import Header from './Header'

import StoryDetails from './StoryDetails'

const MainPage = ({
  searchValue,
  onChange,
  onClick,
  stories = [],
  openModal,
  toggleModal,
  toggleOpenDetailModal,
  openDetailModal,
  idSelectStory,
}) => {
  return (
    <Container>
      <Header />
      {openModal ? (
        <StoryDetails handleClose={toggleModal} newStory={true} />
      ) : (
        ''
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
        <AddStoryButton type="submit" value="Add story" onClick={toggleModal} />
      </FirstContainer>

      <ContainerCards>
        {stories.length === 0 ? (
          <div>There are no stories .</div>
        ) : (
          stories
            .filter(story => story.label.toLowerCase().includes(searchValue))
            .map((story, index) => (
              <Story
                key={index}
                id={story._id}
                title={story.title}
                label={story.label}
                assigned={story.label}
                description={story.description}
                toggleOpenDetailModal={toggleOpenDetailModal(story._id)}
                openDetailModal={openDetailModal}
              />
            ))
        )}
      </ContainerCards>
      {openDetailModal
        ? stories
            .filter(story => story._id === idSelectStory)
            .map((story, index) => (
              <StoryDetails
                key={index}
                id={story._id}
                title={story.title}
                label={story.label}
                assigned={story.label}
                description={story.description}
                handleClose={toggleOpenDetailModal(story._id)}
              />
            ))
        : ''}
    </Container>
  )
}

const enhance = compose(
  withState('searchValue', 'updateSearchValue', ''),
  withState('openDetailModal', 'updateOpenDetailModal', false),
  withState('openModal', 'updateOpenModal', false),
  withState('idSelectStory', 'updateIdSelectStory', ''),
  withHandlers({
    onChange: props => event => {
      props.updateSearchValue(event.target.value)
    },
    toggleModal: props => event => {
      props.updateOpenModal(s => !s)
    },
    toggleOpenDetailModal: props => id => event => {
      props.updateIdSelectStory(id)
      props.updateOpenDetailModal(s => !s)
    },
  }),
  lifecycle({
    componentDidMount() {
      fetch('/stories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(stories => this.setState({ stories }))
        .catch(err => console.log(err))
    },
    componentDidUpdate(prevProps, prevState) {
      if (
        this.props.openModal !== prevProps.openModal ||
        this.props.openDetailModal !== prevProps.openDetailModal
      ) {
        fetch('/stories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then(response => response.json())
          .then(stories => this.setState({ stories }))
          .catch(err => console.log(err))
      }
    },
  }),
)
export default enhance(MainPage)

const Container = styled.div``
const FirstContainer = styled.div`
  padding-top: 1em;
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-left: 3em;
`
const InputSearch = styled.input`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
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
`

const AddStoryButton = styled.input`
  background: #472f6b;
  color: white;
  padding: 5px 10px;
  margin: 0em 2em;
  outline: none;
  border-radius: 15px;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.8em;
  &:hover {
    border: 1px solid #0099cc;
    background-color: #472f6b;
    color: white;
    padding: 5px 10px;
  }
`
const ContainerCards = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
