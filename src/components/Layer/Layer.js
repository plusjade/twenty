import Radium from 'radium'
import React from 'react'

import style from './Style'

const Layer = (props) => {
  return (
    <div
      style={[
        style.default,
        props.style,
        props.isHidden && style.hidden
      ]}
      onClick={props.onClick}
    >
      {React.Children.only(props.children)}
    </div>
  )
}

export default Radium(Layer)
