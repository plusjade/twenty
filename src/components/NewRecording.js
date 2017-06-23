import React from 'react'

const NewRecording = (props) => {
  return (
    <a
      href="#"
      style={{
        color: "inherit",
        padding: "0 20px",
        display: "block",
        textDecoration: "none",
        marginLeft: "auto",
        height: "inherit",
        lineHeight: "inherit",
      }}
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
