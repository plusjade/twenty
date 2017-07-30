const controlsHeight = "5vh"
export default {
  sliderWrap: {
    position: "absolute",
    top: "1vh",
    bottom: 0,
    right: 0,
    left: 0,
  },
  wrap: {
    position: "relative",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "#232323",
    height: controlsHeight,
    lineHeight: controlsHeight,
  },
  one: {
    flex: 10,
    boxSizing: "border-box",
    padding: "0 10px",
    lineHeight: "10px",
    color: "#FFF",
  },
  three: {
    flex: 1,
    boxSizing: "border-box",
    padding: "0 5px",
    color: "#FFF",
    textAlign: "right"
  },
  rangeInput: {
    width: "100%"
  },
  libraryLink: {
    flex: 1,
    color: "inherit",
    height: "inherit",
    display: "block",
    textDecoration: "none",
    lineHeight: "inherit",
  },
}
