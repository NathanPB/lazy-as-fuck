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

// Also works with params

// NOTE THAT THIS IS NOT MEMOIZATION!!!!!!!!!!!!!!!!!!!!!!!!
// THE PARAMS ARE USED ONLY FOR THE EVALUATION WHEN THE VALUE IS NOT PRESENT
// CHANGING THE PARAMS OF A PRESENT PROPERTY WILL NOT CHANGE THE OUTPUT

const withParams = lazy((a, b) => a + b) // Works with lazyAsync too
console.log(withParams.get(77, 33)) // > 100

```

The function names are pretty self-explanatory, I don't need I'll need to write function references for this.
