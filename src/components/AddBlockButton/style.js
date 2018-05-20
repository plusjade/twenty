export default {
  default: {
    display: "flex",
    flex: "0 0 55vw",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#FFF",
    userSelect: "all",
  },
  inner: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.2vh",
    fontWeight: 600,
    // backgroundColor: "rgba(255,255,255,1)",
    backgroundColor: "#CCFF90",
    color: "#212121",
    textAlign: "center",
    height: "80%",
    margin: "0 5%",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.2)"
  },
  disabled: {
    opacity: 0.4,
  },
}
