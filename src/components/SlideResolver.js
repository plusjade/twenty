import React                from 'react'
import IconPlay             from 'components/IconPlay'
import Spinner              from 'components/Spinner'
import PlayerOverlay        from 'components/PlayerOverlay'
import Phone                from 'components/convo/Phone'

const Style = {
  default: {
    textAlign: "left",
    fontSize: "54px",
    margin: "auto",
    padding: "0 10px",
    maxWidth: "800px",
  }
}

const SlideResolver = (props) => {
  switch (props.slide.type) {
    case "title": {
      return (
        <PlayerOverlay backgroundColor="#44a0dd" {...props}>
          <h1 style={Style.default}>
            {props.slide.data}
          </h1>
        </PlayerOverlay>
      )
    }
    case "orderedList": {
      return (
        <PlayerOverlay backgroundColor="#44a0dd">
          <ul>
          {props.slide.data.map((line) => <li>{line}</li>)}
          </ul>
        </PlayerOverlay>
      )
    }
    case "image": {
      return (
        <PlayerOverlay backgroundColor="#44a0dd">
          <img src={props.slide.data} style={{width: "80%", height: "auto"}}/>
        </PlayerOverlay>
      )
    }
    case "error": {
      return (
        <PlayerOverlay backgroundColor="#44a0dd">
          <span>There was an error</span>
        </PlayerOverlay>
      )
    }
    default: {
      return (
        <PlayerOverlay backgroundColor="#44a0dd">
          <Phone messages={props.messages} />
        </PlayerOverlay>
      )
    }
  }
}

export default SlideResolver
