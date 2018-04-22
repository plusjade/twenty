import flatten from 'vendor/flatten'
import { transformGraph } from 'lib/sceneWizard'

import { getSubstitutions } from 'db/substitutions'
import { computeBlocks, computeVideo } from 'lib/computeActions'

import QueryParams from 'lib/QueryParams'

const QParams = QueryParams()

const hello = [{
  type: "words",
  data: [
    {
      content: "👋 Hey there!",
      out: 1000,
      effect: 'fadeIn',
    },
  ],
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

const map = {
  hello,
  greeting,
  emoji,
  nice,
  quizOne,
  quizYes,
  quizNo,
}
const scenesMeta = {
  hello: { bg: "#00BCD4" },
  greeting: {  bg: "#558B2F" },
  emoji: { bg: "#1976D2" },
  nice: { bg: "#6A1B9A" },
  quizOne: { bg: "#3F51B5" },
  quizNo: { bg: "#FF5722" },
  quizYes: { bg: "#E91E63" },
}

const graph = [
  'greeting',
  'hello',
  'emoji',
  'nice',
  {
    quizOne: {
      yes: ['quizYes'],
      no: ['quizNo'],
    }
  }
]

const blocks = transformGraph({graph, map})
console.log(blocks)
const video = computeVideo(
  computeBlocks({
    rawBlocks: blocks,
    substitutions: getSubstitutions(QParams.get("p")),
  }),
  scenesMeta
)

export default video
