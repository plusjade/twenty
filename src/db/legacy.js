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

const pathExtra = [
    {
      type: "words",
      data: [
        {
          content: "oh NO! 😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
          out: 1000,
          effect: 'enterLeft',
        },
      ],

      sceneId: 3,
      bg: "#1976D2",
    },
    {
      type: "words",
      data: [
        {
          content: "Yeah, I hear ya",
          out: 1000,
          effect: 'typing',
        },
      ],

      sceneId: 3,
      bg: "#1976D2",
    },


    {
      type: "words",
      data: [
        {
          content: "You want to see something?",
          out: 1000,
        },
      ],

      sceneId: 5,
      nextSceneId: 6,
      bg: "#BF360C",
    },

]
