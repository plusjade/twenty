export default {
  wrap: {
    default: {
      position: "fixed",
      bottom: -85,
      left: 0,
      right: 0,
      zIndex: 21,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 200ms ease-in-out",
    },
    active: {
      bottom: 0,
    }
  },
}
