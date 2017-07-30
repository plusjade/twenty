function QuizDB() {
  const data = {
    one: {
      id: "1",
      question: "Deal with Jade's nonsense?",
      answers: [
        {value: "false", name: "NO"},
        {value: "false", name: "meh, I'm {{excuse}}"},
        {value: "true", name: "Um, ya"},
      ]
    },
    two: {
      id: "2",
      answers: [
        {value: "two", name: "Two"},
        {value: "four", name: "Four"},
        {value: "six", name: "Six"},
        {value: "eight", name: "Eight"},
      ],
      question: "What is 1 + 5"
    },
  }

  return (Object.assign({}, data))
}

export default QuizDB
