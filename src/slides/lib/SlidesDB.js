const SlidesDB = () => {
  const data = [
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

  const agreed = [
    {
      data: "Great! I knew I could count on you 😬",
      out: 1000,
    },
    {
      data: "So the first thing is random, but it's an iMessage converation...",
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

export default SlidesDB
