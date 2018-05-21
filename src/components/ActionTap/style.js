const dimension = '6vh'
const dimensionBigger = '8vh'
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
    height: dimensionBigger,
    width: dimensionBigger,
    lineHeight: dimensionBigger,
    fontSize: "2.5vh",
    border: "2px solid rgba(0, 0, 0, 0.8)",
  },
  disabled: {
    opacity: 0.4,
  },
}
