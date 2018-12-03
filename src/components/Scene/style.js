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
    marginTop: 12,
  },
  boundingSquare: {
    position: 'relative',
    width: '100%',
    minHeight: '98vw',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 1px 5px',
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
  },
  isFuture: {
    backgroundColor: '#F5F5F5',
  },
}
