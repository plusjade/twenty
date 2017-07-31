export default {
  wrap: {
    default: {
      position: "absolute",
      top: 0,
      bottom: "5vh",
      left: 0,
      right: 0,
      visibility: "hidden",
      display: "flex",
    },
    active: {
      visibility: "visible",
    }
  },
  editor: {
    flex: 4,
    position: "relative",
    verticalAlign: "top",
    boxSizing: "border-box",
  },
  result: {
    flex: 4,
    verticalAlign: "top",
    boxSizing: "border-box",
    backgroundColor: "#E0E0E0",
  },
}
