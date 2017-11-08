// http://jsfiddle.net/qAHC2/688/
// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import CategoryCard from 'trends/components/CategoryCard'

const WIDTH = 1200
const HEIGHT = WIDTH / 2

const style = {
  default: {
    width: "100%",
    overflow: "visible",
  },
  svg: {
    display: "block",
    width: "100%",
    margin: "auto",
    overflow: "visible",
  },
}

class Chart extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.update([{id: Math.random(), data: nextProps.data}], nextProps.maxHealth)
  }

  componentDidMount() {
    const d3 = window.d3
    const svg = d3.select(this.refNode)
    const g = svg.append("g")
    const x = d3.scaleLinear().rangeRound([0, WIDTH])
    const y = d3.scaleLinear().rangeRound([HEIGHT, 0])
    const line = d3.line()
                  .x(d => (x(d.date)))
                  .y(d => (y(d.health)))
    const area = d3.area()
                  .x(d => (x(d.date)))
                  .y1(d => (y(d.health)))

    const areaStart = data => (
      area(data.map(d => ({date: d.date, health: 0})))
    )

    g.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${HEIGHT + 15})`)
      .attr("style", "font-size: 20px")
      .call(d3.axisBottom(x))

    g.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate(${WIDTH + 15}, 0)`)
      .attr("style", "font-size: 20px")
      .call(d3.axisRight(y))


    this.update = (data, maxHealth) => {
      x.domain(d3.extent(data[0].data, d => (d.date)))
      y.domain([0, maxHealth])
      area.y0(y(0))

      const node = g.selectAll("g.area").data(data, d => (d.id))

      node.enter().append("g").attr("class", "area")
        .append("path")
          .attr("fill", this.props.color)
          .attr("d", d => (areaStart(d.data)))
          .transition()
            .duration(800)
            .attr("d", d => (area(d.data)))

      node.exit().selectAll("path")
        .transition()
        .duration(800)
        .attr("d", d => (areaStart(d.data)))
        .remove()

      g.select("g.yAxis")
        .transition()
        .duration(800)
        .call(d3.axisRight(y))

      g.select("g.xAxis")
        .transition()
        .duration(800)
        .call(d3.axisBottom(x))
    }

    this.update([{id: 0, data: this.props.data}], this.props.maxHealth)
  }

  getRef = (node) => {
    if (node) {
      this.refNode = node
    }
  }

  render() {
    return(
      <div style={style.default}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={style.svg}
          ref={this.getRef}
        />
      </div>
    )
  }
}

export default Radium(Chart)
