// rgba(0,0,0,0.5)
export default {
  video: {
    position: 'relative',
    flex: 1,
    height: 400,
    width: "100%",
    minWidth: 300,
    maxWidth: 400,
    color: "inherit",
    textDecoration: "none",
    textAlign: "center",
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    backgroundColor: 'Transparent',
    // border: "2px solid #212121",
  },
  create: {
    height: 100,
    backgroundColor: 'Transparent',
    border: 0,
  },
  offset: {
    // marginTop: -195,
  },
  innerWrap: {
    borderRadius: 20,
    backgroundColor: "Transparent",
    margin: "3vh 3vh 0 3vh",
    boxShadow: "1px 1px 20px rgba(0,0,0,0.2)",
    position: 'relative',
    flex: 1,
    display:'block',
    width: 140,
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: 0,
  },
  editor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingTop: 50,
    borderRadius: "0 0 15px 15px",
    background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.1))"
  },
}
