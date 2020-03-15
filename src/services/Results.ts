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
import { ExtendedKey, MnemonicPassPhrase } from 'symbol-hd-wallets'
import { Address } from 'symbol-sdk'
import { FilesRepository } from '../repositories/FilesRepository'
import { folders } from '../config/folders'
import { VanityType } from './Classifier'

export class Results {
  private fileContent: string

  /**
   * Creates and store a file
   * @static
   * @param {ExtendedKey} extendedKey
   * @param {MnemonicPassPhrase} mnemonic
   * @param {Address[]} addresses
   * @param {string} searchedWord
   * @param {chunkNumber} [vanityType]
   */
  public static store(
    extendedKey: ExtendedKey,
    mnemonic: MnemonicPassPhrase,
    addresses: Address[],
    searchedWord: string,
    vanityType: VanityType,
  ): void {
    try {
      new Results(extendedKey, mnemonic, addresses, searchedWord, vanityType).save()
    } catch (error) {
      console.error(error)
    }
  }

  private constructor(
    private extendedKey: ExtendedKey,
    private mnemonic: MnemonicPassPhrase,
    private addresses: Address[],
    private searchedWord: string,
    private vanityType: VanityType,
  ) {
    this.fileContent = this.getFileContent()
  }

  private getFileName(): string {
    const fileNonce = this.extendedKey.getPublicKey().toString('hex')
    const classification = this.vanityType.toString().toUpperCase()
    return `${this.searchedWord.toUpperCase()}-${classification}-${fileNonce}`
  }

  private getFileContent(): string {
    return JSON.stringify({
      mnemonic: this.mnemonic.plain,
      addresses: this.addresses.map((a) => a.pretty()),
    })
  }

  private save(): void {
    FilesRepository.save(folders.results, this.fileContent, this.getFileName())
  }
}
