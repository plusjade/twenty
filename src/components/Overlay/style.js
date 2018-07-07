export default {
  default: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "auto",
    zIndex: 200,
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
}
