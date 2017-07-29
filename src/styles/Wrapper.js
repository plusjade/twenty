const navHeight = 0
const controlsHeight = "5vh"
const borderFrame = 0

const Wrapper = {
  navHeight: navHeight,
  controlsHeight: controlsHeight,
  borderFrame: borderFrame,
  recordingLink: {
    flex: 1,
    color: "inherit",
    display: "block",
    textDecoration: "none",
    height: "inherit",
    lineHeight: "inherit",
  },
  editorResult: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: controlsHeight,
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    border: 0,
  },
  editor: {
    flex: 4,
    height: "inherit",
    position: "relative",
    verticalAlign: "top",
    boxSizing: "border-box",
  },
  result: {
    flex: 4,
    height: "inherit",
    verticalAlign: "top",
    boxSizing: "border-box",
    backgroundColor: "#E0E0E0",
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflow: "visible",
    boxSizing: "border-box",
  },
}
export default Wrapper
