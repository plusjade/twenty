import React from 'react'

const AceEditor = (props) => {
  const Style = {
    default: {
      margin: 0,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: "13px",
    }
  }

  return (
    <div
      style={Style.default}
      ref={props.editorRef}
    >
      {props.code}
    </div>
  )
}

export default AceEditor
