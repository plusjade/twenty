import React                from 'react'

const style = {
  default: {
    flex: 1,
    color: "inherit",
    display: "block",
    textDecoration: "none",
    height: "inherit",
    lineHeight: "inherit",
  }
}

const NewRecording = (props) => {
  return (
    <a
      href="#newRecording"
      style={style.default}
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
