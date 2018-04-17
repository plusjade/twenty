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

const blocks = [
    {
      type: "words",
      data: [
        {
          data: "👋 Hey there!",
          out: 1000,
          effect: 'fadeIn',
        },
      ],

      sceneId: 0,
      nextSceneId: 1,
      bg: "#00BCD4",
    },


    {
      type: "words",
      data: [
        {
          data: "how's your day going, {{name}}?",
          out: 1000,
          effect: 'fadeIn',
        },
      ],

      sceneId: 1,
      nextSceneId: 2,
      bg: "#558B2F",
    },


    {
      type: "quiz",
      data: {
        id: "1",
        question: "Deal with Jade's nonsense?",
        answers: [
          // {value: "false", name: "NO"},
          {value: "false", name: "meh, I'm {{excuse}}"},
          {value: "true", name: "Um, ya"},
        ],
      },

      sceneId: 2,
      nextScenes: {
        false: 0,
        true: 3
      },
      bg: "#3F51B5",
    },



    {
      type: "words",
      data: [
        {
          data: "😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
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
          data: "Yeah, I hear ya",
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
          data: "You're this one: {{emoji}}",
          out: 1000,
          effect: 'typing',
        },
      ],

      sceneId: 3,
      nextSceneId: 4,
      bg: "#1976D2",
    },


    {
      type: "words",
      data: [
        {
          data: "Nice huh!",
          out: 1000,
        },
      ],

      sceneId: 4,
      nextSceneId: 5,
      bg: "#6A1B9A",
    },


    {
      type: "words",
      data: [
        {
          data: "You want to see something?",
          out: 1000,
        },
      ],

      sceneId: 5,
      nextSceneId: 6,
      bg: "#BF360C",
    },


    {
      type: "words",
      data: [
        {
          data: "😵",
          out: 1000,
          effect: 'enterLeft',
        },
      ],

      sceneId: 6,
      bg: "#FF5722",
    },
    {
      type: "words",
      data: [
        {
          data: "Don't worry it's not weird!",
          out: 1000,
        },
      ],

      sceneId: 6,
      bg: "#FF5722",
    },
    {
      type: "words",
      data: [
        {
          data: "What do you think?",
          out: 1000,
        },
      ],

      sceneId: 6,
      nextSceneId: 7,
      bg: "#FF5722",
    },


    {
      type: "words",
      data: [
        {
          data: "Great! I knew I could count on you 😬",
          out: 1000,
        },
        {
          data: "I'm stil working on it though =(...",
          out: 1000,
        },
      ],

      sceneId: 7,
      bg: "#E91E63",
    },
]

export default {
  scenes: {},
  blocks: blocks,
}
