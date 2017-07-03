import React                from 'react'
import StylesWrapper        from 'styles/Wrapper'

const NewRecording = (props) => {
  return (
    <a
      href="#"
      style={StylesWrapper.recordingLink}
      onClick={(e) => {
        e.preventDefault()
        props.onClick()
      }}
    >
      Record
    </a>
  )
}

export default NewRecording
