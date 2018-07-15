import SplitText from 'vendor/SplitText'

export const getTextEffect = ({block, node}) => {
  switch (block.get('effect')) {
    case 'fadeIn': {
      return fadeIn(node)
    }
    case 'typing': {
      return typing(node)
    }
    case 'enterLeft': {
      return enterLeft(node)
    }
    default: {
      return fadeIn(node)
    }
  }
}

// This works on timing. 0.2 is the duration of the effect
// so we're basically just coordinating the duraction of the effect to
// how long we've given the scene to last. fixme?
export const typing = (node) => {
  const mySplitText = new SplitText(node, {type:"chars,words"})
  return (
    new window.TimelineLite()
      .staggerFrom(mySplitText.chars, 0.2, {opacity: 0}, 0.055)
      .pause()
  )
}

export const fadeIn = (node) => {
  const mySplitText = new SplitText(node, {type:"lines"})
  return (
    new window.TimelineLite()
      .staggerFrom(
        mySplitText.lines,
        0.5,
        {
          opacity: 0,
          rotationX: -20,
          force3D: true,
          transformOrigin:"top center -50"
        },
        0.1
      )
      .pause()
  )
}

export const enterLeft = (node) => {
  const mySplitText = new SplitText(node, {type:"lines"})
  return (
    new window.TimelineLite()
      .staggerFrom(
        mySplitText.lines,
        0.5,
        {
          left: -200,
        },
        0
      )
      .pause()
  )
}
