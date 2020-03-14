import {Address} from 'symbol-sdk'

/**
 * Qualifies the vanity type
 */
export class Classifier {
  /**
   * Returns the position a searched word in a pretty address chunk
   * Or an empty string
   * @static
   * @param {Address} address
   * @param {string} word
   * @returns {string}
   */
  public static getChunkNumber(address: Address, word: string): string {
    const chunkPositions = [
      {chunkNumber: 1, firstChar: 0},
      // the first letter of an address depends on the network
      {chunkNumber: 1, firstChar: 1}, 
      {chunkNumber: 2, firstChar: 6},
      {chunkNumber: 3, firstChar: 12},
      {chunkNumber: 4, firstChar: 18},
      // @TODO
      {chunkNumber: 5, firstChar: 24},
      {chunkNumber: 6, firstChar: 30},
      {chunkNumber: 6, firstChar: 31},
      {chunkNumber: 6, firstChar: 32},
      {chunkNumber: 6, firstChar: 33},
      {chunkNumber: 6, firstChar: 34},
      {chunkNumber: 6, firstChar: 35},
      {chunkNumber: 7, firstChar: 36},
      {chunkNumber: 7, firstChar: 37},
      {chunkNumber: 7, firstChar: 38},
      {chunkNumber: 7, firstChar: 39},
    ]

    const plainAddress = address.plain().toLowerCase()
    const addressLength = 40
    const wordLength = word.length


    for (const {chunkNumber, firstChar} of chunkPositions) {
      if (wordLength > addressLength - firstChar) return ''
      const chunk = plainAddress.substring(firstChar, wordLength + firstChar)
      if (chunk === word) return `${chunkNumber}`
    }

    return ''
  }
}
