export default {
  isFixed: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  canEdit: {
    height: '100vh',
    paddingBottom: '18vh',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
  isEditing: {
    position: 'fixed',
  },
  isHorizontal: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
}
