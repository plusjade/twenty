import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Chart              from 'trends/components/Chart'

const style = {
  default: {
    backgroundColor: "#F5F5F5",
    fontSize: 20,
    lineHeight: "1.4em",
    minHeight: 100,
    padding: 15,
    boxSizing: "border-box",
  }
}

class CategoryCard extends PureComponent {
  render() {
    return (
      <div
        onClick={this.handleClick}
        style={[
          style.default,
          {color: this.props.color},
        ]}
      >
        <div>
          <span>{this.props.name}</span>
          <sup style={{fontSize: 10}}>
            {` ${this.props.occurrences} `}
          </sup>
        </div>

        <Chart
          data={this.props.data}
          color={this.props.color}
          maxHealth={this.props.maxHealth}
        />
      </div>
    )
  }
}


export default Radium(CategoryCard)
