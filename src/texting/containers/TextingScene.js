import React, {Component}   from 'react'

import Layer                from 'components/Layer/Layer'
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
    if (!this.props.isActive) { return null }

    return (
      <Layer backgroundColor="#263238">
        <div style={{
          flex: 1,
          flexGrow: 1,
          alignItems: "stretch",
          alignContent: "stretch",
          height: "100%",
          margin: "auto",
          position: "relative",
          color: "#FFF",
          textAlign: "center",
        }}>
          <Phone
            messages={this.state.messages}
            typingStatus={this.state.typingStatus}
          />
        </div>
      </Layer>
    )
  }
}

export default TextingScene
