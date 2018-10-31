import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  lifecycle,
  compose,
  withState,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose'

const Selector = ({ onChange, label, name, value, labelObj }) => {
  return (
    <div>
      <label>Label :</label>
      <select name={name} value={value} onChange={onChange}>
        {labelObj.map((item,index)=><option value={item.toString()} key={index}>{item}</option>)}
        {/* <option value="select">Select an Option</option>
        <option value="First">First</option>
        <option value="Second">Second</option>
        <option value="Third">Third</option> */}
      </select>
    </div>
  )
}

const enhance = compose()

export default enhance(Selector)
