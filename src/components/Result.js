import React from 'react'

const Result = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <iframe
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        ref={props.resultRef}
        id="output-frame"
        src={props.endpoint}
        title="code result output"
      />
    </div>
  )
}

export default Result
