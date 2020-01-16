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

### Example for Typescript

```javascript
import { DefaultApi, Configuration } from '@ircam/timeside-sdk'
// Use alternative fetch API (for Node / Polyfill)
import portableFetch from 'portable-fetch'

const config = new Configuration({
	// API URL
	basepath: 'https://wasabi.telemeta.org',

	// Send cookies with requests
	credentials: 'include',

	// Use alternative fetch API (for Node / Polyfill)
	fetchApi: portableFetch
})

const api = new DefaultApi(config)

async function callApi () {
	// List items
	const items = await api.listItems({})
	console.log(items)

	// Create an item
	const body: Item = {
		title: 'test'
	}
	const item = await api.createItem({ body })
	console.log(item)
}

try {
	callApi()
} catch (e) {
	if (e.status === 401) {
		console.error(`Woops. Seems like you're not authorized`)
	} else {
		console.error('Something occured', e)
	}
}
```

### Example for Javascript

```typescript
import { DefaultApi } from '@ircam/timeside-sdk'
// Use alternative fetch API (for Node / Polyfill)
import portableFetch from 'portable-fetch'


const api = new DefaultApi({
	// API URL
	basepath: 'https://wasabi.telemeta.org',

	// Send cookies with requests
	credentials: 'include',

	// Use alternative fetch API (for Node / Polyfill)
	fetchApi: portableFetch
})

async function callApi () {
	// List items
	const items = await api.listItems({})
	console.log(items)

	// Create an item
	const body = {
		title: 'test'
	}
	const item = await api.createItem({ body })
	console.log(item)
}

try {
	callApi()
} catch (e) {
	if (e.status === 401) {
		console.error(`Woops. Seems like you're not authorized`)
	} else {
		console.error('Something occured', e)
	}
}
```
