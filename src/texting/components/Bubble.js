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
    textAlign: "left",
  },
  mine: {
    backgroundColor: "rgba(69, 144, 243, 1)",
    color: "#FFF",
    float: "right",
  },
  theirs: {
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

const mine = Object.assign({}, bubble.default, bubble.mine)
const yours = Object.assign({}, bubble.default, bubble.theirs)
const enter = Object.assign({}, yours, bubble.enter)
const end = Object.assign({}, yours, bubble.end)

const Bubble = (props) => {
  let style
  if (props.animate) {
    if (props.status === "loading") {
      style = end
    } else {
      style = enter
    }
  } else if (props.type === "theirs") {
    style = yours
  } else {
    style = mine
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
