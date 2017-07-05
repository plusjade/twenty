import React from 'react'

// http://tobiasahlin.com/spinkit/ <3 <3 <3
const Style = {
  spinner: {
    width: "70px",
    textAlign: "center",
    margin: "auto",
  },
  circles: {
    default: {
      width: "18px",
      height: "18px",
      backgroundColor: "#FFF",
      borderRadius: "100%",
      display: "inline-block",
      "webkitAnimation": "sk-bouncedelay 1.4s infinite ease-in-out both",
      animation: "sk-bouncedelay 1.4s infinite ease-in-out both",
    },
    one: {
      webkitAnimationDelay: "-0.32s",
      animationDelay: "-0.32s",
    },
    two: {
      webkitAnimationDelay: "-0.16s",
      animationDelay: "-0.16s",
    }
  }
}

const Spinner = () => {
  return (
    <div style={Style.spinner}>
      <div style={Object.assign({}, Style.circles.default, Style.circles.one)}/>
      <div style={Object.assign({}, Style.circles.default, Style.circles.two)}/>
      <div style={Style.circles.default}/>
    </div>
  )
}

export default Spinner
