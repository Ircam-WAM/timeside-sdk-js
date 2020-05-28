export function AbortableFetch (abortController: AbortController, innerFetch?: typeof fetch): typeof fetch {
  const abortableFetch = (url: string, params: RequestInit | undefined): Promise<Response> => {
    params = params || {}
    params.signal = abortController.signal
    const defaultFetch = innerFetch || window.fetch.bind(window)
    return defaultFetch(url, params)
  }

  return abortableFetch
}
