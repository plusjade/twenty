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
  waive: { bg: "#FFEB3B" },
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
  // 'emoji',
  // 'nice',
  // 'greeting',
  // 'waive',
  // 'creative1',
  // 'creative2',
  // 'creative3'
]


// blocks.forEach(video.addBlock)
// video.addBlock(  {
//     type: "words",
//     data: {
//       content: "I picked that one just for you, {{name}}",
//       effect: 'fadeIn',
//     },
//     sceneId: "emoji",
//   })
// video.addBlock(  {
//     type: "words",
//     data: {
//       content: "🤗",
//       effect: 'fadeIn',
//     },
//     style: {
//       fontSize: 120,
//     },
//     sceneId: "nice",
//   })


const demo = [
{
    type: "words",
    data: {
      content: "👋 Hi there",
      effect: 'fadeIn',
    },
    style: {
      color: "#212121",
    },
    position: [0, '-15vh'],
    sceneId: "waive",
  },
{
    type: "words",
    data: {
      content: "Tap to continue...",
      effect: 'fadeIn',
    },
    style: {
      color: "#212121",
    },
    position: [0, '15vh'],
    offset: 500,
    sceneId: "waive",
  },
{
    type: "words",
    data: {
      content: "🎨 Create something! 🎨",
      effect: 'fadeIn',
    },
    sceneId: "addblock",
  },
{
    type: "words",
    data: {
      content: "Click ✍ to edit this video",
      effect: 'fadeIn',
    },
    offset: 500,
    position: [0, '25vh'],
    sceneId: "addblock",
  },

{
    type: "words",
    data: {
      content: "Go go go!",
      effect: 'fadeIn',
    },
    sceneId: "go",
  },
]

let video
const subscribe = (data) => {
  console.log("subscribe")
  console.log(data)
  const string = JSON.stringify(data)
  window.localStorage.setItem('video', string)
}
const storedData = window.localStorage.getItem('video')
if (storedData) {
  video = new Video({...JSON.parse(storedData), subscribe})
} else {
  video = new Video({subscribe})
  // video.addSubstitutions(getSubstitutions(QParams.get("p")))
  video.addScenesMeta(scenesMeta)
  demo.forEach(video.addBlock)
  video.updateGraph(['waive', 'addblock', 'go'])

  // const sceneId = video.addScene()
  // video.addBlock({
  //   type: "words",
  //   data: {
  //     content: "👋 🌎",
  //   },
  //   style: {
  //     color: "#FFF",
  //   },

  //   sceneId: sceneId,
  // })
}

export default video
