import React                from 'react'
import IconPlay             from 'components/IconPlay'
import Spinner              from 'components/Spinner'
import PlayerOverlay        from 'components/PlayerOverlay'

// states where we want to show an overlay
const OverlayStates = ["error", "loaded", "loading", "notFound"]

const InitialOverlay = (props) => {
  if (!OverlayStates.includes(props.loadState)) { return null }

  switch (props.loadState) {
    case "loading": {
      return (
        <PlayerOverlay {...props}>
          <Spinner/>
        </PlayerOverlay>
      )
    }
    case "loaded": {
      return (
        <PlayerOverlay  {...props}>
          <IconPlay onClick={props.play} />
        </PlayerOverlay>
      )
    }
    case "notFound": {
      return (
        <PlayerOverlay  {...props}>
          <span>Not found =(</span>
        </PlayerOverlay>
      )
    }
    case "error": {
      return (
        <PlayerOverlay  {...props}>
          <span>There was an error</span>
        </PlayerOverlay>
      )
    }
    default: {
      return null
    }
  }
}

export default InitialOverlay
