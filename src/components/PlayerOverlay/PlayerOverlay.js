import Radium from 'radium'
import React from 'react'

import style from './Style'

const PlayerOverlay = (props) => {
  return (
    <div
      style={[style.default, props.style]}
      onClick={props.onClick}
    >
      {React.Children.only(props.children)}
    </div>
  )
}

export default Radium(PlayerOverlay)
