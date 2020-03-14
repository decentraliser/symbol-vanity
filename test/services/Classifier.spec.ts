import {Address} from 'symbol-sdk'
import {Classifier} from '../../src/services/Classifier'

describe('classifier', () => {
  it('getChunkNumber should return the proper string', () => {
    const testAddress = 'TDQIWC-5KSQH6-LIGWH2-4V7KCF-XKSBJK-F7ZGCS-COIN'
    const address = Address.createFromRawAddress(testAddress)

    expect(Classifier.getChunkNumber(address, 'nonono')).toBe('')
    expect(Classifier.getChunkNumber(address, 'tdqiwc')).toBe('1')
    expect(Classifier.getChunkNumber(address, 'dqiwc')).toBe('1')
    expect(Classifier.getChunkNumber(address, '5ksqh6')).toBe('2')
    expect(Classifier.getChunkNumber(address, 'ligwh2')).toBe('3')
    expect(Classifier.getChunkNumber(address, '4v7kcf')).toBe('4')
    expect(Classifier.getChunkNumber(address, 'xksbjk')).toBe('5')
    expect(Classifier.getChunkNumber(address, 'f7zgcs')).toBe('6')
    expect(Classifier.getChunkNumber(address, 'coin')).toBe('7')
    expect(Classifier.getChunkNumber(address, 'oin')).toBe('7')
    expect(Classifier.getChunkNumber(address, 'in')).toBe('7')
    expect(Classifier.getChunkNumber(address, 'n')).toBe('7')
  })
})
