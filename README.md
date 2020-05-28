## timeside-sdk

This generator creates TypeScript/JavaScript client that utilizes [Fetch API](https://fetch.spec.whatwg.org/). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition should be automatically resolved via `package.json`. ([Reference](http://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html))

### Install

```
npm install --save @ircam/timeside-sdk

# If you need to polyfill Fetch (for Node / older browsers), you may use
npm install --save portable-fetch
```

### API Docs

This SDK is generated from the [OpenAPI Schema of Wasabi available here](https://sandbox.wasabi.telemeta.org/timeside/api/schema/).
You can also use the [following document](https://sandbox.wasabi.telemeta.org/timeside/api/docs/)

If you are looking for some implementation examples, you can have a look at [Timeside Player](https://github.com/Ircam-Web/timeside-player/).
You may be interested in the [`src/utils/api.ts`](https://github.com/Ircam-Web/timeside-player/blob/master/src/utils/api.ts) file

### Example (ESModule)

```javascript
import portableFetch from 'portable-fetch'

import {
  TimesideApi,
  Configuration,
  AutoRefreshConfiguration,
  LocalStorageJWTToken,
  JWTToken
} from '@ircam/timeside-sdk'

export const basePath = 'https://sandbox.wasabi.telemeta.org'

// This helper saves the JWTToken to window.localStorage
// You may also implements your own way of storing your Token
// by implementing the PersistentJWTToken interface
export const persistentToken = new LocalStorageJWTToken()
persistentToken.init()

const urlConfig = {
  basePath,
  // Use alternative fetch API (for Node / Polyfill)
  fetchApi: portableFetch,
}

// rawApi is the the api without jwt middlewares
// Use it for login or routes where you don't need authentication
export const rawApi = new TimesideApi(new Configuration(urlConfig))

// Configuration to auto-refresh token when needed
const config = AutoRefreshConfiguration(urlConfig, persistentToken)
const api = new TimesideApi(new Configuration(config))

async function callApi () {
  // Login
  const username = 'your_username'
  const password = 'your_secret_password'
  const tokenObtainPair = { username, password }
  const token = await rawApi.createTokenObtainPair({ tokenObtainPair })
  persistentToken.token = JWTToken.fromBase64(token.access, token.refresh)

  // List items
  const items = await api.listItems({})
  console.log(items)
  const itemUuid = items[0].uuid

  // Get the item's Waveform
  const waveform = await api.retrieveItemWaveform({ uuid: itemUuid })
  console.log(waveform)

  // Create an item
  const body = {
    title: 'test'
  }
  const item = await api.createItem({ body })
  console.log(item)

  // And get/create :
  // Annotations, Analysis, AnalysisResult,
  // Transcode, Visualization (like Spectrogram) etc..
  // ...
}

// Wrap with anonymous function to use
// top-level async/await
(async () => {
  try {
    await callApi()
  } catch (e) {
    // Throw Response Error
    console.error('Something occured', e.statusText)
  }
})()
```
