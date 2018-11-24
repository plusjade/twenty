import randomEmoji from 'db/randomEmoji'
import BlockHeading from 'blocks/BlockHeading/BlockHeading'
import BlockText from 'blocks/BlockText/BlockText'

const blocksMap = {
  words: {
    id: 'words',
    name: 'Heading',
    component: BlockHeading,
    pickers: [
      'text',
      'color',
      'align',
      'size',
      'delete',
    ],
    defaults: () => ({
      content: `${randomEmoji()} HEADING`,
    })
  },
  text: {
    id: 'text',
    name: 'Paragraph',
    component: BlockText,
    pickers: [
      'text',
      'color',
      'align',
      'size',
      'delete',
    ],
    defaults: () => ({
      content: 'Paragraph...',
    })
  },
}

class BlocksRegistry {
  get = id => blocksMap[id] && blocksMap[id].component
  getMeta = id => blocksMap[id]
  list = () => Object.values(blocksMap)
  defaults = (id) => {
    if (blocksMap[id] && typeof blocksMap[id].defaults == 'function') {
     return blocksMap[id].defaults()
    }

    return {}
  }
}

export default new BlocksRegistry()
