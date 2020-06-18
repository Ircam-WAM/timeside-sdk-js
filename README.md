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
npm install --save cross-fetch
```

### API Docs

This SDK is generated from the [OpenAPI Schema of Wasabi available here](https://sandbox.wasabi.telemeta.org/timeside/api/schema/).    
You can also use the [ReDoc UI](https://sandbox.wasabi.telemeta.org/timeside/api/docs/).

If you are looking for some implementation examples, you can have a look at [Timeside Player](https://github.com/Ircam-Web/timeside-player/).
You may be interested in the [`src/utils/api.ts`](https://github.com/Ircam-Web/timeside-player/blob/master/src/utils/api.ts) file

### Example (ESModule)

Initialize on Node

```javascript
import crossFetch from 'cross-fetch'
import formDataNode from 'formdata-node'
import {
  TimesideApi,
  ServerSideConfiguration,
  Selection,
  Experience,
  TaskStatus,
  Task,
} from '@ircam/timeside-sdk'

// Polyfill FormData because SDK use `new FormData`
// @ts-ignore
global.FormData = formDataNode

const api = new TimesideApi(ServerSideConfiguration({
  // Use sandbox endpoint
  basePath: 'https://sandbox.wasabi.telemeta.org',
  // Credentials (get from environment)
  username: process.env.TIMESIDE_API_USER,
  password: process.env.TIMESIDE_API_PASS,
  // Ponyfill fetchApi
  fetchApi: crossFetch
}))
```

Initialize on the browser

```javascript
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
```

Make some API calls

```javascript

async function callApi () {
  // List items
  const items = await api.listItems({})
  console.log(items)
  const itemUuid = items[0].uuid

  // Get the item's Waveform
  const waveform = await api.retrieveItemWaveform({ uuid: itemUuid })
  console.log(waveform)

  // Create an item
  const item = {
    title: 'Unknown Song',
		description: 'Some great song!'
  }
  const item = await api.createItem({ body })
  console.log(item)

  // And get/create :
  // Annotations, Analysis, AnalysisResult,
  // Transcode, Visualization (like Spectrogram) etc..
  // ...
}

// Wrap with anonymous function to use
// "top-level" async/await
(async () => {
  try {
    await callApi()
  } catch (e) {
    // Throw Response Error
    console.error('Something occured', e.statusText)
  }
})()
```
