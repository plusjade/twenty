import React from 'react'

const PlayerOverlay = (props) => {
  const backgroundColor = props.backgroundColor || "rgba(0,0,0,0.9)"
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
  style = Object.assign({}, Style.default, props.active ? {} : {})

  return (
    <div style={style}>
      <div style={{
        flex: 1,
        margin: "auto",
        position: "relative",
        color: "#FFF",
        textAlign: "center",
      }}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default PlayerOverlay
