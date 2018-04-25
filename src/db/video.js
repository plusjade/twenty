import flatten from 'vendor/flatten'
import { transformGraph } from 'lib/sceneWizard'

import { getSubstitutions } from 'db/substitutions'
import computeVideo from 'lib/computeVideo'

import QueryParams from 'lib/QueryParams'

const QParams = QueryParams()

const scenesMap = {
  waive: [
    {
      type: "words",
      data: [
        {
          content: "👋 bye for now",
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
          content: "that little emoji has a lot to say, but unfortunately we have to sleep first",
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
          content: "I picked that one just for you, {{name}}",
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
          content: "🤗",
          effect: 'fadeIn',
        },
      ],
    },
  ],
  corgy: [
    {
      type: "words",
      data: [
        {
          content: "Ok, we'll make a great story about a corgy since everyone seems to like those dogs",
          effect: 'fadeIn',
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
  creative: [
    {
      type: "words",
      data: [
        {
          content: "Great! We're bound to have a creative adventure 😬",
        },
        {
          content: "However, the story has yet to unfold...",
        },
        {
          content: "... please wish us well, we'll be back later!",
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
  waive: { bg: "#00BCD4" },
  greeting: {  bg: "#558B2F" },
  emoji: { bg: "#1976D2" },
  nice: { bg: "#6A1B9A" },
  chooseCharacter: { bg: "#FFEB3B" },
  dog: { bg: "#FF5722" },
  creative: { bg: "#E91E63" },
}

const graph = [
  {
    chooseCharacter: {
      dog: ['dog', 'corgy'],
      custom: ['emoji', 'nice', 'greeting'],
      singer: ['creative'],
    }
  },
  'waive',
]

const blocks = transformGraph({graph, scenesMap})
console.log(blocks)
const video = computeVideo({
  rawBlocks: blocks,
  substitutions: getSubstitutions(QParams.get("p")),
  scenesMeta,
})

export default video
