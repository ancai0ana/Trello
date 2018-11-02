import React from 'react'
import Story from './Story'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { lifecycle, compose, withState, withHandlers } from 'recompose'
import Header from './Header'
import StoryDetails from './StoryDetails'
import Selector from './Selector'
var _ = require('lodash')

const MainPage = ({
  users,
  onClick,
  onChange,
  openModal,
  toggleModal,
  searchValue,
  stories = [],
  labelSelector,
  idSelectStory,
  openDetailModal,
  onChangelabelSelector,
  toggleOpenDetailModal,
}) => {
  const userName = ['Nobody']
  _.chain(users)
    .map(item => userName.push(item.name))
    .toArray()
    .value()

  const labelName = ['To Do', 'In progress', 'CR', 'QA', 'Done']
  const fieldStory = ['Title', 'Label', 'Assigned', 'Description']

  return (
    <Container>
      <Header />
      {openModal ? (
        <StoryDetails
          handleClose={toggleModal}
          newStory={true}
          userName={userName}
          labelName={labelName}
        />
      ) : (
        ''
      )}
      <FirstContainer>
        <ColumnFirstContainer>
          <FontAwesomeIcon icon="search" color="#818284" />
        </ColumnFirstContainer>
        <ColumnFirstContainer>
          <InputSearch
            type="text"
            name="search"
            value={searchValue}
            placeholder="Filter search"
            onChange={onChange}
          />
        </ColumnFirstContainer>
        <ColumnFirstContainer>
          <Selector
            value={labelSelector}
            title="labelSelector"
            onChange={onChangelabelSelector}
            labelObj={fieldStory}
          />
        </ColumnFirstContainer>
        <ColumnFirstContainer />
        <ColumnFirstContainer>
          <AddStoryButton
            type="submit"
            value="Add story"
            onClick={toggleModal}
          />
        </ColumnFirstContainer>
      </FirstContainer>
      <ContainerCards>
        {labelName.map((label, index) => (
          <div key={index}>
            <LabelTitle>
              <div>{label}</div>
            </LabelTitle>
            {stories
              .filter(story => story.label === label)
              .filter(story => {
                let field = ''
                switch (labelSelector) {
                  case 'Title':
                    field = story.title
                    break
                  case 'Label':
                    field = story.label
                    break
                  case 'Assigned':
                    field = story.assigned
                    break
                  case 'Description':
                    field = story.description
                    break
                  default:
                    break
                }
                return field.toLowerCase().includes(searchValue)
              })
              .map((story, index) => (
                <Story
                  key={index}
                  id={story._id}
                  title={story.title}
                  label={story.label}
                  assigned={story.assigned}
                  description={story.description}
                  toggleOpenDetailModal={toggleOpenDetailModal(story._id)}
                  openDetailModal={openDetailModal}
                />
              ))}
          </div>
        ))}
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
                userName={userName}
                labelName={labelName}
                assigned={story.assigned}
                comments={story.comments}
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
  withState('labelSelector', 'updateLabelSelector', 'Title'),
  withHandlers({
    onChangelabelSelector: props => event => {
      props.updateLabelSelector(event.target.value)
    },
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

      fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(users => this.setState({ users }))
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
  display: grid;
  grid-template-columns: 1% 29% 10% 45% 15%;
  margin-top: 1em;
  margin-left: 3em;
`
const ColumnFirstContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 0em 2em;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
`
const LabelTitle = styled.div`
  margin: 1.2em 0em;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  color: #4db7b3;
  font-size: 1.4em;
  font-weight: bold;
  display: flex;
  justify-content: center;
`
