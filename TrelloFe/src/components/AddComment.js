import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'
import Selector from './Selector'
const AddComment = (userName) => {
  return (
    // {/* <Selector
    //       name="assigned"
    //       value={"anca"}
    //       onChange={onChange}
    //       labelObj={userName}
    //     /> */}
    <InputDescription
      type="text"
      // name="description"
      // value={description}
      // onChange={onChange}
    />

  )
}

const enhance = compose()
export default enhance(AddComment)

const Container = styled.div`
  margin: 4% 15%;
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
