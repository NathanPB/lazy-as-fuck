const { expect } = require('chai')
const { describe, it } = require('mocha')
const lazy = require('../src')

describe('#get', () => {
  it('should lazily load the value', () => {
    const prop = lazy(() => 'foo')
    expect(prop.isPresent()).to.equals(false)
    expect(prop.get()).to.equals('foo')
    expect(prop.isPresent()).to.equals(true)
  })

  it('should force compute the value', () => {
    const prop = lazy(() => 'bar')
    expect(prop.isPresent()).to.equals(false)
    prop.forceCompute()
    expect(prop.isPresent()).to.equals(true)
  })

  it('should forget the computed value', () => {
    const prop = lazy(() => 'foobar')
    prop.forceCompute()
    prop.forget()
    expect(prop.isPresent()).to.equals(false)
  })
})
