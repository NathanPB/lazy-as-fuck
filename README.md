Really simple and dependency-free lazy properties for Javascript

```js
const lazy = require('lazyasfk')

const property = lazy(() => 'how could I be more lazy?')

console.log(property.isPresent())   // > false
console.log(property.get())         // > how could I be more lazy?
console.log(property.isPresent())   // > true

property.forget()
console.log(property.isPresent())   // > false
property.forceCompute()
console.log(property.isPresent())   // > true
```

The function names are pretty self-explanatory, I don't need I'll need to write function references for this.
