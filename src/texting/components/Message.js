import React    from 'react'

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

function Message(props) {
  function computeStyle() {
    switch (props.status) {
      case "loading": {
        return Object.assign({}, message.default, message.queued)
      }
      case "loaded": {
        return Object.assign({}, message.default, message.end)
      }
      default: {
        return Object.assign({}, message.default, message.enter)
      }
    }
  }

  return (
    <div style={computeStyle()}>
      <div style={{padding: "4px 10px"}}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default Message
