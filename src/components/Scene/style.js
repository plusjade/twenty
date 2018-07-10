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
  isPresenting: {
    height: '100vh',
    alignItems: "center",
  },
  canEdit: {
    height: '133vw',
    borderBottom: '1px dashed #121212',
  },
  isHorizontal: {
    width: '100vw',
  },
  isFixed: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
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
    transition: 'transform 100ms ease-in',
    transform: 'translateX(100%)',
    zIndex: 1100,
  },
  sceneMenuIsActive: {
    transform: 'translateX(0)',
  },
  boundingSquare: {
    position: 'relative',
    width: '100vw',
    height: '133vw',
  },
  boundingLandscape: {
    width: '75vh',
    height: '100vh',
  },
  boundingIsEditing: {
    border: '1px solid red',
  },
}
