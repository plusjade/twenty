const words1 = [
  {
    data: "👋 Hey there!",
    type: "words",
    out: 1000,
    effect: 'fadeIn',
  },
  {
    data: "how's your day going, {{name}}?",
    out: 1000,
    effect: 'fadeIn',
  },
  {
    data: "😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
    out: 1000,
    effect: 'enterLeft',
  },
  {
    data: "Yeah, I hear ya",
    out: 1000,
    effect: 'typing',
  },
  {
    data: "You're this one: {{emoji}}",
    out: 1000,
    effect: 'typing',
  },
  {
    data: "Nice huh!",
    out: 1000,
  },

  {
    data: "You want to see something?",
    out: 1000,
  },
  {
    data: "😵",
    out: 1000,
    effect: 'enterLeft',
  },
  {
    data: "Don't worry it's not weird!",
    out: 1000,
  },

  {
    data: "What do you think?",
    out: 1000,
  },
]

const words2 = [
  {
    data: "Great! I knew I could count on you 😬",
    out: 1000,
  },
  {
    data: "I'm stil working on it though =(...",
    out: 1000,
  },
]

const words3 = [
  {
    data: "Initially, I started with a code editor,",
    out: 1000,
  },
  {
    data: "which is much harder, but I'm glad I did it",
    out: 1000,
  },
  {
    data: "Check it out, it's a real code editor...!",
    out: 1000,
  },
]

const words4 = [
  {
    data: "That's it for now,",
    out: 1000,
  },
  {
    data: "Thank you for checking it out buddy!",
    out: 1000,
  },
  {
    data: "{{name}} <3",
    out: 1000,
  },
]


const quiz1 = {
  id: "1",
  question: "Deal with Jade's nonsense?",
  answers: [
    {value: "false", name: "NO"},
    {value: "false", name: "meh, I'm {{excuse}}"},
    {value: "true", name: "Um, ya"},
  ],
}

const quiz2 = {
  id: "2",
  answers: [
    {value: "two", name: "Two"},
    {value: "four", name: "Four"},
    {value: "six", name: "Six"},
    {value: "eight", name: "Eight"},
  ],
  question: "What is 1 + 5"
}

const messages = [
  {
    text: "Hello",
    type: "theirs",
  },
  {
    text: "Hi there!",
    type: "mine",
  },
  {
    text: "What time did you wake up today?",
    type: "theirs",
  },
  {
    text: "...uhhhhhhh",
    type: "mine",
  },
  {
    text: "not really sure 😴",
    type: "mine",
  },
  {
    text: "but it wasn't early",
    type: "mine",
  },
  {
    text: "Wanna get boba? =D",
    type: "theirs",
  },
  {
    text: "Of course I do",
    type: "mine",
  },
  {
    text: "I decided....I'm a disaster, I might as well do what the hell I want right?",
    type: "mine",
  },
  {
    text: "I don't konw what the hell that means, but sure you got it",
    type: "theirs",
  },
  {
    text: "oh, you're paying right?",
    type: "theirs",
  },
  {
    text: "😛",
    type: "theirs",
  },
  {
    text: "😛",
    type: "theirs",
  },
]

const test = words1.map(d => ({
  type: "words",
  data: [d],
  out: 1000,
}))
// .concat([{
//   type: "quiz",
//   data: quiz1,
//   in: 1000,
// }])
// .concat(
//   words2.map(d => ({
//     type: "words",
//     data: [d],
//     out: 1000,
//   }))
// )


const scenes = [
  {
    type: "words",
    data: words1,
    out: 1000,
  },
  // {
  //   type: "quiz",
  //   data: quiz1,
  //   in: 1000,
  // },
  // {
  //   type: "words",
  //   data: words2,
  //   in: 1000,
  // },
  // {
  //   type: "words",
  //   data: words3,
  //   in: 1000,
  // },
  // {
  //   type: "words",
  //   data: words4,
  //   in: 1000,
  // },
  // {
  //   type: "texting",
  //   data: messages,
  // },
]

const testTwo = [
    {
      type: "words",
      data: [words1[0]],
      out: 1000,
      sceneId: 0,
      bg: "#388E3C",
    },
    {
      type: "words",
      data: [words1[1]],
      out: 1000,
      sceneId: 1,
      bg: "#388E3C",
    },
    {
      type: "words",
      data: [words1[2]],
      out: 1000,
      sceneId: 2,
      bg: "#1976D2",
    },
    {
      type: "words",
      data: [words1[3]],
      out: 1000,
      sceneId: 2,
      bg: "#1976D2",
    },
    {
      type: "words",
      data: [words1[4]],
      out: 1000,
      sceneId: 2,
      bg: "#1976D2",
    },
    {
      type: "words",
      data: [words1[5]],
      out: 1000,
      sceneId: 3,
      bg: "#6A1B9A",
    },
    {
      type: "words",
      data: [words1[6]],
      out: 1000,
      sceneId: 4,
      bg: "#BF360C",
    },
    {
      type: "words",
      data: [words1[7]],
      out: 1000,
      sceneId: 5,
      bg: "#FF5722",
    },
    {
      type: "words",
      data: [words1[8]],
      out: 1000,
      sceneId: 5,
      bg: "#FF5722",
    },
    {
      type: "words",
      data: [words1[9]],
      out: 1000,
      sceneId: 5,
      bg: "#FF5722",
    },

    {
      type: "quiz",
      data: quiz1,
      out: 1000,
      sceneId: 6,
      bg: "orange",
    },
    {
      type: "words",
      data: words2,
      out: 1000,
      sceneId: 7,
      bg: "#E91E63",
    },
]

export default {
  scenes: {},
  things: testTwo,
}
