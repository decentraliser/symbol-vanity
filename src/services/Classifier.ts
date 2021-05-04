/* eslint-disable no-restricted-syntax */
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
import { Match } from '../model/Match'

const ADDRESS_LENGTH = 40

/**
 * Representation of a pretty address chunks
 */
export type ChunkNumber = 2 | 3 | 4 | 5 | 6 | 7
/**
 * Classifies the way a word shows in an address
 * left: at the left of the address, starting from the first or second letter
 * right: at the right ot the address
 * number: the first link being at the beginning of pretty address chunk
 * free: none of the above
 */
export type VanityType = 'left' | 'right' | 'free' | ChunkNumber

/**
 * Qualifies the vanity type
 */
export class Classifier {
  private readonly plainAddress: string

  /**
   * Returns the position a searched word in a pretty address chunk
   * Or an empty string
   * @static
   * @param {Address} address
   * @param {string} word
   * @returns {string}
   */
  public static getVanityType(match: Match): VanityType {
    const classifier = new Classifier(match.address, match.word)

    if (classifier.right()) return 'right'
    if (classifier.left()) return 'left'
    const chunkNumber = classifier.getChunkNumber()
    return chunkNumber || 'free'
  }

  private constructor(
    plainAddress: string,
    private readonly word: string,
  ) {
    this.plainAddress = plainAddress.toLowerCase()
  }

  /**
   * Determines if the word is at the left of the address
   * @private
   * @returns {boolean}
   */
  private left(): boolean {
    // An address first letter is dependent on the network type
    // We consider a word starting on the second letter as a valid "right" vanity
    const leftChunk = this.plainAddress.substring(0, this.word.length + 1)
    return leftChunk.indexOf(this.word) > -1
  }

  /**
   * Determines if the word is at the right of the address
   * @private
   * @returns {boolean}
   */
  private right(): boolean {
    const rightChunk = this.plainAddress.substring(ADDRESS_LENGTH - this.word.length)
    return rightChunk === this.word
  }

  /**
   * Returns a number if the word's first letter
   * is the first of a pretty address chunk
   * @private
   * @returns {(number | false)}
   */
  private getChunkNumber(): ChunkNumber | false {
    const chunkPositions: {chunkNumber: ChunkNumber, charPosition: number}[] = [
      { chunkNumber: 2, charPosition: 6 },
      { chunkNumber: 3, charPosition: 12 },
      { chunkNumber: 4, charPosition: 18 },
      { chunkNumber: 5, charPosition: 24 },
      { chunkNumber: 6, charPosition: 30 },
      { chunkNumber: 7, charPosition: 36 },
    ]

    for (const { chunkNumber, charPosition } of chunkPositions) {
      if (this.word.length > ADDRESS_LENGTH - charPosition) return false
      const chunk = this.plainAddress.substring(
        charPosition, this.word.length + charPosition,
      )
      if (chunk === this.word) return chunkNumber
    }

    return false
  }
}
