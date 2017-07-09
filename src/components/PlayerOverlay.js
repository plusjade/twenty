import React from 'react'

const PlayerOverlay = (props) => {
  const backgroundColor = props.backgroundColor || "rgba(0,0,0,0.9)"
  return (
    <div style={{
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
    }}>
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
