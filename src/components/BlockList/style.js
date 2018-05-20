export default {
  wrap: {
    default: {
      height: '20vh',
      minWidth: "100vw",
      overflow: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      transition: "all 200ms ease-in-out",
      transform: "translateY(50px) scale(0)",
      transformOrigin: "bottom right",
      // backgroundColor: "rgba(255,255,255,0.1)",
    },
    active: {
      transform: "translateY(0) scale(1)",
    },
  },
}
