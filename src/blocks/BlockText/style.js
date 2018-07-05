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
  isEditing: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  textWrap: {
    opacity: 0,
    transition: "opacity 400ms ease-in",
  },
  isActive: {
    opacity: 1,
  },
  isSmartCentered: {
    top: '50%',
    right: '50%',
    transform: 'translate(50%,-50%)',
    padding: 0,
    width: '90%',
  },
}
