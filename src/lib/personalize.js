// Match: {{word}} and {{ word }}
const TOKEN_REGEX = /\{\{\s*(\w+)\s*\}\}/g

const personalize = (input, substitutions) => {
  const replacer = (match, token) => {
    if (substitutions[token]) {
      return substitutions[token]
    } else {
      return match
    }
  }

  return(input.replace(TOKEN_REGEX, replacer))
}

export default personalize
