function round(value, step = 1.0) {
  const inv = 1.0 / step
  return Math.round(value * inv) / inv
}

function replace(scale) {
  return [
    [/\$\{\{FONT_SIZE_(\d+)\}\}/g, (_match, base) => round(base * scale, 0.5)],
  ]
}

module.exports = {
  replace,
}
