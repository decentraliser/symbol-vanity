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

describe('Classifier', () => {
  const address = 'TCHPTCZELKN2MJRSRW7T7HW5ROBL5BBSDVNIZ7I'

  test.each`
    address | word | expected
    ${address} | ${'tchptc'} | ${'left'}
    ${address} | ${'niz7i'} | ${'right'}
    ${address} | ${'obl'} | ${'free'}
    ${address} | ${'zelkn2'} | ${2}
    ${address} | ${'mjrsrw'} | ${3}
    ${address} | ${'7t7hw5'} | ${4}
    ${address} | ${'robl5b'} | ${5}
    ${address} | ${'bsdvni'} | ${6}
    ${address} | ${'z7'} | ${7}
  `('#getVanityType({ address: $address, word: $word }) should return "$expected"', ({ word, expected }) => {
  expect(Classifier.getVanityType({ address, word })).toBe(expected)
})
})
