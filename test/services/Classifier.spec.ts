/*
 * MIT License
 *
 * Copyright (c) 2020 Decentraliser
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
