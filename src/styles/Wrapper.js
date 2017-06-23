const navHeight = "7vh"
const controlsHeight = "10vh"
const borderFrame = "3px solid #212121"

const Wrapper = {
  navHeight: navHeight,
  controlsHeight: controlsHeight,
  borderFrame: borderFrame,
  navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    color: "#BDBDBD",
    height: navHeight,
    lineHeight: navHeight,
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "hidden",
    textAlign: "center",
  },
  libraryLink: {
    flex: 1,
    color: "inherit",
    height: "inherit",
    display: "block",
    textDecoration: "none",
    lineHeight: "inherit",
  },
  recordingLink: {
    flex: 1,
    color: "inherit",
    display: "block",
    textDecoration: "none",
    height: "inherit",
    lineHeight: "inherit",
  },
  library: {
    display: "flex",
    overflow: "auto",
    boxSizing: "border-box",
    color: "#9E9E9E",
  },
  editorResult: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: "17vh",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    border: borderFrame,
    borderBottom: 0,
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
    bottom: navHeight,
    display: "flex",
    justifyContent: "center",
    height: controlsHeight,
    lineHeight: controlsHeight,
    alignItems: "center",
    zIndex: 2,
    overflow: "hidden",
    backgroundColor: "#232323",
    boxSizing: "border-box",
    borderRadius: "0 0 15px 15px",
    border: borderFrame,
  },
  controlsInner: {
    wrap: {
      flex: 1,
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: "inherit",
    },
    one: {
      boxSizing: "border-box",
      padding: "0 10px",
      marginRight: "auto",
      lineHeight: "10px",
    },
    two: {
      flex: 8,
      boxSizing: "border-box",
      padding: "0 10px",
    },
    three: {
      boxSizing: "border-box",
      padding: "0 10px",
      color: "#FFF",
      marginLeft: "auto",
    },
    rangeInput: {
      width: "100%"
    }
  }

}
export default Wrapper
