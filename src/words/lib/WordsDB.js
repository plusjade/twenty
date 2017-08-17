const WordsDB = () => {
  const data = [
    {
      data: "Hey there!",
      out: 1000,
    },
    {
      data: "Sorry, I'm a little late",
      out: 1000,
    },
    {
      data: "how's your day going, {{name}}?",
      out: 1000,
    },
    {
      data: "Yeah, I hear ya",
      out: 1000,
    },

    {
      data: "I've been working on something",
      out: 1000,
    },

    {
      data: "Is now a bad time to quickly go through it?",
      out: 1000,
    },
  ]

  const agreed = [
    {
      data: "Great! I knew I could count on you 🙃",
      out: 1000,
    },
    {
      data: "First, let's say we want to make a website",
      out: 1000,
    },
    {
      data: "Well what do you need to know to do that?",
      out: 1000,
    },
    {
      data: "Let's jam through the 20% core stuff that will cover 80% of what you need to know",
      out: 1000,
    },
    {
      data: "1st",
      out: 1000,
    },
    {
      data: "what _is_ a website?",
      out: 1000,
    },
    {
      data: "Let's find out!",
      out: 1000,
    },
  ]

  const data2 = [
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

  const data3 = [
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

  return ({
    data: data,
    data2: data2,
    agreed: agreed,
    data3: data3,
  })
}

export default WordsDB
