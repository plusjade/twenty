import React   from 'react'

const TypingCircles = () => {
  const loading = {
    circles: {
      default: {
        display: "inline-block",
        height: "8px",
        width: "8px",
        borderRadius: "8px",
        backgroundColor: "#CCC",
        margin: "0 2px",
        WebkitAnimation: "sk-flow 800ms infinite ease-in-out both",
        animation: "sk-flow 1000ms infinite ease-in-out both",
      },
      one: {
        WebkitAnimationDelay: "-0.32s",
        animationDelay: "-0.32s",
      },
      two: {
        WebkitAnimationDelay: "-0.16s",
        animationDelay: "-0.16s",
      },
    },
  }
  const one = Object.assign({}, loading.circles.default, loading.circles.one)
  const two = Object.assign({}, loading.circles.default, loading.circles.two)

  return (
    <div>
      <div style={one} />
      <div style={two} />
      <div style={loading.circles.default} />
    </div>
  )
}

export default TypingCircles
