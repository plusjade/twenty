import React from 'react'

const PlayerOverlay = (props) => {
  const backgroundColor = props.backgroundColor || "rgba(0,0,0,0.2)"
  const Style = {
    default: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
      opacity: 1,
      marginTop: 0,
      overflow: "hidden",
      maxHeight: "2000px",
      transition: "all 500ms ease-in",
    },
    animate: {
      opacity: 0,
      maxHeight: 0,
    },
  }

  let style = Style.default
  style = Object.assign({}, Style.default, props.style, props.active ? {} : {})

  return (
    <div style={style} onClick={props.onClick}>
      {React.Children.only(props.children)}
    </div>
  )
}

export default PlayerOverlay
