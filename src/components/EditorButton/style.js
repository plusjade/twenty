export default {
  default: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 7px 7px 7px",
    textAlign: "center",
    fontSize: "2.2vh",
    fontWeight: 600,
    borderRadius: 50,
    color: "#212121",
    textShadow: "-1px 1px 0 #FFF, 1px 1px 0 #FFF, 1px -1px 0 #FFF, -1px -1px 0 #FFF",
  },
  inner: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 34,
    width: 34,
    lineHeight: "34px",
    borderRadius: "100%",
    // border: "1px dotted rgba(0,0,0,0.2)",
  },
  bigger: {
    backgroundColor: "Transparent",
    color: "#FFF",
    textShadow: "-1px 1px 0 #212121, 1px 1px 0 #212121, 1px -1px 0 #212121, -1px -1px 0 #212121",
    border: 0,
  },
  disabled: {
    opacity: 0.4,
  }
}
