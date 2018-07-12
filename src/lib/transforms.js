
export const getColor = (map) => {
    const colorHsl = +map.get('color_hsl') || -20 // dark gray
    if (colorHsl < 1) { // handle grayscale as represented by -100 - 0
      return `hsl(0, 0%, ${(Math.abs(colorHsl))}%)`
    }

    return `hsl(${colorHsl}, 100%, 50%)`
}

export const getTextContent = (block) => {
  const legacyContent = block.get('data') && block.get('data').content
  return (
    (block.get('content') || legacyContent)
      .split(/\n/g)
      .filter(string => !!string)
  )
}

export const getTransforms = ({block, width, height}) => {
  const transforms = []
  if (block.has('xRel') || block.has('yRel')) {
    const xRel = block.get('xRel') || 0
    const yRel = block.get('yRel') || 0

    if (xRel || yRel) {
      const x = (xRel * width).toFixed(2)
      const y = (yRel * height).toFixed(2)
      transforms.push(`translate3d(${x}px, ${y}px, 0)`)
    }
  }  else if (block.has('positionX') || block.has('positionY')) {
    const positionX = block.get('positionX') || 0
    const positionY = block.get('positionY') || 0

    if (positionX || positionY) {
      transforms.push(`translate3d(${positionX}, ${positionY}, 0)`)
    }
  } else {
    const position = block.get('position')
            ? block.get('position').concat([0]).join(',')
            : 0
    if (position) {
      transforms.push(`translate3d(${position})`)
    }
  }

  return transforms
}

export const getRotationTransforms = (block) => {
  const rotationTransforms = []
  const rotation = block.get('rotation') || 0

  if (rotation) {
    rotationTransforms.push(`rotate(${rotation})`)
  }

  return rotationTransforms
}

export const getFontSize = (block) => {
  const size = +block.get('size') || 80
  let asPixels = parseInt((size / 10) * 3, 10) // default size maps to 24px

  if (asPixels < 4) {
    asPixels = 4
  }

  return `${asPixels}px`
}

export const getTextAlign = (block) => {
  return block.get('align') || 'left'
}

export const syncTransforms = ({params, block, height, width}) => {
  if (Object.prototype.hasOwnProperty.call(params, 'positionX')) {
    const relative = +(params.positionX / width).toFixed(4)
    block.set('xRel', relative)
  }

  if (Object.prototype.hasOwnProperty.call(params, 'positionY')) {
    const relative = +(params.positionY / height).toFixed(4)
    block.set('yRel', relative)
  }

  if (Object.prototype.hasOwnProperty.call(params, 'rotation')) {
    block.set('rotation', `${params.rotation.toFixed(2)}deg`)
  }
}
