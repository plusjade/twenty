export default {
  default: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    marginTop: 0,
    overflow: "hidden",
    maxHeight: 2000,
  },
  hidden: {
    maxHeight: 0,
  },
  animate: {
    transition: "all 500ms ease-in",
    opacity: 0,
    maxHeight: 0,
  },
}
