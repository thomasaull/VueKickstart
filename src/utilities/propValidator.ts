export function oneOf(value: string, allowed: string[]): boolean {
  if (!Array.isArray(allowed)) {
    allowed = Object.values(allowed)
  }

  return allowed.includes(value)
}

export default {
  oneOf,
}
