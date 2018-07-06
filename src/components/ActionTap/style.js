const dimensionSmaller = '5vh'
const dimension = '5.5vh'
const dimensionBigger = '7vh'

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
    boxShadow: "rgba(0, 0, 0, 0.3) 1px 1px 5px",
    zIndex: 9999999,
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
  smaller: {
    height: dimensionSmaller,
    width: dimensionSmaller,
    lineHeight: dimensionSmaller,
    fontSize: "2.1vh",
  },
  disabled: {
    opacity: 0.4,
  },
}
