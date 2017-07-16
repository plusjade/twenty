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
    bottom: "5px",
    left: 0,
    right: 0,
  },
}

class Phone extends Component {
  constructor(props) {
    super(props)

    this.lastMessage = this.lastMessage.bind(this)
    this.state = {
      entropyKey: Math.random()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length !== this.props.messages.length) {
      console.log('changing')

      this.setState({status: "NOOP"})
      const lastMessage = this.lastMessage(nextProps)

      if (lastMessage) {
        if (lastMessage.type === "theirs") {
          setTimeout(() => {
            this.setState({status: "loading"})
          }, 100)
          setTimeout(() => {
            this.setState({status: "loaded"})
          }, 2000)
        } else {
          setTimeout(() => {
            this.setState({status: "loaded"})
          }, 300)
        }
      }
    }
  }

  lastMessage(props) {
    if (!props) {
      props = this.props
    }
    const lastIndex = props.messages.length - 1
    if (props.messages[lastIndex]) {
      return props.messages[lastIndex]
    } else {
      return {}
    }
  }

  componentDidMount() {
    console.log("hi mounted")
  }

  render() {
    const lastIndex = this.props.messages.length - 1
    const lastMessage = this.lastMessage()
    let typingStatus = lastMessage.type === "theirs"
                          ? this.state.status
                          : "NOOP"
    return (
      <div style={phone.default}>
        <div style={convo.default}>
        {this.props.messages.map((message, i) => (
          <Message
            key={i}
            status={lastIndex === i ? this.state.status : "loaded" }
            animate={true}
            >
            <Bubble type={message.type} >
              <span>{message.text}</span>
            </Bubble>
          </Message>
        ))}
        </div>

        <Typing status={typingStatus} />
      </div>
    )
  }
}

export default Phone
