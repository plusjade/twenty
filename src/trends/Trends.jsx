import React, {Component}   from 'react'
import Radium from 'radium'
import DB                 from 'trends/DB'
import Day                from 'trends/components/Day'
import Visualization      from 'trends/components/Visualization'
import EntryAdd           from 'trends/components/EntryAdd'
import EntryEdit          from 'trends/components/EntryEdit'

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com"
    : "http://localhost:4000"
)
const TrendsDB = DB(API_ENDPOINT)

const style={
  chartToggle: {
    position: "fixed",
    lineHeight: "40px",
    height: 40,
    width: 60,
    bottom: 10,
    left: 0,
    fontSize: 20,
    display: "block",
    textAlign: "center",
    zIndex: 2,
    backgroundColor: "#212121",
    borderRadius: "0 20px 20px 0",
  },
  addIcon: {
    position: "fixed",
    bottom: 10,
    right: 0,
    left: 0,
    fontSize: 30,
    display: "block",
    textAlign: "center",
    zIndex: 1,
  },
  closeIcon: {
    position: "fixed",
    bottom: 10,
    right: 10,
    fontSize: 30,
    display: "block",
    textAlign: "center",
    zIndex: 3,
  }
}
class Trend extends Component {
  state = {
    days: [],
    showVizualization: true,
  }

  componentWillMount() {
    this.refreshData()
  }

  refreshData() {
    TrendsDB.days().then((rsp) => {
      this.setState({
        days: rsp.days,
        trends: rsp.trends,
        categories: rsp.categories,
      })
    })
  }

  entryEdit = (entry) => {
    this.setState({showEditEntry: entry})
  }

  persist = (body) => {
    if (!body.value || body.value.trim() === "") { return }
    if (!body.category || body.category.trim() === "") { return }
    if (!body.ordinal || body.ordinal.trim() === "") { return }

    TrendsDB.persist(body).then(() => {
      this.refreshData()
      this.closeModals()
      this.showVizualization()
    })
  }

  remove = (id) => {
    TrendsDB.remove(id).then(() => {
      this.refreshData()
      this.closeModals()
    })
  }

  toggleChart = () => {
    window.scroll(0,0)
    this.setState({showVizualization: !this.state.showVizualization})
  }

  showVizualization = () => {
    window.scroll(0,0)
    this.setState({showVizualization: true})
  }

  handleAddEntry = () => {
    this.setState({showAddEntry: !this.state.showAddEntry})
  }

  closeModals = () => {
    this.setState({showAddEntry: false, showEditEntry: false})
  }

  shouldShowClose() {
    return this.state.showAddEntry || this.state.showEditEntry
  }

  shouldShowAdd() {
    return !this.shouldShowClose()
  }

  shouldShowChartToggle() {
    return !this.shouldShowClose()
  }

  maxHealth() {
    const aggregrate = this.state.trends.reduce((memo, d) => (memo.concat(d.data)),[])
    return window.d3.max(aggregrate, d => (d.health))
  }

  render() {
    const daysDescending = this.state.days.slice(0).reverse()
    return(
      <div>
        {this.state.showAddEntry && (
          <EntryAdd
            days={daysDescending}
            persist={this.persist}
          />
        )}

        {this.state.showEditEntry && (
          <EntryEdit
            entry={this.state.showEditEntry}
            remove={this.remove}
          />
        )}

        {this.state.showVizualization && this.state.trends && (
          <Visualization
            data={this.state.trends}
            categories={this.state.categories}
            maxHealth={this.maxHealth()}
          />
        )}

        {!this.state.showVizualization && daysDescending.map((day) => (
          <Day
            key={day.ordinal}
            name={day.occurred_at}
            entries={day.entries}
            ordinal={day.ordinal}
            isToday={day.isToday}
            remove={this.remove}
            entryEdit={this.entryEdit}
          />
        ))}

        {this.shouldShowAdd() && (
          <div style={style.addIcon}>
            <span
              onClick={this.handleAddEntry}
            >
              {"➕"}
            </span>
          </div>
        )}

        {this.shouldShowChartToggle() && (
          <div
            style={style.chartToggle}
            onClick={this.toggleChart}
          >
            {this.state.showVizualization ? "🗒️" : "📈"}
          </div>
        )}

        {this.shouldShowClose() && (
          <div
            style={style.closeIcon}
            onClick={this.closeModals}
          >
            <span>{"❌"}</span>
          </div>
        )}
      </div>
    )
  }
}

export default Radium(Trend)
