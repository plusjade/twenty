const navHeight = "7vh"
const controlsHeight = "10vh"
const borderFrame = "5px solid #000"

const Wrapper = {
  navHeight: navHeight,
  controlsHeight: controlsHeight,
  borderFrame: borderFrame,
  navbar: {
    display: "flex",
    backgroundColor: "#212121",
    justifyContent: "left",
    color: "#BDBDBD",
    height: navHeight,
    lineHeight: navHeight,
    alignItems: "center",
    boxSizing: "border-box",
    borderBottom: borderFrame,
    overflow: "hidden",
  },
  libraryLink: {
    color: "inherit",
    padding: "0 20px",
    height: "inherit",
    display: "block",
    textDecoration: "none",
    lineHeight: "inherit",
  },
  library: {
    display: "flex",
    overflow: "auto",
    boxSizing: "border-box",
    color: "#BDBDBD",
  },
  editorResult: {
    position: "absolute",
    left: 0,
    right: 0,
    top: navHeight,
    bottom: controlsHeight,
    display: "flex",
    justifyContent: "center",
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
    borderLeft: borderFrame,
    verticalAlign: "top",
    boxSizing: "border-box",
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    height: controlsHeight,
    lineHeight: controlsHeight,
    alignItems: "center",
    zIndex: 2,
    overflow: "hidden",
    backgroundColor: "#212121",
    boxSizing: "border-box",
    borderTop: borderFrame,
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
