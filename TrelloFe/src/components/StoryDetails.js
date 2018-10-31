import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  lifecycle,
  compose,
  withState,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose'
import Selector from './Selector'

const StoryDetails = ({
  handleClose,
  onChangeLabelAssigned,
  title,
  label,
  assigned,
  description,
  onChange,
  onCreateStory,
  onEditStory,
  newStory,
  id,
}) => {
  const labelName = ['To Do', 'In progress', 'CR', 'QA', 'Done']
  return (
    <Container>
      <Content>
        <Icon>
          <FontAwesomeIcon icon="times" color="#818284" onClick={handleClose} />
        </Icon>
        <Label>
          <LabelTitle>
            <div>Title:</div>
          </LabelTitle>
          <div>
            <Input type="text" name="title" value={title} onChange={onChange} />
          </div>
        </Label>

        {/* <Label>
          <LabelTitle>
            <div>Label:</div>
          </LabelTitle>
          <Input type="text" name="label" value={label} onChange={onChange} />
        </Label> */}
        <Selector name="label" value={label} onChange={onChange} labelObj={labelName}/>

        <Label>
          <LabelTitle>
            <div>Assigned to:</div>
          </LabelTitle>
          <Input
            type="text"
            name="assigned"
            value={assigned}
            onChange={onChange}
          />
        </Label>

        <Label>
          <LabelTitle>
            <div>Description:</div>
          </LabelTitle>
          <InputDescription
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          />
        </Label>

        {newStory ? (
          <SubmitButton
            type="submit"
            value="Add story"
            onClick={onCreateStory}
          />
        ) : (
          <SubmitButton
            type="submit"
            value="Edit story"
            onClick={onEditStory}
          />
        )}
      </Content>
    </Container>
  )
}

const enhance = compose(
  withStateHandlers(
    ({
      title = '',
      label = '',
      assigned = '',
      description = '',
      comments = [],
    }) => ({
      title: title,
      label: label,
      assigned: assigned,
      description: description,
      comments: comments,
    }),
    {
      onChange: (state, props) => event => ({
        [event.target.name]: event.target.value,
      }),
      onCreateStory: (state, props) => event => {
        props.handleClose()
        fetch('stories/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        })
      },
      onEditStory: (state, props) => event => {
        fetch('stories/' + props.id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        })
      },
    },
  ),
)

export default enhance(StoryDetails)

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`
const Content = styled.div`
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  border-radius: 8px;
`
const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Label = styled.div`
  margin: 4% 15%;
`
const LabelTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1% 0%;
  color: #472f6b;
  font-size: 1.2em;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
`

const Input = styled.input`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 100%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em;
`

const InputDescription = styled.textarea`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 100%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em;
  height: 5em;
`

const SubmitButton = styled.input`
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
