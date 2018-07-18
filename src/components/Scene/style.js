export default {
  wrap: {
    position: 'relative',
    display: "flex",
    alignItems: "flex-start",

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
    borderBottom: '1px dashed #CCC',
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
    border: '1px dashed red',
  },
  boundingLandscape: {
    border: '1px dashed blue',
    width: '100vh',
    height: '100vh',
  },
}
