import { inRange } from 'lodash'

export function errorCodeToHttpStatus(code?: number) {
  if (!code || !inRange(code, 200, 500)) {
    return 500
  }

  return code
}
