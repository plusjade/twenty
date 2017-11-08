import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Layer                from 'components/Layer/Layer'

const style = {
  layer: {
    backgroundColor: "rgba(139, 195, 74, 0.8)",
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
  select: {
    fontSize: 20,
  },
  input: {
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 20,
    backgroundColor: "#FFF",
    border: "1px solid #333",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    margin: "5px 0",
  }
}

class EntryAdd extends Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    persist: PropTypes.func.isRequired,
  }

  state = {
    value: "",
    category: "",
    ordinal: "",
  }

  componentWillMount() {
    this.setDefaults()
  }

  componentWillReceiveProps() {
    this.setDefaults()
  }

  setDefaults() {
   this.setState({
      value: "",
      category: "",
      ordinal: this.props.days[0] ? this.props.days[0].ordinal : "  "
    })
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleChangeCategory = (e) => {
    this.setState({category: e.target.value})
  }

  handleChangeOrdinal = (e) => {
    this.setState({ordinal: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.persist({
      ordinal: this.state.ordinal,
      value: this.state.value,
      category: this.state.category,
    })
  }

  render() {
    return(
      <Layer style={style.layer}>
        <form
          onSubmit={this.handleSubmit}
        >
          <select
            style={style.select}
            onChange={this.handleChangeOrdinal}
            value={this.state.ordinal}
          >
            {this.props.days.map((d) => (
              <option
                key={d.ordinal}
                value={d.ordinal}
              >
                {d.occurred_at}
              </option>
            ))}
          </select>

          <div style={{textAlign: "center"}}>
            {this.props.ordinal}
          </div>
          <div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="value"
              style={style.input}
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.category}
              onChange={this.handleChangeCategory}
              placeholder="category"
              style={style.input}
            />
          </div>
          <div>
            <button
              type="submit"
              style={style.button}
            >
              Add
            </button>
          </div>
        </form>
      </Layer>
    )
  }
}

export default Radium(EntryAdd)
