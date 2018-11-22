import BlockHeading from 'blocks/BlockHeading/BlockHeading'
import BlockText from 'blocks/BlockText/BlockText'

const blocksMap = {
  words: {
    id: 'text',
    name: 'Heading',
    component: BlockHeading,
  },
  text: {
    id: 'text',
    name: 'Paragraph',
    component: BlockText,
  },
}

class BlocksRegistry {
  get = id => blocksMap[id] && blocksMap[id].component
  list = () => Object.values(blocksMap)
}

export default new BlocksRegistry()
