export default {
  wrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 0,
    // overflow: 'hidden',
    minHeight: 0, // for Firefox
    backgroundColor: '#EEE',
  },
  boundingSquare: {
    position: 'relative',
    width: '100vw',
    height: '100vw',
    boxSizing: 'border-box',
    marginTop: 8,
    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 5px',
  },
  dateString: {
    top: 12,
    position: 'absolute',
    right: 0,
    zIndex: 1100,
    padding: 15,
    fontSize: 12,
    color: '#757575',
  },
  isToday: {
    borderRight: '3px solid #FFAB40',
  }
}
