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
  },
  inner: {
    backgroundColor: "rgba(255,255,255,1)",
    height: 34,
    width: 34,
    lineHeight: "34px",
    borderRadius: "100%",
    color: "#212121",
    textShadow: "-1px 1px 0 #FFF, 1px 1px 0 #FFF, 1px -1px 0 #FFF, -1px -1px 0 #FFF",
    // border: "1px dotted rgba(0,0,0,0.2)",
  },
  dark: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "rgb(158, 158, 158)",
    textShadow: "-1px 1px 0 #212121, 1px 1px 0 #212121, 1px -1px 0 #212121, -1px -1px 0 #212121",
  },
  bigger: {
    backgroundColor: "Transparent",
    color: "#FFF",
    textShadow: "-1px 1px 0 #212121, 1px 1px 0 #212121, 1px -1px 0 #212121, -1px -1px 0 #212121",
    border: 0,
  },
  disabled: {
    opacity: 0.4,
  },
}
