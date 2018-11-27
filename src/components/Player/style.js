export default {
  appWrapper: {
    minHeight: 0, // for Firefox
    display: 'flex',
    flexDirection: 'column-reverse',
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
    // scrollBehavior: 'smooth',
    backgroundColor: '#EEE',
  },
  canEdit: {
    height: '100vh',
    paddingBottom: '18vh',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
}
