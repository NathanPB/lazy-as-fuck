Really simple and dependency-free lazy properties for Javascript

```js
const lazy = require('lazyasfk')
const lazyAsync = require('lazyasfk/async')

const property = lazy(() => 'how could I be more lazy?')

console.log(property.isPresent())   // > false
console.log(property.get())         // > how could I be more lazy?
console.log(property.isPresent())   // > true

property.forget()
console.log(property.isPresent())   // > false
property.forceCompute()
console.log(property.isPresent())   // > true

// Also async

const expensiveAndTimeConsumingHttpRequestOrSomethingIdk = async () => 'foobar'

const lazyProperty = lazyAsync(expensiveAndTimeConsumingHttpRequestOrSomethingIdk)
console.log(lazyProperty.isPresent())   // > false
console.log(lazyProperty.get())         // > obviously not foobar
console.log(lazyProperty.isPresent())   // > true

lazyProperty.forget()
console.log(lazyProperty.isPresent())   // > false
lazyProperty.forceCompute()
console.log(lazyProperty.isPresent())   // > true
```

The function names are pretty self-explanatory, I don't need I'll need to write function references for this.
