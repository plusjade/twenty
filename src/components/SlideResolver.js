import React                from 'react'
import IconPlay             from 'components/IconPlay'
import Spinner              from 'components/Spinner'
import PlayerOverlay        from 'components/PlayerOverlay'

const SlideResolver = (props) => {
  switch (props.slide.type) {
    case "title": {
      return (
        <PlayerOverlay backgroundColor="#44a0dd">
          <h1 style={{fontSize: "54px"}}>{props.slide.data}</h1>
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
          <h1>{props.slide.data}</h1>
        </PlayerOverlay>
      )
    }
  }
}

export default SlideResolver
