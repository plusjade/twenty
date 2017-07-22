import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import PlayerOverlay        from 'components/PlayerOverlay'
import Phone                from 'texting/components/Phone'
import TextingBot           from 'texting/lib/TextingBot'

class TextingScene extends Component {
  constructor(props) {
    super(props)
      this.initialState = this.initialState.bind(this)
      this.resetState = this.resetState.bind(this)
      this.state = this.initialState()
  }

  initialState() {
    return ({
      messages: [],
      typingStatus: undefined,
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  componentDidMount() {
    this.props.mountBot("texting", (
      TextingBot((messages, typingStatus) => {
        this.setState({messages: messages, typingStatus: typingStatus})
      })
    ))
  }

  render() {
    return (
      <PlayerOverlay backgroundColor="#263238">
        <Phone
          messages={this.state.messages}
          typingStatus={this.state.typingStatus}
        />
      </PlayerOverlay>
    )
  }
}

export default TextingScene
