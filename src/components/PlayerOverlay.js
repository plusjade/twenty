import React from 'react'

const PlayerOverlay = (props) => {
  return (
    <div style={{
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 1000,
      backgroundColor: "rgba(0,0,0,0.9)",
    }}>
      <div style={{
        margin: "auto",
        position: "relative",
        top: "50%",
        transform: "perspective(1px) translateY(-50%)",
        color: "#FFF",
        textAlign: "center",
      }}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default PlayerOverlay
