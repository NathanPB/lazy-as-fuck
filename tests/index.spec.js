const { expect } = require('chai')
const { describe, it } = require('mocha')
const lazy = require('../src')
const lazyAsync = require('../src/async')

describe('lazyasfk', () => {
  describe('blocking', () => {
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
  })

  describe('async', () => {
    describe('#get', () => {
      it('should lazily async load the value', async () => {
        const prop = lazyAsync(async () => 'foo')
        expect(prop.isPresent()).to.equals(false)
        expect(await prop.get()).to.equals('foo')
        expect(prop.isPresent()).to.equals(true)
      })

      it('should async force compute the value', async () => {
        const prop = lazyAsync(async () => 'bar')
        expect(prop.isPresent()).to.equals(false)
        await prop.forceCompute()
        expect(prop.isPresent()).to.equals(true)
      })

      it('should forget the computed value', async () => {
        const prop = lazyAsync(async () => 'foobar')
        await prop.forceCompute()
        prop.forget()
        expect(prop.isPresent()).to.equals(false)
      })
    })
  })
})
