
// http://underscorejs.org/docs/underscore.html#section-56
var property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};
var getLength = property('length');
var flatten = function(input, shallow, strict, startIndex) {
  var output = [], idx = 0;
  for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (Array.isArray(value)) {

      if (!shallow) value = flatten(value, shallow, strict);
      var j = 0, len = value.length;
      output.length += len;
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};

export const transitions = steps => (
  serialize_array(steps).reduce((memo, path) => {
    path.forEach((step, i) => {
      const prev_step = path[i - 1]
      const next_step = path[i + 1]

      const step_coerced = coerce_step(step)
      const next_step_coerced = coerce_step(next_step)
      const prev_step_coerced = coerce_step(prev_step)

      const step_name = step_coerced[0]

      const payload = {}
      const nextKey = step_coerced[step_coerced.length - 1]

      payload[nextKey] = next_step_coerced[0]
      if ((i - 1) >= 0) {
        payload.prev = prev_step_coerced[0]
      }

      if (memo[step_name]) {
        if (next_step) {
          memo[step_name] = {...memo[step_name], ...payload}
        }
      } else {
        memo[step_name] = payload
      }
    })

    return memo
  }, {})
)

export const serialize_array = steps => (
  steps.reduce((memo, step) => {
    if (typeof step === 'object') {
      return serialize_object(step, memo)
    } else {
      return memo.map(path => path.concat([step]))
    }
  }, [[]])
)

const serialize_object = (step, incoming_paths = [[]]) => {
  const step_name = Object.keys(step)[0]
  // Always include default 'next' (non-option) path
  const options = { ...(Object.values(step)[0]), next: [] }

  const result = (
    Object.keys(options).reduce((memo, option) => {
      const steps = options[option]
      const newStuff = (
        serialize_array(steps).map(path => (
          incoming_paths.map(prefix => (
            prefix
              .concat([[step_name, option]])
              .concat(path)
          ))
        ))
      )

      return (
        memo.concat(
          flatten(newStuff, true)
        )
      )
    }, [])
  )

  return result
}

const coerce_step = (step) => {
  if (Array.isArray(step)) {
    return step
  } else {
    return [step, 'next']
  }
}
