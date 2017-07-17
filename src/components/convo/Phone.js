import React, {Component}   from 'react'
import Bubble               from 'components/convo/Bubble'
import Message              from 'components/convo/Message'
import Typing               from 'components/convo/Typing'

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
    <div style={phone.default} id="phone">

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
