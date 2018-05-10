import * as util from 'api/util'

export const user = (TOKEN) => {
  const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
  }

  const getCategories = () => (
    window.fetch(util.buildUrl("/categories"), {
      method: 'GET',
      headers: HEADERS,
    })
    .then(util.checkStatus)
    .then(util.parseJSON)
    .then(rsp => (rsp))
    .catch((error) => {
      console.log('request failed', error)
    })
  )

  const getFeed = (categoryName) => {
    return (
      window.fetch(util.buildUrl(`/feeds/${categoryName}`), {
        method: 'GET',
        headers: HEADERS,
      })
      .then(util.checkStatus)
      .then(util.parseJSON)
      .then((rsp) => (rsp))
      .catch((error) => {
        console.log('request failed', error)
        return ({})
      })
    )
  }

  const remove = id => (
    window.fetch(util.buildUrl(`/entries/${id}`), {
      method: 'DELETE',
      headers: HEADERS,
    })
    .then(util.checkStatus)
    .then(util.parseJSON)
    .then((rsp) => {
      console.log('request succeeded with JSON response', rsp)
      return (rsp)
    }).catch((error) => {
      console.log('request failed', error)
      return ({})
    })
  )

  const persist = (body) => {
    const fdata = new FormData()
    if (body.ordinal) {
      fdata.append("ordinal", body.ordinal)
    }
    if (body.value) {
      fdata.append("value", body.value)
    }
    if (body.category) {
      fdata.append("category", body.category)
    }

    return (
      window.fetch(util.buildUrl("/entries"), {
        method: 'POST',
        body: fdata,
        headers: HEADERS,
      })
      .then(util.checkStatus)
      .then(util.parseJSON)
      .then((rsp) => {
        console.log('request succeeded with JSON response', rsp)
        return (rsp)
      }).catch((error) => {
        console.log('request failed', error)
        return ({})
      })
    )
  }

  const update = (id, body) => {
    const fdata = new FormData()
    if (body.ordinal) {
      fdata.append("ordinal", body.ordinal)
    }
    if (body.value) {
      fdata.append("value", body.value)
    }
    if (body.category) {
      fdata.append("category", body.category)
    }

    return (
      window.fetch(util.buildUrl(`/entries/${id}`), {
        method: 'PUT',
        body: fdata,
        headers: HEADERS,
      })
      .then(util.checkStatus)
      .then(util.parseJSON)
      .then((rsp) => {
        console.log('request succeeded with JSON response', rsp)
        return (rsp)
      }).catch((error) => {
        console.log('request failed', error)
        return ({})
      })
    )
  }

  return ({
    getCategories,
    getFeed,
    remove,
    persist,
    update,
  })
}

export default user
