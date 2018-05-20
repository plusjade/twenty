export default {
  default: {
    position: "absolute",
    bottom: 0,
    left: 0,
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "auto",
    zIndex: 99999,
    paddingTop: 10,
    transition: "transform 180ms ease-in-out",
    transform: 'translateY(100%)',
  },
  full: {
    top: 0,
    alignItems: "stretch",
    paddingTop: 0,
  },
  isActive: {
    transform: 'translateY(0)',
  },
  clickOut: {
    flex: 1,
    // backgroundColor: "rgba(255,255,255,0.8)",
  },
  actionCardsMenu: {
    default: {
      height: '16vh',
      minWidth: "100vw",
      overflow: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "1px 1px 10px rgba(0,0,0,0.7)",
      backgroundColor: "#304FFE",
    },
  },
}
