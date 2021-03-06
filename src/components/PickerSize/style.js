export default {
  outer: {
    position: 'relative',
    margin: 'auto',
    width: '30vw',
    height: '30vw',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255,255,255,1)',
    transform: 'rotate(-90deg)',
  },
  mover: {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center',
    backgroundColor: "orange",
  },
  pointer: {
    position: 'absolute',
    top: '-2.5vh',
    border: '2px solid #FFF',
    height: '7vw',
    width: '7vw',
    borderRadius: '100%',
    zIndex: 9999999, // has to be bigger than the 1k Draggable position
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  inner: {
    width: '30%',
    height: '30%',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFF',
  },
}
