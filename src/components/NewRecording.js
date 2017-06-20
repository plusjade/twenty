import React from 'react'

const NewRecording = (props) => {
  return (
    <a
      href="#"
      style={{
        color: "inherit",
        padding: "10px 20px",
        display: "block",
        borderBottom: "1px solid #555",
        textDecoration: "none",
      }}
      onClick={(e) => {
        e.preventDefault()
        props.onClick()
      }}
    >
      New recording
    </a>
  )
}

export default NewRecording
