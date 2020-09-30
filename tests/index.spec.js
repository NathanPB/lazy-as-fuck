const { use: chaiUse, expect } = require('chai')
const { describe, it } = require('mocha')
const chaiAsPromised = require('chai-as-promised')

const lazy = require('../src')
const lazyAsync = require('../src/async')

chaiUse(chaiAsPromised)

describe('lazyasfk', () => {
  describe('blocking', () => {
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

    it('should throw on compute', () => {
      const prop = lazy(() => { throw new Error("throw me") })
      expect(() => prop.forceCompute()).to.throw()
      expect(prop.isPresent()).to.be.false;
    })

    it('should lazily load the value with props', () => {
      const prop = lazy((a, b) => `${a} ${b}`)
      expect(prop.get('foo', 'bar')).to.equal('foo bar')
      expect(prop.get('bar', 'boo')).to.equal('foo bar') // This is not memoization!!
    })
  })

  describe('async', () => {
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

    it('should throw on compute', async () => {
      const prop = lazyAsync(async () => { throw new Error("throw me") })
      expect(prop.forceCompute()).to.eventually.be.rejected;
      expect(prop.isPresent()).to.be.false;
    })

    it('should lazily load the value with props', async () => {
      const prop = lazyAsync(async (a, b) => `${a} ${b}`)
      expect(await prop.get('foo', 'bar')).to.equal('foo bar')
      expect(await prop.get('bar', 'boo')).to.equal('foo bar') // This is not memoization!!
    })
  })
})
