const dimension = '6vh'
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
    height: dimension,
    width: dimension,
    lineHeight: dimension,
    borderRadius: "100%",
    color: "#212121",
    textShadow: "-1px 1px 0 #FFF, 1px 1px 0 #FFF, 1px -1px 0 #FFF, -1px -1px 0 #FFF",
  },
  dark: {
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.8)",
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
