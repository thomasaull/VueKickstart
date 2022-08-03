import { clamp } from 'lodash-es'

interface Clamp {
  min: number
  max: number
}

interface MapOptions {
  clamp?: Clamp | boolean
}

export function map(
  input: number,
  inputLow: number,
  inputHigh: number,
  outputLow: number,
  outputHigh: number,
  options: MapOptions = {}
): number {
  let result =
    outputLow +
    ((outputHigh - outputLow) * (input - inputLow)) / (inputHigh - inputLow)

  if (options.clamp === true) {
    result = clamp(result, outputLow, outputHigh)
  }

  if (typeof options.clamp === 'object') {
    result = clamp(result, options.clamp.min, options.clamp.max)
  }

  return result
}
;``
