const DB = (apiEndpoint) => {
  const SEPARATOR = ":"

  function days() {
    return (
      window.fetch(buildUrl("/trends"), {
        method: 'GET'
      })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('request failed', error)
      })
    )
  }

  function remove(id) {
    return (
      window.fetch(buildUrl(`/entries/${id}`), {
        method: 'DELETE'
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('request succeeded with JSON response', data)
      }).catch((error) => {
        console.log('request failed', error)
      })
    )
  }

  function save(videoId, data) {
    const payload = JSON.stringify(data)
    window.localStorage.setItem(namespace(videoId), payload)

    persist({videoId, payload})
  }

  function persist(body) {
    const fdata = new FormData()
    fdata.append("ordinal", body.ordinal)
    fdata.append("value", body.value)
    fdata.append("category", body.category)

    return (
      window.fetch(buildUrl("/entries"), {
        method: 'POST',
        body: fdata
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('request succeeded with JSON response', data)
      }).catch((error) => {
        console.log('request failed', error)
      })
    )
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

  function token() {
    return (
      Crypto
        .randomBytes(9)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
    )
  }

  function buildUrl(path) {
    return `${apiEndpoint}${path}`
  }

  return ({
    days: days,
    remove: remove,
    save: save,
    token: token,
    persist: persist,
  })
}

export default DB
