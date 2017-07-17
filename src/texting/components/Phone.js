import React                from 'react'
import Bubble               from 'texting/components/Bubble'
import Message              from 'texting/components/Message'
import Typing               from 'texting/components/Typing'

const phone = {
  default: {
    backgroundColor: "#FFF",
    flexGrow: 1,
    height: "100%",
    maxWidth: "375px",
    position: "relative",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    border: 0,
  },
}

const texting = {
  default: {
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0,
  },
}

const Phone = (props) => {
  return (
    <div style={phone.default} id="phone">

      <div style={texting.default}>
      {props.messages.map((message, i) => (
        <Message status={message.status} key={i}>
          <Bubble type={message.type}>
            <span>{message.text}</span>
          </Bubble>
        </Message>
      ))}
      </div>

      <Typing status={props.typingStatus} />
    </div>
  )
}

export default Phone
