export default {
  wrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999999999,
    transition: "all 300ms ease",
    borderRadius: 15,
    transform: "translateY(110%)",
    backgroundColor: "#FFF",
    minHeight: '18vh',
  },
  isActive: {
    transition: "all 300ms ease",
    transform: "translateY(0)",
  },
}
