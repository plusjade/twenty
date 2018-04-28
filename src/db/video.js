import { getSubstitutions } from 'db/substitutions'
import Video from 'lib/Video'

import QueryParams from 'lib/QueryParams'

const QParams = QueryParams()

const blocks = [
  {
    type: "words",
    data: {
      content: "👋 bye for now",
      effect: 'fadeIn',
    },
    sceneId: "waive",
  },
  {
    type: "words",
    data: {
      content: "that little emoji has a lot to say, but unfortunately we have to sleep first",
      effect: 'fadeIn',
    },
    sceneId: "greeting",
  },
  {
    type: "words",
    data: {
      content: "I picked that one just for you, {{name}}",
      effect: 'fadeIn',
    },
    sceneId: "emoji",
  },
  {
    type: "words",
    data: {
      content: "🤗",
      effect: 'fadeIn',
    },
    style: {
      fontSize: 120,
    },
    sceneId: "nice",
  },
  {
    type: "words",
    data: {
      content: "Ok, we'll make a great story about a corgy since everyone seems to like those dogs",
      effect: 'fadeIn',
    },
    sceneId: "corgy",
  },
  {
    type: "words",
    data: {
      content: "Choose your character",
      effect: 'fadeIn',
    },
    style: {
      color: "#212121",
    },
    sceneId: "chooseCharacter",
  },
  {
    type: "quiz",
    isInteractive: true,
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
    sceneId: "chooseCharacter",
  },
  {
    type: "words",
    data: {
      content: "Great! We're bound to have a creative adventure 😬",
    },
    sceneId: "creative1",
  },
  {
    type: "words",
    data: {
      content: "However, the story has yet to unfold...",
    },
    sceneId: "creative2",
  },
  {
    type: "words",
    data: {
      content: "... please wish us well, we'll be back later!",
    },
    sceneId: "creative3",
  },
  {
    type: "words",
    data: {
      content: "😵",
      effect: 'enterLeft',
    },
    style: {
      fontSize: 120,
    },
    sceneId: "dog",
  },
  {
    type: "words",
    data: {
      content: "Are you sure you want the dog?",
    },
    offset: 400,
    sceneId: "dog",
  },
  {
    type: "words",
    data: {
      content: "Well, he is cute!",
    },
    offset: 800,
    sceneId: "dog",
  },

]

const scenesMeta = {
  corgy: { bg: "#607D8B" },
  waive: { bg: "#00BCD4" },
  greeting: {  bg: "#558B2F" },
  emoji: { bg: "#1976D2" },
  nice: { bg: "#6A1B9A" },
  chooseCharacter: { bg: "#FFEB3B" },
  dog: { bg: "#FF5722" },
  creative1: { bg: "#E91E63" },
  creative2: { bg: "#E91E63" },
  creative3: { bg: "#E91E63" },
}

const graph = [
  {
    chooseCharacter: {
      dog: ['dog', 'corgy'],
      custom: ['emoji', 'nice', 'greeting'],
      singer: ['creative1', 'creative2', 'creative3'],
    }
  },
  'waive',
]

const video = new Video()
video.addSubstitutions(getSubstitutions(QParams.get("p")))
video.addScenesMeta(scenesMeta)
blocks.forEach(video.addBlock)
video.updateGraph(graph)

export default video
