export default {
  wrap: {
    flex: 2,
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
      transition: "all 400ms ease-out 200ms",
      transform: "translateX(-100%)",
      // transform: 'scaleY(0)',
      // transformOrigin: 'bottom',
    },
    animate: {
      transform: "translateX(0)",
      // transform: 'scaleY(1)',
    }
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
