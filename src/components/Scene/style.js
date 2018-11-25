export default {
  wrap: {
    position: 'relative',
    display: "flex",
    alignItems: "flex-start",
    flexDirection: 'column',
    justifyContent: "center",
    // alignItems: "center",
    opacity: 1,
    marginTop: 0,
    overflow: 'hidden',
  },
  // TODO: consider diferentiating presenting vs normal scrolling/browsing
  isPresenting: {
    // height: '100vh',
    // alignItems: "center",
  },
  canEdit: {
    height: '100vw',
  },
  landscape: {
    height: '100vh',
  },

  isHorizontal: {
    width: '100vw',
  },
  isActive: {
    opacity: 1,
  },
  isHidden: {
    // opacity: 0,
    // pointerEvents: 'none',
  },
  sceneMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1100,
  },
  boundingSquare: {
    position: 'relative',
    width: '100vw',
    height: '100vw',
    boxSizing: 'border-box',
    borderBottom: '6px solid #EEE',
  },
  boundingLandscape: {
    width: '100vh',
    height: '100vh',
  },
  isDebug: {
    border: '1px dashed red',
  },
  dateString: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1100,
    padding: 15,
    fontSize: 12,
    color: 'rgb(66, 66, 66)',
  },
}
