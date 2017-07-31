const SlidesDB = () => {
  const data = [
    {
      type: "title",
      data: "Hello, how's your day going, {{name}}?",
    },
    {
      type: "title",
      data: "😜 🙃 🤖 🙄 🤔 👾 😬 🤐",
    },
    {
      type: "title",
      data: "Yeah, I hear ya",
    },
    {
      type: "title",
      data: "here's your custom emoji:",
    },
    {
      type: "title",
      data: "{{emoji}}",
    },

    {
      type: "title",
      data: "Hope you liked it!",
    },

    {
      type: "title",
      data: "You want to see something?",
    },
    {
      type: "title",
      data: "😵",
    },
    {
      type: "title",
      data: "Don't worry it's not weird!",
    },

    {
      type: "title",
      data: "What do you think?",
    },
  ]

  const agreed = [
    {
      type: "title",
      data: "Great! I knew I could count on you 😬",
    },
    {
      type: "title",
      data: "So the first thing is random, but it's an iMessage converation...",
    },
  ]

  const data2 = [
    {
      type: "title",
      data: "Initially, I started with a code editor,",
    },
    {
      type: "title",
      data: "which is much harder, but I'm glad I did it",
    },
    {
      type: "title",
      data: "Check it out, it's a real code editor...!",
    },
  ]

  const data3 = [
    {
      type: "title",
      data: "That's it for now,",
    },
    {
      type: "title",
      data: "Thank you for checking it out buddy!",
    },
    {
      type: "title",
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
