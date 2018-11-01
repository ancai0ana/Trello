import React from 'react'
import { compose } from 'recompose'
import styled from 'styled-components'

const Selector = ({ onChange,title, name, value, labelObj }) => {
  let capitalizeFirstLetter = word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  return (
    <Label>
      <LabelTitle>
        <div>{name ? capitalizeFirstLetter(name)+ ':': ''}</div>
      </LabelTitle>
      <SelectorContainer>
        <SelectorSelect name={name} title={title} value={value} onChange={onChange}>
          {labelObj.map((item, index) => (
            <option value={item.toString()} key={index}>
              {item}
            </option>
          ))}
        </SelectorSelect>
      </SelectorContainer>
    </Label>
  )
}

const enhance = compose()

export default enhance(Selector)

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
const SelectorContainer = styled.div`
  overflow: hidden;
  background: url(http://i62.tinypic.com/2e3ybe1.jpg) no-repeat right center;
  height: 1.8em;
  width: 15em;
`

const SelectorSelect = styled.select`
  background: transparent;
  font-size: 0.9em;
  height: 29px;
  width: 268px;
`
