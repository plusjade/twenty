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

const Phone = (props) => {
  return (
    <div style={phone.default}>

      <div style={convo.default}>
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
