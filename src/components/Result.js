import React from 'react'

const Result = (props) => {
  return (
    <div>
      <iframe
        style={{
          width: "100%",
          height: "496px",
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
