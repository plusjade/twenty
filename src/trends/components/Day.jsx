import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Entry from 'trends/components/Entry'

const style = {
  default: {
    padding: "20px 10px",
    backgroundColor: "#F5F5F5",
    borderTop: "2px solid #FFF",
    borderBottom: "2px solid #FFF",
    color: "#424242",
  },
  isToday: {
    backgroundColor: "#FFF",
    height: 300,
  },
  heading: {
    fontSize: 20,
    color: "inherit",
    fontWeight: 600,
  },
  entriesWrap: {
    marginTop: 20,
  },

  addIcon: {
    float: "right",
    textDecoration: "none",
    padding: 5,
  },
}

class Day extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ordinal: PropTypes.string.isRequired,
  }

  render() {
    return(
      <div style={[
        style.default,
        this.props.isToday && style.isToday,
      ]}>
        <div style={style.heading}>
          <span>{`${this.props.name}`}</span>
        </div>
        <div style={style.entriesWrap}>
          {this.props.entries.map((entry) =>(
            <Entry
              entry={entry}
              key={entry.id}
              id={entry.id}
              value={entry.value}
              category={entry.category}
              entryEdit={this.props.entryEdit}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Radium(Day)
