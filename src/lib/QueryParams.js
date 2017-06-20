const QueryParams = () => {

  function get(paramName) {
    return this.all()[paramName]
  }

  function all(queryStr) {
    if (queryStr == null) {
      queryStr = window.location.search
    }
    const params = queryStr.substr(1).split('&')
    if (!params || params.length === 0) {
      return {}
    }

    const paramsHash = {}

    params.forEach(param => {
      const kv = param.split('=')

      if (kv.length !== 2) {
        return
      }

      const param_name = decodeURIComponent(kv[0])
      const value = decodeURIComponent(kv[1].replace(/\+/g, ' '))
      if (param_name.match(/\[\]$/)) {
        paramsHash[param_name] = paramsHash[param_name] || []
        paramsHash[param_name].push(value)
      } else {
        paramsHash[param_name] = value
      }
    })
    return paramsHash
  }

  return ({
    get: get,
    all: all
  })
}

export default QueryParams
