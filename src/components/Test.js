import React, {Component}   from 'react'
import SplitText    from 'vendor/SplitText'
import Emoji        from 'components/Emoji'

class Test extends Component {

  componentDidMount() {
    // console.log(this.node)
    // const mySplitText = new SplitText(this.node, {type:"chars,words"}),
    // tl = new window.TimelineLite()
    // tl.staggerFrom(mySplitText.chars, 0.2, {opacity:0}, 0.06)

    window.TweenMax.to(this.node, 3, {
      repeat: 3,
      rotation: "360_cw",
      x: 300,
      yoyo: true,
    })
  }

  getRef = (node) => {
    this.node = node
  }

  render() {
    return (
      <div>
        <Emoji refCallback={this.getRef} />
      </div>
    )
  }
}

export default Test

