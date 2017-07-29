import Radium from 'radium'
import React from 'react'

const IconPause = (props) => {
  return (
    <svg
      onClick={props.onClick}
      x="0px"
      y="0px"
      viewBox="0 0 90 112.5"
      style={[
        {
          height: 30,
          width: 30,
          cursor: "pointer",
          fill: "#E0E0E0",
          margin: "auto",
        },
        props.style
      ]}
    >
      <g transform="translate(0,-962.36218)">
        <rect width="23" height="80" x="16.667517" y="967.81653" stroke="none"/>
        <rect y="967.81653" x="50.760166" height="80" width="23" stroke="none"/>
      </g>
    </svg>
  )
}

export default Radium(IconPause)
