const controlsHeight = "7vh"
export default {
  controls: {
    default: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      boxSizing: "border-box",
      transform: `translateY(${controlsHeight})`,
      transition: "transform 200ms ease-in-out",
    },
    active: {
      transform: "translateY(0)",
    }
  },
  wrap: {
    default: {
      position: "relative",
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      backgroundColor: "rgba(33,33,33,0.8)",
      height: controlsHeight,
      lineHeight: controlsHeight,
    },
  },
  sliderWrap: {
    position: "absolute",
    top: "1vh",
    bottom: 0,
    right: 0,
    left: 0,
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
