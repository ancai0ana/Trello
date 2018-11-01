import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import Selector from './Selector'

const AddComment = ({ userName, onChangeComment, comment }) => {
  return (
    <Container>
      <Selector
        name="Name"
        title="name"
        value={comment.name}
        onChange={onChangeComment}
        labelObj={userName}
      />
      <Input>
        <InputDescription
          type="text"
          title="text"
          value={comment.text}
          onChange={onChangeComment}
        />
      </Input>
    </Container>
  )
}

const enhance = compose()
export default enhance(AddComment)

const Container = styled.div``
const Input = styled.div`
  margin: 4% 15%;
`

const InputDescription = styled.textarea`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;

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
