import Radium from 'radium'
import React from 'react'

// http://tobiasahlin.com/spinkit/ <3 <3 <3
const style = {
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
      "WebkitAnimation": "sk-flow 1.4s infinite ease-in-out both",
      animation: "sk-flow 1.4s infinite ease-in-out both",
    },
    one: {
      WebkitAnimationDelay: "-0.32s",
      animationDelay: "-0.32s",
    },
    two: {
      WebkitAnimationDelay: "-0.16s",
      animationDelay: "-0.16s",
    }
  }
}

const Spinner = () => {
  return (
    <div style={style.spinner}>
      <div style={[style.circles.default, style.circles.one]}/>
      <div style={[style.circles.default, style.circles.two]}/>
      <div style={style.circles.default}/>
    </div>
  )
}

export default Radium(Spinner)
