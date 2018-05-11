export default {
  default: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    transition: "all 200ms ease-in-out",
    transform: "translateY(85px) scale(0)",
    transformOrigin: "bottom right",
  },
  active: {
    transform: "translateY(0) scale(1)",
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
