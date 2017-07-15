import React, {Component}   from 'react'

const bubble = {
  default: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    borderRadius: "20px",
    display: "inline-block",
    boxSixing: "border-box",
  },
  mine: {
    backgroundColor: "rgba(69, 144, 243, 1)",
    color: "#FFF",
    float: "right",
  },
  yours: {
    backgroundColor: "rgba(229, 231, 234, 1)",
    color: "#000",
    float: "left",
  },

  enter: {
    transition: "all 350ms ease-in-out",
    transform: "scale(0)",
    opacity: 0,
  },
  end: {
    transition: "all 350ms ease-in-out",
    transform: "scale(1)",
    opacity: 1,
  }
}

const bubbleMine = Object.assign({}, bubble.default, bubble.mine)
const bubbleYours = Object.assign({}, bubble.default, bubble.yours)
const bubbleEnter = Object.assign({}, bubbleYours, bubble.enter)
const bubbleEnd = Object.assign({}, bubbleYours, bubble.end)

const Bubble = (props) => {
  let style
  if (props.animate) {
    if (props.status === "loading") {
      style = bubbleEnd
    } else {
      style = bubbleEnter
    }
  } else if (props.type === "yours") {
    style = bubbleYours
  } else {
    style = bubbleMine
  }

  return (
    <div style={style}>
      <div style={{padding: "6px 10px"}}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default Bubble
