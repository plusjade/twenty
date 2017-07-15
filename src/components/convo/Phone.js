import React, {Component}   from 'react'
import Bubble               from 'components/convo/Bubble'
import Message              from 'components/convo/Message'
import Typing               from 'components/convo/Typing'

const phone = {
  default: {
    backgroundColor: "#FFF",
    width: "375px",
    height: "667px",
    margin: "auto",
    position: "relative",
  },
}

const convo = {
  default: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
}

class Phone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entropyKey: Math.random()
    }
  }

  componentDidMount() {
    console.log("hi mounted")
    setTimeout(() => {
      this.setState({status: "loading"})
    }, 1000)
    setTimeout(() => {
      this.setState({status: "loaded"})
    }, 2500)
  }

  render() {
    const messages = [
      {
        text: "Hello",
        type: "mine",
      },
      {
        text: "Hi there!",
        type: "yours",
      },
      {
        text: "What time did you wake up today?",
        type: "yours",
      },
      {
        text: "...uhhhhhhh",
        type: "mine",
      },
      {
        text: "not really sure 😴",
        type: "mine",
      },

    ]
    return (
      <div style={phone.default}>
        <div style={convo.default}>
        {messages.map((message, i) => (
          <Message key={i}>
            <Bubble type={message.type}>
              <span>{message.text}</span>
            </Bubble>
          </Message>
        ))}
          <Message status={this.state.status} animate={true}>
            <Bubble type="yours">
              <span>Are you going tomorrow?</span>
            </Bubble>
          </Message>
        </div>

        <Typing status={this.state.status} />
      </div>
    )
  }
}

export default Phone
