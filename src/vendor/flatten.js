// http://underscorejs.org/docs/underscore.html#section-56
const property = function(key) {
  return function(obj) {
    return obj == null ? undefined : obj[key]
  }
}
const getLength = property('length')
const flatten = (input, shallow, strict, startIndex) => {
  const output = []
  let idx = 0
  for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
    var value = input[i]
    if (Array.isArray(value)) {
      if (!shallow) value = flatten(value, shallow, strict)
      var j = 0, len = value.length
      output.length += len
      while (j < len) {
        output[idx++] = value[j++]
      }
    } else if (!strict) {
      output[idx++] = value
    }
  }
  return output
}

export default flatten
