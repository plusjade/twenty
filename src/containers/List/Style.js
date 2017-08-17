export default {
  li: {
    marginBottom: 10,
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  list: {
    default: {
      flex: 1,
      fontSize: 32,
    }
  },
  content: {
    default: {
      flex: 0,
    },
    active: {
      flex: 1,
      transition: "flex 400ms ease-in-out",
    }
  },
  image: {
    width: "100%",
    height: "100%",
  }
}
