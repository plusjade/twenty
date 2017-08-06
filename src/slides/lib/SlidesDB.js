const SlidesDB = () => {
  const data = [
    {
      data: "Hello, how's your day going, {{name}}?",
    },
    {
      data: "😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
    },
    {
      data: "Yeah, I hear ya",
    },
    {
      data: "here's your custom emoji: {{emoji}}",
    },
    {
      data: "Hope you liked it!",
    },

    {
      data: "You want to see something?",
    },
    {
      data: "😵",
    },
    {
      data: "Don't worry it's not weird!",
    },

    {
      data: "What do you think?",
    },
  ]

  const agreed = [
    {
      data: "Great! I knew I could count on you 😬",
    },
    {
      data: "So the first thing is random, but it's an iMessage converation...",
    },
  ]

  const data2 = [
    {
      data: "Initially, I started with a code editor,",
    },
    {
      data: "which is much harder, but I'm glad I did it",
    },
    {
      data: "Check it out, it's a real code editor...!",
    },
  ]

  const data3 = [
    {
      data: "That's it for now,",
    },
    {
      data: "Thank you for checking it out buddy!",
    },
    {
      data: "{{name}} <3",
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
