export default {
  default: {
    position: "absolute",
    display: 'block',
    width: '100%',
    fontSize: 28,
    boxSizing: "border-box",
    transform: 'translate3d(0)',
    zIndex: 500,
  },
  text: {
    fontSize: "inherit",
    color: "inherit",
    padding: '3vw',
  },
  isStaged: {
    borderTop: '1px dashed #FF4081',
    borderBottom: '1px dashed #FF4081',
  },
  __isSmartCentered: {
    top: '50%',
    right: '50%',
    transform: 'translate3d(50%,-50%, 0)',
    padding: 0,
    width: '90%',
    textAlign: 'center',
  },
}
