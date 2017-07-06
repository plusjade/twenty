import React from 'react'

const IconClose = (props) => {
  return (
    <svg
      onClick={props.onClick}
      style={{
        height: 40,
        width: 40,
        cursor: "pointer",
        fill: (props.fill || "#E0E0E0")
      }}
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      enableBackground="new 0 0 100 100"
    >
      <path d="M50,12.4c-20.7,0-37.6,16.9-37.6,37.6S29.3,87.6,50,87.6S87.6,70.7,87.6,50S70.7,12.4,50,12.4z M64.8,59.2l-5.7,5.7L50,55.7  l-9.2,9.2l-5.7-5.7l9.2-9.2l-9.2-9.2l5.7-5.7l9.2,9.2l9.2-9.2l5.7,5.7L55.7,50L64.8,59.2z" />
    </svg>
  )
}

export default IconClose
