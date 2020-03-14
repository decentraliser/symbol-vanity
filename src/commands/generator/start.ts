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
// external
import {command, metadata, Command} from 'clime'
import {Wallet} from 'symbol-hd-wallets'
import {NetworkType} from 'symbol-sdk'

// internal
import {ExtendedKeysGenerator} from '../../services/ExtendedKeysGenerator'
import {Classifier} from '../../services/Classifier'
import {File} from '../../services/File'

// @TODO: Move out
const paths = [
  'm/44\'/4343\'/0\'/0\'/0\'',
  'm/44\'/4343\'/1\'/0\'/0\'',
  'm/44\'/4343\'/2\'/0\'/0\'',
  'm/44\'/4343\'/3\'/0\'/0\'',
  'm/44\'/4343\'/4\'/0\'/0\'',
  'm/44\'/4343\'/5\'/0\'/0\'',
  'm/44\'/4343\'/6\'/0\'/0\'',
  'm/44\'/4343\'/7\'/0\'/0\'',
  'm/44\'/4343\'/8\'/0\'/0\'',
  'm/44\'/4343\'/9\'/0\'/0\'',
]

// @TODO: CRUD
const searchedWords = [
  'bitcoin',
  'bloody-rookie',
  'bloody',
  'decent',
  'decentraliser',
  'gimre',
  'jaguar',
  'nemesis',
  'rookie',
  'satoshi',
  'shark',
  'sharkito',
  'symbol',
]

// @TODO: Network type as option
@command({
  description: 'Start the vanity address generator',
})
export default class extends Command {
  @metadata
  execute() {
    const extendedKeysGenerator = ExtendedKeysGenerator.create()

    let count = 0
    extendedKeysGenerator.extendedKeys$.subscribe(

      ({extendedKey, mnemonic}) => {
        const wallets = paths.map(path => new Wallet(extendedKey.derivePath(path)))
        const addresses = wallets.map(w => w.getAccount(NetworkType.TEST_NET).address)

        addresses.forEach(address => {
          const plainAddress = address.plain().toLowerCase()

          searchedWords.forEach(word => {
            if (plainAddress.indexOf(word) > -1) {
              const chunkNumber = Classifier.getChunkNumber(address, word)
              
              if (chunkNumber === '') return // @TODO: make it optional
              
              console.info(`Found a ${word} in chunk ${chunkNumber}`)
              
              File.store(
                extendedKey,
                mnemonic,
                addresses,
                word,
                chunkNumber,
              )
            }
          })
        })

        count += 1
        if (count % 500 === 0) {
          console.info(`${count} derivations performed`)
        }
      })

    extendedKeysGenerator.start()
  }
}
