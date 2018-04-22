import flatten from 'vendor/flatten'
import { transformGraph } from 'lib/sceneWizard'

import { getSubstitutions } from 'db/substitutions'
import { computeBlocks, computeVideo } from 'lib/computeActions'

import QueryParams from 'lib/QueryParams'

const QParams = QueryParams()

const scenesMap = {
  hello: [
    {
      type: "words",
      data: [
        {
          content: "👋 Hey there!",
          effect: 'fadeIn',
        },
      ],
    }
  ],
  greeting: [
    {
      type: "words",
      data: [
        {
          content: "How's your day, {{name}}?",
          effect: 'fadeIn',
        },
      ],
    }
  ],
  emoji: [
    {
      type: "words",
      data: [
        {
          content: "Are you... {{emoji}}",
          effect: 'typing',
        },
      ],
    },
  ],
  nice: [
    {
      type: "words",
      data: [
        {
          content: "Must be nice!",
        },
      ],
    },
  ],
  quizOne: [
    {
      type: "quiz",
      auto: false,
      data: {
        question: "Do you want know what this is?",
        answers: [
          {value: "no", name: "meh, I'm {{excuse}}"},
          {value: "yes", name: "Sure, bro"},
        ],
      },
    }
  ],
  quizYes: [
    {
      type: "words",
      data: [
        {
          content: "Great! I knew I could count on you 😬",
        },
        {
          content: "I'm stil working on it though =(...",
        },
      ],
    },
  ],
  quizNo: [
    {
      type: "words",
      data: [
        {
          content: "😵",
          effect: 'enterLeft',
        },
      ],
    },
    {
      type: "words",
      data: [
        {
          content: "Don't worry it's not weird!",
        },
      ],
    },
    {
      type: "words",
      data: [
        {
          content: "What do you think?",
        },
      ],
    },
  ],
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

const blocks = transformGraph({graph, scenesMap})
console.log(blocks)
const video = computeVideo(
  computeBlocks({
    rawBlocks: blocks,
    substitutions: getSubstitutions(QParams.get("p")),
  }),
  scenesMeta
)

export default video
