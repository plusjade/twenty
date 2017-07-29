export default {
  default: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    marginTop: 0,
    overflow: "hidden",
    maxHeight: "2000px",
    transition: "all 500ms ease-in",
    backgroundColor: "transparent",
  },
  animate: {
    opacity: 0,
    maxHeight: 0,
  },
}
