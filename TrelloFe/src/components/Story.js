import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

const Story = ({
  id,
  label,
  title,
  assigned,
  description,
  openDetailModal,
  handleClickStory,
  toggleOpenDetailModal,
}) => {
  let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <Container>
      <Button onClick={toggleOpenDetailModal}>
        <Title>{capitalizeFirstLetter(title)}</Title>
        <NoteText>
          <Label>Label : {label}</Label>
          <Label>Assigned : {assigned}</Label>
        </NoteText>
      </Button>
    </Container>
  )
}

const enhance = compose()

export default enhance(Story)

const Container = styled.div`
  background: white;
  width: 13em;
  height: 14em;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0.5em;
  margin-bottom: 2em;
  padding-bottom: 1em;
`
const Button = styled.button`
  background-color: Transparent;
  outline: none;
  border: none;
  width: 100%;
  height: 95%;
`
const Title = styled.div`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  padding-top: 1em;
  margin-bottom: 1em;
  text-align: center;
  color: #472f6b;
  font-size: 1.8em;
`
const NoteText = styled.div`
  max-width: 100%;
  font-size: 1.2em;
`
const Label = styled.div`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  padding: 0em 1em;
  color: #727272;
  font-size: 1.1em;
  word-wrap: break-word;
  max-width: 90%;
`
