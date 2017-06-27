import React from 'react'

const withRecord = (Component) => {
  window.commands = []
  let synchronizedTime = undefined

  const withRecord = React.createClass({
    propTypes: {
    },

    getDefaultProps() {
      return ({
        availableModes: ["html", "sql", "javascript"]
      })
    },

    initialState() {
      return ({
        chunkPosition: -1,
        timeStart: undefined,
        timePosition: 0,
        timePositionPaused: 0,
      })
    },

    getInitialState() {
      return (this.initialState())
    },

    componentWillMount() {
      this.tickInterval = undefined
    },

    componentDidMount() {
      this.editor = this.props.getEditor()
      this.listen()
    },

    componentWillUnmount() {
      console.log("unmounting")
      this.unListen()
    },

    resetState() {
      this.setState(this.initialState())
    },

    getTimeNow() {
      return (new Date()).getTime()
    },

    setTimeStart(time) {
      this.setState({timeStart: time || this.getTimeNow()})
    },

    getTimeStart() {
      return this.state.timeStart
    },

    getTimePosition() {
      return this.state.timePositionPaused + this.getTimeNow() - this.getTimeStart()
    },

    updateTimePosition(time) {
      this.setState({timePosition: time || this.getTimePosition()})
    },

    listen() {
      this
        .editor
        .session
        .doc
        .on("change", this.listenChange, true)
      this
        .editor
        .selection
        .addEventListener("changeCursor", this.listenChangeCursor, true)
      this
        .editor
        .selection
        .addEventListener("changeSelection", this.listenSelect, true)
    },

    unListen() {
      this
        .editor
        .session
        .doc
        .off("change", this.listenChange)
      this
        .editor
        .selection
        .removeEventListener("changeCursor", this.listenChangeCursor)
      this
        .editor
        .selection
        .removeEventListener("changeSelection", this.listenSelect)
    },

    listenChange(e) {
      const start = e.start
      const end = e.end

      if (e.action.indexOf("insert") === 0) {
        const insert = e.lines || e.text
        this.log(
          e.action,
          start.row,
          start.column,
          end.row,
          end.column,
          insert
        )
      } else {
        this.log(
          e.action,
          start.row,
          start.column,
          end.row,
          end.column
        )
      }
    },

    listenChangeCursor() {
      if (this.editor.selection.isEmpty()) {
        this.listenSelect()
      }
    },

    listenSelect() {
      const curRange = this.editor.selection.getRange()
      const start = curRange.start
      const end = curRange.end
      this.log(
        "select",
        start.row,
        start.column,
        end.row,
        end.column
      )
    },

    // Commands are stored in the format:
    // [time, name, arguments...]
    log() {
      if (this.isPaused()) { return }

      if (synchronizedTime === undefined) {
        synchronizedTime = Math.floor(this.getTimePosition())
        setTimeout(() => {
            synchronizedTime = undefined
        }, 50)
      }

      let args = Array.prototype.slice.call(arguments, 0)
      args.unshift(synchronizedTime)
      window.commands.push(args)
      return true
    },

    record() {
      this.editor.focus()
      this.setTimeStart()
      this.tickInterval = setInterval(() => {
        this.updateTimePosition()
      }, 50)

      console.log("pressed record")
    },

    pause(time) {
      clearInterval(this.tickInterval)
      this.tickInterval = undefined
      this.setState({
        timeStart: undefined,
        timePositionPaused: time || this.getTimePosition()
      })
      if (this.isPaused && this.hasRecording) {
        this.props.save()
      }
    },

    isPaused() {
      return !this.tickInterval
    },

    hasRecording() {
      return window.commands.length > 0
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          getTimePosition={this.getTimePosition}
          record={this.record}
          pause={this.pause}
          isPaused={this.isPaused()}
          hasRecording={this.hasRecording()}
        />
      )
    }
  })

  return withRecord
}

export default withRecord
