export default {
  wrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  question: {
    default: {
      color: "#FFF",
      display: 'inline-block',
      fontSize: 22,
      backgroundColor: "#212121",
      padding: '20px 40px 20px 20px',
      margin: 0,
    },
  },
  button: {
    default: {
      margin: "0 auto 25px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      width: 120,
      height: 120,
      textAlign: "center",
      // border: "1px solid #9E9E9E",
      border: "none",
      borderRadius: 120,
      fontSize: 60,
      backgroundColor: "#FFF",
      cursor: "pointer",
      outline: 0,
    },
    animate: {
      animationDuration: '1.5s',
      animationName: 'grow',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
    },
  }
}
