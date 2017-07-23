import React                from 'react'

import Style                from './Style'

function VideosList(props) {
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
