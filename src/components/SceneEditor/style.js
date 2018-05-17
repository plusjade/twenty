export default {
  default: {
    position: "absolute",
    top: 7,
    right: 0,
    zIndex: 999999,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    transition: "all 200ms ease-in-out",
    transform: "translateX(50px) scale(0)",
    transformOrigin: "bottom right",
  },
  active: {
    transform: "translate(0, 0) scale(1)",
  },
  tools: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    transition: "all 200ms ease-in-out",
    transform: "translateX(40px) scale(0)",
    transformOrigin: "right center",
  },
}
