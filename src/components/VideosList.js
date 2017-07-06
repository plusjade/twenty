import React                from 'react'

import StylesWrapper        from 'styles/Wrapper'

const Style = {
  wrap: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: StylesWrapper.navHeight,
    zIndex: 1001,
    backgroundColor: "#111",
    overflow: "auto",
    opacity: 1,
    borderBottom: StylesWrapper.borderFrame,
    borderRadius: "0 0 15px 15px",
  },
  video: {
    color: "inherit",
    padding: "10vh 30px",
    display: "block",
    textDecoration: "none",
    border: StylesWrapper.borderFrame,
    borderTop: 0,
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
    {props.videos.map((v, i) => {
      return (
        <div
          key={i}
          style={{position: "relative"}}
        >
          <a
            style={Style.video}
            href={v.url}
            onClick={(e) => {
              e.preventDefault()
              if (typeof props.onSelect === "function") {
                props.onSelect(v)
              }
            }}
          >
            <span>{v.created_at}</span>
            <br/>
            <span>{` ${v.token} `}</span>
          </a>
        {typeof props.onDelete === "function" && (
          <a
            href="#delete"
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
