import React, {Component}   from 'react'
import Bubble               from 'components/convo/Bubble'
import TypingCircles          from 'components/convo/TypingCircles'

const message = {
  enter: {
    transition: "all 300ms ease-out",
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  end: {
    transition: "all 300ms ease-out",
    maxHeight: "1000px",
    opacity: 1,
    transform: "scaleY(1)"
  }
}

// Todo: Consolidate with <Message/>
const Typing = (props) => {
  const messageStyle = Object.assign(
      {},
      (props.status === "loading" ? message.end : message.enter),
      {
        position: "absolute",
        bottom: 0, left: 0,
        right: 0,
        margin: "4px 10px",
        overflow: "auto",
      }
    )

  return (
    <div style={messageStyle}>
      <Bubble type="yours" status="loading" animate={true}>
        <TypingCircles />
      </Bubble>
    </div>
  )
}

export default Typing
