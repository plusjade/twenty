import Crypto         from 'crypto'

const Videos = () => {
  const API_ENDPOINT = "http://localhost:4000/videos"
  const SEPARATOR = ":"

  function find(videoId) {
    return (
      window.fetch(buildUrl(videoId), {
        method: 'GET'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((rsp) => {
        const payload = JSON.parse(rsp.data.payload)
        return (
          Object.assign({}, rsp.data, {commands: payload.commands, mode: payload.mode})
        )
      })
      .catch((error) => {
        console.log('request failed', error)
      })
    )
  }

  function list() {
    return (
      window.fetch(API_ENDPOINT, {
        method: 'GET'
      })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('request failed', error)
      })
    )
  }

  function remove(videoId) {
    window.localStorage.removeItem(namespace(videoId))
  }

  function save(videoId, data) {
    const payload = JSON.stringify(data)
    window.localStorage.setItem(namespace(videoId), payload)

    persist({videoId, payload})
  }

  function persist({videoId, payload, blob}) {
    const fdata = new FormData()
    if (payload) {
      fdata.append("payload", payload)
    }
    if (blob) {
      fdata.append("blob", blob)
    }

    window.fetch(buildUrl(videoId), {
      method: 'PUT',
      body: fdata
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      console.log('request succeeded with JSON response', data)
    }).catch((error) => {
      console.log('request failed', error)
    })
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function parseJSON(response) {
    return response.json()
  }

  function namespace(id) {
    return `vids${SEPARATOR}${id}`
  }

  function namespaceStrip(id) {
    return id.split(SEPARATOR)[1]
  }

  function token() {
    return (
      Crypto
        .randomBytes(9)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=/g, '')
    )
  }

  function buildUrl(videoId) {
    return `${API_ENDPOINT}/${videoId}`
  }

  return ({
    find: find,
    list: list,
    remove: remove,
    save: save,
    token: token,
    persist: persist,
  })
}

export default Videos
