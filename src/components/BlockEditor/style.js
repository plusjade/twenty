export default {
  wrap: {
    default: {
      position: "fixed",
      top: 0,
      right: 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      transition: "all 200ms ease-in-out",
      transform: "translateY(-70px) scale(0)",
      transformOrigin: "top right",
    },
    active: {
      transform: "translateY(7px) scale(1)",
    },
  },
}
