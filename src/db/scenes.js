const words1 = [
  {
    data: "Hey there!",
    out: 1000,
  },
  {
    data: "Sorry, I'm a little late,",
    out: 1000,
  },
  {
    data: "how's your day going, {{name}}?",
    out: 1000,
  },
  {
    data: "😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
    out: 1000,
  },
  {
    data: "Yeah, I hear ya",
    out: 1000,
  },
  {
    data: "here's your custom emoji: {{emoji}}",
    out: 1000,
  },
  {
    data: "Hope you liked it!",
    out: 1000,
  },

  {
    data: "You want to see something?",
    out: 1000,
  },
  {
    data: "😵",
    out: 1000,
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
    data: "So the first thing is random, but it's an iMessage converation...",
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
  ]
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

const scenes = [
  {
    type: "words",
    data: words1,
    out: 1000,
  },
  {
    type: "quiz",
    data: quiz1,
    in: 1000,
  },
  {
    type: "words",
    data: words2,
    in: 1000,
  },
  {
    type: "words",
    data: words3,
    in: 1000,
  },
  {
    type: "words",
    data: words4,
    in: 1000,
  },
  // {
  //   type: "texting",
  //   data: messages,
  // },
]

export default scenes
