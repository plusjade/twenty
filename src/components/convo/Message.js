import React, {Component}   from 'react'

const message = {
  default: {
    overflow: "auto",
    position: "relative",
    transition: "all 300ms ease-out",
    maxHeight: "300px",
  },
  queued: {
    maxHeight: "35px",
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  enter: {
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  end: {
    maxHeight: "300px",
    opacity: 1,
    transform: "scaleY(1)"
  }
}

const Message = (props) => {
  let style
  if (props.animate) {
    if (props.status === "loading") {
      style = Object.assign({}, message.default, message.queued)
    } else if (props.status === "loaded") {
      style = Object.assign({}, message.default, message.end)
    } else {
      style = Object.assign({}, message.default, message.enter)
    }
  } else {
    style = message.default
  }

  return (
    <div style={style}>
      <div style={{padding: "4px 10px"}}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default Message
