import React, {PropTypes} from 'react'

const withPromisedData = (Component, dataKey="data", dataValue=[]) => {
  let dataPayload = {}
  dataPayload[dataKey] = dataValue

  const withPromisedData = React.createClass({
    propsTypes: {
      async: PropTypes.func,
    },

    getInitialState() {
      return (dataPayload)
    },

    componentWillMount() {
      if (typeof this.props.async === "function") {
        this.resolve(this.props.async())
      }
    },

    resolve(promise) {
      promise
      .then((rsp) => {
        dataPayload[dataKey] = rsp.data
        this.setState(dataPayload)
      })
      .catch((error) => {
        console.log('request failed', error)
      })
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
  })

  return withPromisedData
}

export default withPromisedData
