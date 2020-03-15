import {Match} from '../model/Match'
import words from '../assets/wordList.json'

const { wordList } = words

export class WordFinder {
  public readonly wordList: string[]

  public static create(): WordFinder {
    return new WordFinder()
  }

  private constructor() {
    this.wordList = wordList
  }

  public getMatches(addresses: string[]): Match[] {
    return this.wordList
      .map((word) => {
        const matchedAddress = addresses.find((address) => address.toLowerCase().includes(word))
        if (!matchedAddress) return null
        return { address: matchedAddress, word }
      })
      .filter((x) => x) as Match[]
  }
}
