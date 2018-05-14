export default {
  barWrap: {
    display: 'inline-flex',
    justifyContent: 'flex-end',
  },
  wrap: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 999999,
    transition: "all 300ms ease",
    borderRadius: "15px 15px 0 0",
    transform: "translateY(-110%)",
  },
  isActive: {
    transition: "all 300ms ease",
    transform: "translateY(0)",
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
  }
}
