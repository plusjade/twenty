export default {
  default: {
    position: "absolute",
    bottom: 115,
    right: 0,
    zIndex: 999999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    transition: "all 200ms ease-in-out",
    transform: "translateX(50px) scale(0)",
    transformOrigin: "bottom right",
  },
  active: {
    transform: "translateX(0) scale(1)",
  },
  tools: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    transition: "all 200ms ease-in-out",
    transform: "translateY(30px) scale(0)",
    transformOrigin: "bottom center",
  },
}
