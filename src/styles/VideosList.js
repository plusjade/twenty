import StylesWrapper        from 'styles/Wrapper'
const VideosList = {
  wrap: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
    position: "fixed",
    left: "50%",
    right: 0,
    top: 0,
    bottom: StylesWrapper.navHeight,
    zIndex: 1001,
    backgroundColor: "#111",
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
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "inherit",
    padding: "20px",
    textDecoration: "none",
  }
}

export default VideosList
