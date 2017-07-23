import React from 'react'

const IconPlay = (props) => {
  let style = Object.assign(
    {height: 30, width: 30, cursor: "pointer", fill: "#E0E0E0"},
    props.style
  )
  return (
    <svg
      onClick={props.onClick}
      style={style}
      x="0" y="0" viewBox="0 0 20 20" enableBackground="new 0 0 20 20">
      <path d="M2.679,18.436c0,0.86,0.609,1.212,1.354,0.782l14.612-8.437c0.745-0.43,0.745-1.134,0-1.563L4.033,0.782   c-0.745-0.43-1.354-0.078-1.354,0.782V18.436z"/>
    </svg>
  )
}

export default IconPlay
