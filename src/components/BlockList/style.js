export default {
  wrap: {
    default: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 200ms ease-in-out",
      transform: "translateY(50px) scale(0)",
      transformOrigin: "bottom right",
    },
    active: {
      transform: "translateY(0) scale(1)",
    },
  },
}
