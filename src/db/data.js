import { serialize_array, transitions } from 'lib/sceneWizard'
import { token } from 'lib/actions'

import { getSubstitutions } from 'db/substitutions'
import { computeBlocks, computeVideo } from 'lib/computeActions'

import QueryParams from 'lib/QueryParams'
const QParams = QueryParams()

const generateIds = blocks => (
  blocks.map(block => ({ ...block, id: `${block.type}_${token()}` }))
)

const generateSceneMeta = (blocks, meta) => (
  blocks.map(block => ({...block, ...meta}))
)

const hello = [{
  type: "words",
  data: [
    {
      content: "👋 Hey there!",
      out: 1000,
      effect: 'fadeIn',
    },
  ],

  bg: "#00BCD4",
}]


const greeting = [{
  type: "words",
  data: [
    {
      content: "How's your day, {{name}}?",
      out: 1000,
      effect: 'fadeIn',
    },
  ],

  bg: "#558B2F",
}]

const emoji = [
  {
    type: "words",
    data: [
      {
        content: "Are you... {{emoji}}",
        out: 1000,
        effect: 'typing',
      },
    ],
    bg: "#1976D2",
  },
]

const nice = [
  {
    type: "words",
    data: [
      {
        content: "Must be nice!",
        out: 1000,
      },
    ],

    bg: "#6A1B9A",
  },
]

const quizOne = [{
  type: "quiz",
  data: {
    id: "1",
    question: "Do you want know what this is?",
    answers: [
      {value: "no", name: "meh, I'm {{excuse}}"},
      {value: "yes", name: "Sure, bro"},
    ],
  },

  bg: "#3F51B5",
}]


let quizYes = [
    {
      type: "words",
      data: [
        {
          content: "Great! I knew I could count on you 😬",
          out: 1000,
        },
        {
          content: "I'm stil working on it though =(...",
          out: 1000,
        },
      ],
    },
]
quizYes = generateSceneMeta(quizYes,
  {
    bg: "#E91E63",
  }
)

let quizNo = [
    {
      type: "words",
      data: [
        {
          content: "😵",
          out: 1000,
          effect: 'enterLeft',
        },
      ],
    },
    {
      type: "words",
      data: [
        {
          content: "Don't worry it's not weird!",
          out: 1000,
        },
      ],
    },
    {
      type: "words",
      data: [
        {
          content: "What do you think?",
          out: 1000,
        },
      ],
    },
]
quizNo = generateSceneMeta(quizNo,
  {
    bg: "#FF5722",
  }
)

const SCENE_MAP = {
  hello,
  greeting,
  emoji,
  nice,
  quizOne,
  quizYes,
  quizNo,
}


const graph = [
  'hello',
  'greeting',
  'emoji',
  'nice',
  {
    quizOne: {
      yes: ['quizYes'],
      no: ['quizNo'],
    }
  }
]
const computedTransitions = transitions(graph)

console.log(computedTransitions)

Object.keys(computedTransitions).forEach((key) => {
  const trans = computedTransitions[key]
    // NORMALIZE ALL OF THIS
    const scene = SCENE_MAP[key]
    scene.forEach((block) => {
      if (Object.keys(trans).length > 2) {
        // custom options. todo this is brittle
        block.nextScenes = trans
      } else {
        block.nextSceneId = trans.next
        block.prevSceneId = trans.prev
      }

      block.sceneId = key
    })

})


let blocks = (
  []
    .concat(hello)
    .concat(greeting)
    .concat(emoji)
    .concat(nice)
    .concat(quizOne)
  )

console.log(blocks)

quizNo = generateIds(quizNo)
quizYes = generateIds(quizYes)
blocks = generateIds(blocks)

const friend = QParams.get("p")
const substitutions = getSubstitutions(friend)

const computedBlocks = computeBlocks(blocks, substitutions)
const timeDuration = computedBlocks.reduce((memo, block) => (memo + block.timeDuration), 0)

quizNo = computeBlocks(quizNo, substitutions, timeDuration)
quizYes = computeBlocks(quizYes, substitutions, timeDuration)

const video = computeVideo(
  computedBlocks
    .concat(quizYes)
    .concat(quizNo)
  )
console.log('video', video.timeDuration())

export default {
  scenes: {},
  video,
}
