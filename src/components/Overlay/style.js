export default {
  default: {
    position: "absolute",
    bottom: 0,
    left: 0,
    minWidth: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    zIndex: 99999,
    transition: "transform 200ms ease-out",
    transform: 'translateY(100%)',
    // backgroundColor: "rgba(255,255,255,0.8)",
  },
  full: {
    top: 0,
  },
  alignTop: {
    alignItems: "flex-start",
  },
  alignBottom: {
    alignItems: "flex-end",
  },
  isActive: {
    transform: 'translateY(0)',
  },
}
