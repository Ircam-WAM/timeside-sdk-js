// Building URL from ID for API POST requests where an Hyperlink is required
// https://github.com/Ircam-WAM/TimeSide/issues/188

export function getItemUrl (basePath: string, uuid: string) {
  return `${basePath}/api/items/${uuid}/`
}

export function getAnalysisUrl (basePath: string, uuid: string) {
  return `${basePath}/api/analysis/${uuid}/`
}

export function getAnnotationTrackUrl (basePath: string, uuid: string) {
  return `${basePath}/api/annotation_tracks/${uuid}/`
}

export function getUuidFromResultUrl (url: string) {
  if (!url.startsWith('http')) {
    throw new Error('Unexpected URL. Not starting with "http"')
  }
  const segments = url.split('/')
  if (segments.length <= 3) {
    throw new Error(`Unexpected URL. segments: ${JSON.stringify(segments)}`)
  }
  const uuid = segments[segments.length - 2]
  return uuid
}

export function getUuidFromAnalysisUrl (url: string) {
  if (!url.startsWith('http')) {
    throw new Error('Unexpected URL. Not starting with "http"')
  }
  const segments = url.split('/')
  if (segments.length <= 3) {
    throw new Error(`Unexpected URL. segments: ${JSON.stringify(segments)}`)
  }
  const uuid = segments[segments.length - 2]
  return uuid
}
