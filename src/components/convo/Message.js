import React, {Component}   from 'react'

const message = {
  default: {
    margin: "4px 10px",
    overflow: "auto",
    position: "relative",
  },
  queued: {
    transition: "all 300ms ease-out",
    maxHeight: "35px",
    opacity: 0,
    transform: "scaleY(0.9)"
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
      {React.Children.only(props.children)}
    </div>
  )
}

export default Message
