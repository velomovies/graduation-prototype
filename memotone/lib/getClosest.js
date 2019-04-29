export default function (v, array) {
  let value,
      lastDelta

  array.some(a => {
      const delta = Math.abs(v - a.times)
      if (delta >= lastDelta) {
          return true
      }
      value = a.times
      lastDelta = delta
  })
    return value
  }
