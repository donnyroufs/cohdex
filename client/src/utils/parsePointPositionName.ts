export function parsePointPositionName(fileName: string) {
  const split = fileName.split('_')

  // Actually this isnt possible, but lets keep it in here to pretend
  // like we dont know what we are doing.
  if (split[0].includes('starting')) {
    const pos = split[split.length - 1]
    return `spawn location ${pos.split('-')[1]}`
  }

  if (split[0].includes('victory')) {
    return split[0]
  }

  return split[1]
}
