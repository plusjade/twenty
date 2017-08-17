import Radium   from 'radium'
import React    from 'react'

const dimension = 60
const style = {
  css: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  svg: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    bottom: 0,
    left: -(dimension / 2),
    color: "#FFF",
    height: dimension,
    width: dimension,
    lineHeight: `${dimension}px`,
    fontSize: dimension,
    fontWeight: "bold",
    opacity: 0,
  }
}

function Emoji(props) {
  return (
    <div
      style={style.css}
      ref={props.refContainerCallback}
    >
      <div
        ref={props.refEmojiCallback}
        style={[style.text, props.style]}
      >
        <span>😬</span>
      </div>
    </div>
  )
}
// 🤓
export default Radium(Emoji)
