export default {
  barWrap: {
    display: 'inline-flex',
    justifyContent: 'flex-end',
  },
  wrap: {
    height: '20vh',
    minWidth: "100vw",
    overflow: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#FFF",
    // border: "1px solid #333",
  },
  isActive: {
    transition: "all 300ms ease",
    transform: "translateX(0)",
  },
  pillBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  pill: {
    borderRadius: 10,
    backgroundColor: "blue",
    color: "#fff",
    border: "1px solid #FFF",
    margin: 2,
    padding: 2,
  },
  toolWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  toolLabelWrap: {
    display: 'flex',
  },
  toolLabel: {
    padding: 5
  },
  toolSliderWrap: {
    marginBottom: 5,
    display: 'none',
    pointerEvents: 'none',
  },
  isOpen: {
    display: 'block',
  },
  isVisible: {
    pointerEvents: 'auto',
  },
}
