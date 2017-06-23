import React from 'react'

const Style = {
  wrap: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    right: 0,
    top: "7vh",
    bottom: 0,
    zIndex: 1001,
    backgroundColor: "#222",
    overflow: "auto",
    opacity: 1,
  },
  video: {
    color: "inherit",
    padding: "10vh 30px",
    display: "block",
    textDecoration: "none",
    borderRight: "5px solid #000",
    borderBottom: "5px solid #000",
    textAlign: "center",
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "inherit",
    padding: "20px",
    textDecoration: "none",
  }
}
const VideosList = (props) => {
  const wrap = Object.assign({maxHeight: (props.isOpen ? "1000px" : 0)}, Style.wrap)
  return (
    <div style={wrap}>
    {props.list.map((v, i) => {
      return (
        <div
          key={i}
          style={{position: "relative"}}
        >
          <a
            style={Style.video}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (typeof props.onSelect === "function") {
                props.onSelect(v)
              }
            }}
          >
            {v}
          </a>
        {typeof props.onDelete === "function" && (
          <a
            href="#"
            style={Style.delete}
            onClick={(e) => {
              e.preventDefault()
              props.onDelete(v)
            }}
          >
            X
          </a>
        )}
        </div>
      )
    })}
    </div>
  )
}

export default VideosList
