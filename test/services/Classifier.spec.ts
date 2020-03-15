import { Classifier } from '../../src/services/Classifier'

describe('classifier', () => {
  it('getVanityType should return the proper value', () => {
    const address = 'TDQIWC5KSQH6LIGWH24V7KCFXKSBJKF7ZGCSCOIN'

    expect(Classifier.getVanityType({ address, word: 'tdqiwc' })).toBe('left')
    expect(Classifier.getVanityType({ address, word: 'dqiwc' })).toBe('left')
    expect(Classifier.getVanityType({ address, word: 'coin' })).toBe('right')
    expect(Classifier.getVanityType({ address, word: 'oin' })).toBe('right')
    expect(Classifier.getVanityType({ address, word: 'oi' })).toBe('free')
    expect(Classifier.getVanityType({ address, word: 'GWH24' })).toBe('free')
    expect(Classifier.getVanityType({ address, word: '5ksqh6' })).toBe(2)
    expect(Classifier.getVanityType({ address, word: 'ligwh2' })).toBe(3)
    expect(Classifier.getVanityType({ address, word: '4v7kcf' })).toBe(4)
    expect(Classifier.getVanityType({ address, word: 'xksbjk' })).toBe(5)
    expect(Classifier.getVanityType({ address, word: 'f7zgcs' })).toBe(6)
    expect(Classifier.getVanityType({ address, word: 'coi' })).toBe(7)
  })
})
