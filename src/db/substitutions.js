const data = {
  reina: {
    name: "Reina",
    emoji: "🐱",
    excuse: "hanging with Puddles now. Go away",
  },
  hetong: {
    name: "Hetong",
    emoji: "👜",
    excuse: "doing my taxes right now",
  },

  francine: {
    name: "Francine",
    emoji: "🤗",
    excuse: "finding myself right now!",
  },
  fareed:{
    name: "Fareed",
    emoji: "🤠",
    excuse: "Slacking right now!",
  },
  richard:{
    name: "Richard",
    emoji: "😆",
    excuse: "chilling in Walnut Creek `bro`",
  },
  ted:{
    name: "Ted",
    emoji: "🍵",
    excuse: "in Wartime right now!",
  },
  peter:{
    name: "Peter",
    emoji: "🍟",
    excuse: "driving in my BMW",
  },
  robert:{
    name: "Robert",
    emoji: "🤓",
    excuse: "hanging out with Jan",
  },
  sara:{
    name: "Sara",
    emoji: "😭",
    excuse: "doing yoga",
  },
  tom:{
    name: "Tombot",
    emoji: "👨‍💻‍",
    excuse: "drinking horchata in Montebello",
  },
}

export const getSubstitutions = (name) => (
    data[name] || data.reina
)
