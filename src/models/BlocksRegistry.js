import BlockHeading from 'blocks/BlockHeading/BlockHeading'
import BlockText from 'blocks/BlockText/BlockText'

const blocksMap = {
  words: {
    id: 'text',
    name: 'Heading',
    component: BlockHeading,
    pickers: [
      'text',
      'color',
      'align',
      'size',
      'delete',
    ],
  },
  text: {
    id: 'text',
    name: 'Paragraph',
    component: BlockText,
    pickers: [
      'text',
      'size',
    ],
  },
}

class BlocksRegistry {
  get = id => blocksMap[id] && blocksMap[id].component
  getMeta = id => blocksMap[id]
  list = () => Object.values(blocksMap)
}

export default new BlocksRegistry()
