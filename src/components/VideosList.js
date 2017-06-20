import React from 'react'

const VideosList = (props) => {
  return (
    <ul style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
    }}>
    {props.list.map((v, i) => {
      return (
        <li key={i}>
          <a
            style={{
              color: "inherit",
              padding: "10px 20px",
              display: "block",
              borderBottom: "1px solid #555",
              textDecoration: "none",
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
        </li>
      )
    })}
    </ul>
  )
}

export default VideosList
