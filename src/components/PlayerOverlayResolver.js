import React                from 'react'
import IconPlay             from 'components/IconPlay'
import Spinner              from 'components/Spinner'
import PlayerOverlay        from 'components/PlayerOverlay'

// states where we want to show an overlay
const OverlayStates = ["error", "loaded", "loading", "notFound"]

const PlayerOverlayResolver = (props) => {
  if (!OverlayStates.includes(props.loadState)) { return null }

  switch (props.loadState) {
    case "loading": {
      return (
        <PlayerOverlay>
          <Spinner/>
        </PlayerOverlay>
      )
    }
    case "loaded": {
      return (
        <PlayerOverlay>
          <IconPlay onClick={props.play} />
        </PlayerOverlay>
      )
    }
    case "notFound": {
      return (
        <PlayerOverlay>
          <span>Not found =(</span>
        </PlayerOverlay>
      )
    }
    case "error": {
      return (
        <PlayerOverlay>
          <span>There was an error</span>
        </PlayerOverlay>
      )
    }
    default: {
      return null
    }
  }
}

export default PlayerOverlayResolver
