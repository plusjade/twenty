import React from 'react'

const Result = (props) => {
  return (
    <div>
      <iframe
        style={{
          width: "100%",
          height: "inherit",
          border: 0,
        }}
        ref={props.resultRef}
        id="output-frame"
        src={props.endpoint}
      />
    </div>
  )
}

export default Result
