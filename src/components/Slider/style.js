const height = '30vh'
const grayscale = value => `hsla(0, 0%, ${value * 10}%, 1)`
const colorscale = value => `hsla(${value * 10}, 100%, 50%, 1)`

const grays = new Array(10).fill(1).map((_, i) => grayscale(i)).reverse()
const colors = new Array(36).fill(1).map((_, i) => colorscale(i))
const backgroundGradients = grays.concat(colors).join(',')

export default {
  wrap: {
    default: {
      position: "relative",
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  inner: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: height,
    boxSizing: "border-box",
    padding: "0 10px",
    lineHeight: "10px",
    color: "#FFF",
  },
  color: {
    background: `-webkit-linear-gradient(${backgroundGradients})`,
    borderRadius: 30,
    border: "1px solid #FFF",
    padding: "10px 0",
  }
}
