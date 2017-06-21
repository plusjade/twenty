import React from 'react'

const VideosList = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        position: "absolute",
        left: 0,
        right: 0,
        top: "8vh",
        zIndex: 1000,
        backgroundColor: "#222",
        overflow: "auto",
        opacity: 0.9,
        maxHeight: (props.isOpen ? "1000px" : 0),
      }}
    >
    {props.list.map((v, i) => {
      return (
        <div
          key={i}
        >
          <a
            style={{
              color: "inherit",
              padding: "10vh 30px",
              display: "block",
              textDecoration: "none",
              border: "3px solid #444",
              borderLeft: 0,
            }}
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
            style={{float: "right", color: "inherit"}}
            onClick={(e) => {
              e.preventDefault()
              props.onDelete(v)
            }}
          >
            [x]
          </a>
        )}
        </div>
      )
    })}
    </div>
  )
}

export default VideosList
