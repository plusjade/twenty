import React, {Component}   from 'react'
import PropTypes                from 'prop-types'

const style = {
  default: {
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    color: "#424242",
  },
  dot: {
    fontSize: 20,
    padding: "0 3px 0 5px",
  },
  sup: {
    color: "#AAA",
  }
}

class Entry extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    entryEdit: PropTypes.func.isRequired,
  }

  handleEdit = (e) => {
    e.preventDefault()
    this.props.entryEdit(this.props.entry)
  }

  render() {
    return(
      <div style={style.default}>
        <div style={style.dot}>
          <span>·</span>
        </div>
        <div style={{flex: 1}}>
          <span>{this.props.value}</span>
          <sup style={style.sup}>
            {` ${this.props.category} `}
          </sup>
        </div>
        <div>
          <a
            href=""
            onClick={this.handleEdit}
            style={{textDecoration: "none"}}
          >
            {"✎"}
          </a>
        </div>
      </div>
    )
  }
}

export default Entry
