export default {
  default: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "hidden",
    zIndex: 99999,
    transition: "transform 200ms ease-out",
    transform: 'translateY(100%)',
  },
  isActive: {
    transform: 'translateY(0)',
  },
}
