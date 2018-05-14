export default {
  authContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#BBDEFB",
    transition: "all 200ms ease-in-out",
    transform: "translateY(-100%)",
    zIndex: 99,
  },
  isActive: {
    transform: "translateY(0)",
  },
  inner: {
    padding: "80px 10px 10px 10px",
    boxSizing: "border-box",
  },
  toggleIcon: {
    top: 0,
    right: 0,
    padding: 10,
    position: "fixed",
    zIndex: 100,
    fontSize: 22,
  },
  logOut: {
    marginTop: 20,
    height: 34,
    padding: '0 10px',
    display: "block",
    fontSize: 10,
    lineHeight: "12px",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "#F44336",
    // color: "#9E9E9E",
    color: "#FFF",
    border: "1px solid #FFF",
  }
}
