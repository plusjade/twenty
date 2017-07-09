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
      data: "Coolbeans!",
    },
    {
      type: "title",
      data: "So, umm...",
    },
    {
      type: "title",
      data: "Do you want to make a web page?",
    },

    {
      type: "title",
      data: "Well, what is a web page?",
    },
    {
      type: "title",
      data: "Let's find out!",
    },
    {
      type: "orderedList",
      data: [
        "Open a web browser",
        "Navigate to your favorite website ",
        "https://www.instacart.com/",
        "Right click the page",
        "Click \"View Source\"",
        "What do you see?",
      ]
    },
    {
      type: "image",
      data: "https://s3.amazonaws.com/media-p.slid.es/uploads/46703/images/3558698/Screen_Shot_2017-03-05_at_7.06.44_PM.png"
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
      data: "THERE'S MOAR",
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
  })
}

export default SlidesDB
