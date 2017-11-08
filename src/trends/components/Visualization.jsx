// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import CategoryCard                from 'trends/components/CategoryCard'

const style = {
  default: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
  }
}

class Visualization extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number,
  }

  render() {
    const color = window.d3.scaleOrdinal(window.d3.schemeCategory20)
    return(
      <div style={style.default}>
        {this.props.data.map((d, index) => (
          <CategoryCard
            key={d.category}
            name={d.category}
            occurrences={d.occurrences}
            color={color(index)}
            data={d.data}
            maxHealth={this.props.maxHealth}
          />
        ))}
      </div>
    )
  }
}

export default Radium(Visualization)
