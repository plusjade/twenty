import React                from 'react'
import PropTypes            from 'prop-types'

function Result (props) {
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
        ref={props.resultRendererRef}
        id="output-frame"
        src={props.endpoint}
        title="code result output"
      />
    </div>
  )
}

Result.propTypes = {
  endpoint: PropTypes.string.isRequired,
  resultRendererRef: PropTypes.func.isRequired,
}

export default Result
