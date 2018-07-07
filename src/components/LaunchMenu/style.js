export default {
  default: {
    position: 'fixed',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "transform 180ms ease-in-out",
    transform: 'translateY(100%)',
  },
  isActive: {
    transform: 'translateY(0)',
  },
  verticalWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}
