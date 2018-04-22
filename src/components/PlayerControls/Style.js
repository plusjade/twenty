const controlsHeight = "10vh"
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
      alignItems: "center",
      backgroundColor: "rgba(33,33,33,0.3)",
      height: controlsHeight,
      lineHeight: controlsHeight,
    },
  },
  one: {
    flex: 1,
    boxSizing: "border-box",
    padding: "0 10px",
    lineHeight: "10px",
    color: "#FFF",
  },
  playToggle: {
    default: {
      position: "absolute",
      bottom: "1vh",
      left: 0,
      right: 10,
      textAlign: "right",
      color: "#FFF",
      transform: "translateY(1vh)",
      transition: "transform 300ms ease-in-out",
    },
    active: {
      transform: "translateY(0)",
    },
    icon: {
      fill: "#FEFEFE",
      stroke: "#333",
    }
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
