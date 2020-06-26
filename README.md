# Timeside API SDK / client 

Timeside API: https://github.com/parisson/timeside

Features :
- Typescript
- Javascript
- Node.js
- Fetch API

## Install

```
npm install --save @ircam/timeside-sdk

# If you need to polyfill Fetch (for Node / older browsers), you may use
npm install --save cross-fetch
```

## API Docs

This SDK is generated from the [OpenAPI Schema of Wasabi available here](https://sandbox.wasabi.telemeta.org/timeside/api/schema/).    
You can also use the [ReDoc UI](https://sandbox.wasabi.telemeta.org/timeside/api/docs/).

## Example

### Initialize on Node

```javascript
import crossFetch from 'cross-fetch'
import formDataNode from 'formdata-node'
import {
  TimesideApi,
  ServerSideConfiguration
} from '@ircam/timeside-sdk'

// Polyfill FormData because SDK use `new FormData` which is not available in Node.
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

### Initialize on the browser

Initialize a raw client to make raw calls (login, refreshToken etc..).

```javascript
import {
  TimesideApi,
  Configuration,
  AutoRefreshConfiguration,
  LocalStorageJWTToken,
  JWTToken
} from '@ircam/timeside-sdk'

const urlConfig = {
  basePath: 'https://sandbox.wasabi.telemeta.org'
}

// rawApi is the the api without jwt middlewares
// Use it for login or routes where you don't need authentication
const rawApi = new TimesideApi(new Configuration(urlConfig))
```

Init a persistent token to save it to browser's local storage.
By default, the token is saved in the 'timeside-api-token' local storage's key. You can provide an string parameter to `LocalStorageJWTToken` constructor to change it.

```javascript
// This helper saves the JWTToken to window.localStorage
// You may also implements your own way of storing your Token
// by implementing the PersistentJWTToken interface
const persistentToken = new LocalStorageJWTToken()

// Check if a token already exist and parse it
persistentToken.init()

// Configuration to auto-refresh access token when expired
const config = AutoRefreshConfiguration(urlConfig, persistentToken)
const api = new TimesideApi(new Configuration(config))
```

Login and save the JWT Token

```javascript
async function login (username, password) {
  const tokenObtainPair = { username, password }
  const token = await rawApi.createTokenObtainPair({ tokenObtainPair })
  persistentToken.token = JWTToken.fromBase64(token.access, token.refresh)
}
```

### Make some API calls (Browser or Node)

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
```


## Integration examples

If you are looking for some implementation examples, here's a list of project that uses this SDK.

### Timeside player (browser)

[Timeside Player](https://github.com/Ircam-Web/timeside-player/) uses this SDK to provide a player from Timeside API.
You may be interested in the [`src/utils/api.ts`](https://github.com/Ircam-Web/timeside-player/blob/master/src/utils/api.ts) file

### Timeside scripts (node)

[Timeside Scripts](https://github.com/Ircam-Web/timeside-scripts) host Node.JS scripts.

#### Authors

- [Martin Desrumaux](https://github.com/gnuletik)
