import React, {Component}   from 'react'
import Bubble               from 'components/convo/Bubble'
import TypingCircles        from 'components/convo/TypingCircles'

const message = {
  default: {
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0,
    overflow: "auto",
  },
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
      message.default,
      (props.status === "loading" ? message.end : message.enter),
    )

  return (
    <div style={messageStyle}>
      <div style={{padding: "4px 10px"}}>
        <Bubble
          type="theirs"
          status={props.status}
          animate={true}
        >
          <TypingCircles />
        </Bubble>
      </div>
    </div>
  )
}

export default Typing
