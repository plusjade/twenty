import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Layer                from 'components/Layer/Layer'

const style = {
  layer: {
    backgroundColor: "rgba(255, 193, 5, 0.9)",
  },
  button: {
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 20,
    backgroundColor: "#FFF",
    border: "1px solid #333",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    margin: "5px 0",
  },
}

class EntryEdit extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    value: "",
    category: "",
  }

  componentWillMount() {
    this.setEntry(this.props.entry)
  }

  componentWillReceiveProps(nextProps) {
    this.setEntry(nextProps.entry)
  }

  setEntry(entry) {
    this.setState({
      value: entry.value,
      category: entry.category,
    })
  }

  handleDelete = (e) => {
    e.preventDefault()
    this.props.remove(this.props.entry.id)
  }

  render() {
    return(
      <Layer style={style.layer}>
        <div>
          <button
            style={style.button}
            onClick={this.handleDelete}
          >
            DELETE
          </button>
        </div>
      </Layer>
    )
  }
}

export default Radium(EntryEdit)
