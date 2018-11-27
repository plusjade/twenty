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
    minHeight: '100vw',
    boxSizing: 'border-box',
    marginTop: 8,
    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 5px',
  },
  dateString: {
    fontWeight: 600,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  isToday: {
    backgroundColor: '#616161',
    color: '#FFF',
  }
}
