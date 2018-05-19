import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

const withPromisedData = (WrappedComponent, dataKey="data", dataValue=[]) => {
  let dataPayload = {}
  dataPayload[dataKey] = dataValue

  class withPromisedData extends Component {
    constructor(props) {
      super(props)
      this.resolve = this.resolve.bind(this)
      this.state = dataPayload
    }

    UNSAFE_componentWillMount() {
      if (typeof this.props.async === "function") {
        this.resolve(this.props.async())
      }
    }

    resolve(promise) {
      promise
        .then((rsp) => {
          dataPayload[dataKey] = rsp.data
          this.setState(dataPayload)
        })
        .catch((error) => {
          console.log('request failed', error)
        })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
        />
      )
    }
  }

  withPromisedData.propTypes = {
    async: PropTypes.func,
  }

  return withPromisedData
}

export default withPromisedData
