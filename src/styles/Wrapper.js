const navHeight = 0
const controlsHeight = "5vh"
const borderFrame = 0

const Wrapper = {
  navHeight: navHeight,
  controlsHeight: controlsHeight,
  borderFrame: borderFrame,
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
