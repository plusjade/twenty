const SlidesDB = () => {
  const data = [
    {
      type: "title",
      data: "Hello, how's your day going?",
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
      data: "So, umm...",
    },
    {
      type: "title",
      data: "I want to show you something really quick,",
    },

    {
      type: "title",
      data: "Do you want to see it?",
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
      data: "Cool?",
    },
  ]

  const agreed = [
    {
      type: "title",
      data: "Great! I knew I could count on you 😬",
    },
    {
      type: "title",
      data: "So the first thing is random, but imagine you had an iMessage converation...",
    },
  ]

  const data2 = [
    {
      type: "title",
      data: "Wasn't that cool?",
    },
    {
      type: "title",
      data: "BUT WAIT!",
    },
    {
      type: "title",
      data: "THERE'S MORE =O",
    },
    {
      type: "title",
      data: "What do you know about...",
    },
    {
      type: "title",
      data: "CSS?",
    },
    {
      type: "title",
      data: "Ok, NVM, that's it for now! ......",
    },
  ]

  return ({
    data: data,
    data2: data2,
    agreed: agreed,
  })
}

export default SlidesDB
