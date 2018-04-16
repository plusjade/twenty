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
      textAlign: "center",
    },
  },
  button: {
    default: {
      margin: "0 auto 15px",
      display: "block",
      padding: "15px 10px",
      textAlign: "center",
      border: "none",
      borderRadius: 10,
      maxWidth: 400,
      width: "95%",
      fontSize: 20,
      backgroundColor: "#FFF",
      cursor: "pointer",
      transition: "all 100ms ease-in-out",
      boxShadow: "4px 5px #616161",
      outline: 0,
    },
    active: {
      boxShadow: "4px 5px rgba(0,0,0,0)",
      transform: "translate(5px, 4px)",
    }
  }
}
