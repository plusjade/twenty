function Personalizer(substitutions) {
  // Match: {{word}} and {{ word }}
  const TOKEN_REGEX = /\{\{\s*(\w+)\s*\}\}/g

  function replacer(match, token) {
    if (substitutions[token]) {
      return substitutions[token]
    } else {
      return match
    }
  }

  function personalize(input) {
    return input.replace(TOKEN_REGEX, replacer)
  }

  return({
    personalize: personalize
  })
}

export default Personalizer
