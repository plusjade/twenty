import StylesWrapper        from 'styles/Wrapper'
export default {
  wrap: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
    zIndex: 1001,
    backgroundColor: "#232323",
    overflow: "auto",
    opacity: 1,
    borderBottom: StylesWrapper.borderFrame,
    borderRadius: "0 0 15px 15px",
  },
  video: {
    color: "inherit",
    padding: "10vh 30px",
    display: "block",
    textDecoration: "none",
    border: StylesWrapper.borderFrame,
    borderTop: 0,
    textAlign: "center",
    borderTop: "1px solid #111",
  },
  delete: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "inherit",
    padding: "20px",
    textDecoration: "none",
  }
}
