export default {
  default: {
    position: "absolute",
    display: 'block',
    boxSizing: "border-box",
    transform: 'translate3d(0)',
    padding: '5vw',
    lineHeight: '1.5em',
    color: "#FFF",
    fontSize: '2.7vh',
  },
  isStaged: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  textWrap: {
    opacity: 0,
    transition: "opacity 400ms ease-in",
  },
  isActive: {
    opacity: 1,
  },
  __isSmartCentered: {
    top: '50%',
    right: '50%',
    transform: 'translate3d(50%,-50%, 0)',
    padding: 0,
    width: '90%',
  },
}
