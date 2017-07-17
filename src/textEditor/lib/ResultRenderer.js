const ResultRenderer = (mode) => {
  const baseDomain = "https://d2n3d8kv7zaiml.cloudfront.net"
  const endpoint = getEndpoint(mode)
  let node = undefined

  function mount(nodeToMount) {
    node = nodeToMount
  }

  function update(code) {
    if (!node) { return }

    const data = JSON.stringify(payload(code))
    node.contentWindow.postMessage(data, endpoint)
  }

  function payload(code) {
    return ({
      "code": code,
      "cursor": {
        "start": 0,
        "end": 0
      },
      "validate": "",
      "noLint": false,
      "version": 4,
      "settings": {},
      "workersDir": `${baseDomain}/workers/`,
      "externalsDir": `${baseDomain}/external/`,
      "imagesDir": `${baseDomain}/images/`,
      "soundsDir": `${baseDomain}/sounds/`,
      "jshintFile": `${baseDomain}/external/jshint/jshint.js`,
      "outputType": "",
      "enableLoopProtect": true
    })
  }

  function getEndpoint(mode) {
    switch (mode) {
      case "javascript": {
        return `${baseDomain}/output.html`
      }
      case "html": {
        return `${baseDomain}/output_webpage.html`
      }
      case "sql": {
        return `${baseDomain}/output_sql.html`
      }
      default: {
        return undefined
      }
    }
  }

  return ({
    mount: mount,
    endpoint: endpoint,
    update: update,
  })
}

export default ResultRenderer
