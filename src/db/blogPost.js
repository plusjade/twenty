// var data = Array.from(document.querySelectorAll('h1,h2,h3,h4,p,ul')).map(node => ({type: node.tagName, text: node.textContent}))
const script = () => {
  let last
  let data = [
    {
      "type": "H2",
      "text": "The Pain of Teaching Yourself to Code"
    },
    {
      "type": "P",
      "text": "Many people have told me the isolation and loneliness of self-learning is one of the biggest obstacles to success."
    },
    {
      "type": "P",
      "text": "People benefit from peer support, guided lessons, student-mentor relationships, and the emotional support and reassurance of a group setting."
    },
    {
      "type": "P",
      "text": "Institutional education, whether at a University, trade-school, or bootcamp all offer these great benefits out of the box."
    },
    {
      "type": "P",
      "text": "Go to school and you get:"
    },
    {
      "type": "P",
      "text": "\nA network of people smarter than you.\nA network of like-minded motivated peers.\nA network of knowledgeable mentors that will guide you through challenges.\nA network of industry contacts that can help you jumpstart your career.\n"
    },
    {
      "type": "P",
      "text": "School seems like a no-brainer -- the obvious preferred method for learning.\nSelf-learning is relegated to those lacking the resources/means to attend school."
    },
    {
      "type": "H3",
      "text": "But"
    },
    {
      "type": "P",
      "text": "Hands down, my biggest strength is self-learning. I am a self-taught professional web-developer in San Francisco."
    },
    {
      "type": "H3",
      "text": "Software is Alive"
    },
    {
      "type": "P",
      "text": "The software landscape is alive -- it changes. Nobody knew how to program for IOS and Android in 2006 because they didn't exist."
    },
    {
      "type": "P",
      "text": "Many web technologies in use today did not exist at the time a given programmer attended school. "
    },
    {
      "type": "P",
      "text": "Good programmers are good at learning how to learn in a way that works best for them. Good programmers are flexible because constraints are always changing."
    },
    {
      "type": "H3",
      "text": "Self Learning"
    },
    {
      "type": "P",
      "text": "The attributes that make self-learning hard are the attributes that make a programmer good."
    },
    {
      "type": "P",
      "text": "The support roles in institional education are valid. However, in self-learning you take ownership of either being or finding those roles."
    },
    {
      "type": "P",
      "text": "Self-learning and learning how to learn sounds great, but what does it mean?"
    },
    {
      "type": "P",
      "text": "Understand self-learning by visualizing the contrast between a teacher-led project and a self-directed project."
    },
    {
      "type": "UL",
      "text": "\nHow do you start?\nWhere do the specifications come from?\nWhere do you go when you run into trouble?\nWhat do you do when you don't understand a concept?\nHow do you troubleshoot a problem you have absolutely no understanding of? \n"
    },
    {
      "type": "P",
      "text": "The Teacher-led Path."
    },
    {
      "type": "P",
      "text": "The teacher-led path tends to rely on the artificial learning environment rather than the self. The answer to every question would be some form of \"asking for direction\".\nMany aspiring coders can follow a tutorial flawlessly and show you a fully-working app hosted online. Yet they are incapable of bringing their own idea to fruition because they are no directions for that."
    },
    {
      "type": "P",
      "text": "The Self-learner."
    },
    {
      "type": "P",
      "text": "In contrast the self-learner is required to pick a direction (which may be wrong). He is free to ask for help but he must asses the situation and pick a direction before there is anyone to ask."
    },
    {
      "type": "P",
      "text": "The self-learner must gain conceptual awareness."
    },
    {
      "type": "P",
      "text": "He may rely on a baseline collection of reference materials he's discovered to do it. He may enlist tons of Google-fu to painfully acquire morsels of increased awareness. He may take this awareness and further refine his question on stackoverflow. \nHe may go \"keyword hopping\" where initial searches lead him to unknown keywords for which he can refine his initial search to gain more awareness and repeat."
    },
    {
      "type": "P",
      "text": "This may sound inefficient, ridiculous and rudimentary. You may scoff at this strategy."
    },
    {
      "type": "P",
      "text": "Self-learning is necessarily hard because you are building personal skills across many vectors that you will own for the rest of your life. You are building autonomy, discipline, problem-solving and logical deduction skills, and character."
    },
    {
      "type": "P",
      "text": "Self-learners feel the pain of doing something the ridiculous way. From this perspective they gain deep insight and appreciation into why and how the better way is better. Self-learners are able to explain things in simple terms from a beginner's perspective."
    },
    {
      "type": "P",
      "text": "Conceptual awareness yields compound interest."
    },
    {
      "type": "H3",
      "text": "Support for Self Learning"
    },
    {
      "type": "P",
      "text": "The Internet provides unparalled access to the world's best minds and information. Access to peers and mentors smarter than you is a click away. "
    },
    {
      "type": "UL",
      "text": "\nAsk and answer technical questions in a worlwide forum.\nAttend meetups and meet engineers from industry leading Internet companies.\nCode with programmers from absolute beginners to world class Open Source Software contributors.\nCompanies will pay you in food, lodging and prizes to learn their APIs.\n"
    },
    {
      "type": "P",
      "text": "Programmers are some of the most accessible and giving professionals in the world. Open Source Software allows you to freely study and reverse engineer software used by millions of people."
    },
    {
      "type": "H3",
      "text": "Conclusion"
    },
    {
      "type": "P",
      "text": "Self-learning may not be for everyone.  Simply, I find it a truism that the greatest programmers inevitably take their education into their own hands."
    },
    {
      "type": "P",
      "text": "It is not that institutional education is incapable of producing self-learners. Rather, self-learning is a requisite skill regardless of your education path."
    },
    {
      "type": "P",
      "text": "Self-learning is hard because it is extremely valuable."
    },
    {
      "type": "P",
      "text": "Acquiring self-learning skills through self-learning is therefore a perfectly legitimate and necessary education path."
    },
    {
      "type": "P",
      "text": "Disclaimer:\nMy programming knowledge and experience is entirely based in web technologies. I understand that different technology landscapes are different. Please consider my message with this mind."
    },
    {
      "type": "P",
      "text": "Thanks to Al Walworth for proofreading =)"
    }
  ]

  let result = data.reduce((memo, d) => {
    if (d.type === 'P' && last.type === 'P') {
      const total = memo[memo.length - 1].content.length
      if (total > 1)  {
        memo.push({
          type: "text",
          content: [d.text],
        })
      } else {
        memo[memo.length - 1].content.push(d.text)
      }
    } else {
      if (['P', 'UL'].includes(d.type)) {
        memo.push({
          type: "text",
          content: [d.text],
        })
      } else {
        memo.push({
          type: "words",
          content: [d.text],
        })
      }
  }
    last = d
    return memo
  }, []).map(d => ({...d, content: d.content.join('\n')}))
  // copy(result)
}


export const blogPost = [
  {
    "type": "words",
    "content": "The Pain of Teaching Yourself to Code"
  },
  {
    "type": "text",
    "content": "Many people have told me the isolation and loneliness of self-learning is one of the biggest obstacles to success.\nPeople benefit from peer support, guided lessons, student-mentor relationships, and the emotional support and reassurance of a group setting."
  },
  {
    "type": "text",
    "content": "Institutional education, whether at a University, trade-school, or bootcamp all offer these great benefits out of the box.\nGo to school and you get:"
  },
  {
    "type": "text",
    "content": "\nA network of people smarter than you.\nA network of like-minded motivated peers.\nA network of knowledgeable mentors that will guide you through challenges.\nA network of industry contacts that can help you jumpstart your career.\n\nSchool seems like a no-brainer -- the obvious preferred method for learning.\nSelf-learning is relegated to those lacking the resources/means to attend school."
  },
  {
    "type": "words",
    "content": "But"
  },
  {
    "type": "text",
    "content": "Hands down, my biggest strength is self-learning. I am a self-taught professional web-developer in San Francisco."
  },
  {
    "type": "words",
    "content": "Software is Alive"
  },
  {
    "type": "text",
    "content": "The software landscape is alive -- it changes. Nobody knew how to program for IOS and Android in 2006 because they didn't exist.\nMany web technologies in use today did not exist at the time a given programmer attended school. "
  },
  {
    "type": "text",
    "content": "Good programmers are good at learning how to learn in a way that works best for them. Good programmers are flexible because constraints are always changing."
  },
  {
    "type": "words",
    "content": "Self Learning"
  },
  {
    "type": "text",
    "content": "The attributes that make self-learning hard are the attributes that make a programmer good.\nThe support roles in institional education are valid. However, in self-learning you take ownership of either being or finding those roles."
  },
  {
    "type": "text",
    "content": "Self-learning and learning how to learn sounds great, but what does it mean?\nUnderstand self-learning by visualizing the contrast between a teacher-led project and a self-directed project."
  },
  {
    "type": "text",
    "content": "\nHow do you start?\nWhere do the specifications come from?\nWhere do you go when you run into trouble?\nWhat do you do when you don't understand a concept?\nHow do you troubleshoot a problem you have absolutely no understanding of? \n"
  },
  {
    "type": "text",
    "content": "The Teacher-led Path.\nThe teacher-led path tends to rely on the artificial learning environment rather than the self. The answer to every question would be some form of \"asking for direction\".\nMany aspiring coders can follow a tutorial flawlessly and show you a fully-working app hosted online. Yet they are incapable of bringing their own idea to fruition because they are no directions for that."
  },
  {
    "type": "text",
    "content": "The Self-learner.\nIn contrast the self-learner is required to pick a direction (which may be wrong). He is free to ask for help but he must asses the situation and pick a direction before there is anyone to ask."
  },
  {
    "type": "text",
    "content": "The self-learner must gain conceptual awareness.\nHe may rely on a baseline collection of reference materials he's discovered to do it. He may enlist tons of Google-fu to painfully acquire morsels of increased awareness. He may take this awareness and further refine his question on stackoverflow. \nHe may go \"keyword hopping\" where initial searches lead him to unknown keywords for which he can refine his initial search to gain more awareness and repeat."
  },
  {
    "type": "text",
    "content": "This may sound inefficient, ridiculous and rudimentary. You may scoff at this strategy.\nSelf-learning is necessarily hard because you are building personal skills across many vectors that you will own for the rest of your life. You are building autonomy, discipline, problem-solving and logical deduction skills, and character."
  },
  {
    "type": "text",
    "content": "Self-learners feel the pain of doing something the ridiculous way. From this perspective they gain deep insight and appreciation into why and how the better way is better. Self-learners are able to explain things in simple terms from a beginner's perspective.\nConceptual awareness yields compound interest."
  },
  {
    "type": "words",
    "content": "Support for Self Learning"
  },
  {
    "type": "text",
    "content": "The Internet provides unparalled access to the world's best minds and information. Access to peers and mentors smarter than you is a click away. "
  },
  {
    "type": "text",
    "content": "\nAsk and answer technical questions in a worlwide forum.\nAttend meetups and meet engineers from industry leading Internet companies.\nCode with programmers from absolute beginners to world class Open Source Software contributors.\nCompanies will pay you in food, lodging and prizes to learn their APIs.\n"
  },
  {
    "type": "text",
    "content": "Programmers are some of the most accessible and giving professionals in the world. Open Source Software allows you to freely study and reverse engineer software used by millions of people."
  },
  {
    "type": "words",
    "content": "Conclusion"
  },
  {
    "type": "text",
    "content": "Self-learning may not be for everyone.  Simply, I find it a truism that the greatest programmers inevitably take their education into their own hands.\nIt is not that institutional education is incapable of producing self-learners. Rather, self-learning is a requisite skill regardless of your education path."
  },
  {
    "type": "text",
    "content": "Self-learning is hard because it is extremely valuable.\nAcquiring self-learning skills through self-learning is therefore a perfectly legitimate and necessary education path."
  },
  {
    "type": "text",
    "content": "Disclaimer:\nMy programming knowledge and experience is entirely based in web technologies. I understand that different technology landscapes are different. Please consider my message with this mind.\nThanks to Al Walworth for proofreading =)"
  }
]
