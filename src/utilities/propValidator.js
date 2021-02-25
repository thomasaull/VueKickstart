export function oneOf(value, allowed) {
  if (!Array.isArray(allowed)) {
    allowed = Object.values(allowed)
  }

  return allowed.includes(value)
}

export default {
  oneOf,
}
