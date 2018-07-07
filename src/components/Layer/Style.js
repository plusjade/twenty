export default {
  default: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    marginTop: 0,
    overflow: "hidden",
    maxHeight: 2000,
    // height: '100vh',
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
