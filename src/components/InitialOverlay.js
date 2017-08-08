import React                from 'react'
import IconPlay             from 'components/IconPlay'
import Spinner              from 'components/Spinner'
import Layer                from 'components/Layer/Layer'

// states where we want to show an overlay
const OverlayStates = ["error", "loaded", "loading", "notFound"]

const InitialOverlay = (props) => {
  if (!OverlayStates.includes(props.loadState)) { return null }

  switch (props.loadState) {
    case "loading": {
      return (
        <Layer {...props}>
          <Spinner/>
        </Layer>
      )
    }
    case "loaded": {
      return (
        <Layer  {...props} onClick={props.play}>
          <IconPlay style={{height: 80, width: 80}}/>
        </Layer>
      )
    }
    case "notFound": {
      return (
        <Layer  {...props}>
          <span>Not found =(</span>
        </Layer>
      )
    }
    case "error": {
      return (
        <Layer  {...props}>
          <span>There was an error</span>
        </Layer>
      )
    }
    default: {
      return null
    }
  }
}

export default InitialOverlay
