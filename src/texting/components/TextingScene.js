import React                from 'react'
import PropTypes            from 'prop-types'

import PlayerOverlay        from 'components/PlayerOverlay'
import Phone                from 'texting/components/Phone'

function TextingScene(props) {
  return (
    <PlayerOverlay backgroundColor="#263238">
      <Phone
        messages={props.messages || []}
        typingStatus={props.typingStatus}
      />
    </PlayerOverlay>
  )
}

TextingScene.propTypes = {
  typingStatus: PropTypes.bool,
}

export default TextingScene
