const Videos = () => {
  function find(videoId) {
    let json = window.localStorage.getItem(videoId)
    if (json) {
      return JSON.parse(json)
    } else {
      return null
    }
  }

  function list() {
    return Object.keys(window.localStorage)
  }

  function remove(videoId) {
    window.localStorage.removeItem(videoId)
  }

  function save(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data))
  }

  return ({
    find: find,
    list: list,
    remove: remove,
    save: save,
  })
}

export default Videos
