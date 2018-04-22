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
          content: "{{name}}, I knew you liked {{emoji}} 🤗",
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
  chooseCharacter: [
    {
      type: "quiz",
      auto: false,
      data: {
        question: "Choose your character",
        answers: [
          {
            value: "custom",
            name: "{{emoji}}"
          },
          {
            value: "singer",
            name: "👩‍🎤"
          },
          {
            value: "dog",
            name: "🐶"
          },
        ],
      },
    }
  ],
  yesFlow: [
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
  dog: [
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
          content: "Are you sure you want the dog?",
        },
      ],
    },
    {
      type: "words",
      data: [
        {
          content: "Well, he is cute!",
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
  chooseCharacter: { bg: "#FFEB3B" },
  dog: { bg: "#FF5722" },
  yesFlow: { bg: "#E91E63" },
}

const graph = [
  {
    chooseCharacter: {
      dog: ['dog'],
      custom: ['emoji'],
      singer: ['yesFlow'],
    }
  },
  'hello',
  'nice',
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
