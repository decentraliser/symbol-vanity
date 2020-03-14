// external
import fs from 'fs'
import path from 'path'
import {ExtendedKey, MnemonicPassPhrase} from 'symbol-hd-wallets'
import {Address} from 'symbol-sdk'

export class File {
  private filePath: string
  private fileContent: string

  /**
   * Creates and store a file
   * @static
   * @param {ExtendedKey} extendedKey
   * @param {MnemonicPassPhrase} mnemonic
   * @param {Address[]} addresses
   * @param {string} searchedWord
   * @param {string} [chunkNumber]
   */
  public static store(
    extendedKey: ExtendedKey,
    mnemonic: MnemonicPassPhrase,
    addresses: Address[],
    searchedWord: string,
    chunkNumber?: string,
  ): void {
    try {
      new File(extendedKey, mnemonic, addresses, searchedWord, chunkNumber).save()
    } catch (error) {
      console.error(error)
    }
  }

  private constructor(
    private extendedKey: ExtendedKey,
    private mnemonic: MnemonicPassPhrase,
    private addresses: Address[],
    private searchedWord: string,
    private chunkNumber?: string,
  ) {
    this.filePath = this.getFilePath()
    this.fileContent = this.getFileContent()
  }

  private getFilePath(): string {
    const fileNonce = this.extendedKey.getPublicKey().toString('hex')
    return path.join(
      __dirname,
      `../../../results/${this.searchedWord.toUpperCase()}-${this.chunkNumber || ''}-${fileNonce}.json`
    )
  }

  private getFileContent(): string {
    return JSON.stringify({
      mnemonic: this.mnemonic.plain,
      addresses: this.addresses.map(a => a.pretty()),
    })
  }

  private save(): void {
    fs.writeFileSync(this.filePath, this.fileContent)
  }
}
