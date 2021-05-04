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
import { ExtendedKey, Wallet, MnemonicPassPhrase } from 'symbol-hd-wallets'
import { Account, NetworkType } from 'symbol-sdk'
import derivationPaths from '../../assets/paths.json'
import { Match } from '../model/Match'
import { Classifier, VanityType } from './Classifier'
import { Results } from './Results'
import { WordFinder } from './WordFinder'

export class ExtendedKeyHandler {
  public static handleNewItem(
    extendedKey: ExtendedKey,
    mnemonic: MnemonicPassPhrase,
    wordFinder: WordFinder,
    networkType: NetworkType,
    chosenVanityTypes: VanityType[],
  ): void {
    const paths = [...derivationPaths.paths]

    // get addresses from the extended key
    const addresses = paths
      .map((path) => new Wallet(extendedKey.derivePath(path)))
      .map((wallet) => Account.createFromPrivateKey(wallet.getAccountPrivateKey(), NetworkType[networkType] as any).address)

    // get matches
    const matches: Match[] = wordFinder.getMatches(addresses.map((address) => address.plain()))
    if (!matches.length) return

    // get matches vanity types and store files
    matches.forEach((match: Match) => {
      const vanityType = Classifier.getVanityType(match)

      if (!chosenVanityTypes.includes(vanityType)) return

      console.info('New match!')
      console.table({ ...match, vanityType })

      Results.store(
        extendedKey,
        mnemonic,
        addresses,
        match.word,
        vanityType,
      )
    })
  }
}
