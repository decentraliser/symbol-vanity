/* eslint-disable class-methods-use-this */
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
import { Subject } from 'rxjs'
import { startWith } from 'rxjs/operators'

// internal
import { MnemonicPassPhrase, ExtendedKey, Network } from 'symbol-hd-wallets'
import { ExtendedKeysStream } from '../model/ExtendedKeysStream'

export class ExtendedKeysGenerator {
  private routineController: Subject<boolean>

  public extendedKeys$: ExtendedKeysStream

  public static create(): ExtendedKeysGenerator {
    return new ExtendedKeysGenerator()
  }

  public kill(): void {
    // @TODO
  }

  private constructor() {
    this.routineController = new Subject()
    this.extendedKeys$ = new Subject()
  }

  public start(): void {
    this.routineController
      .pipe(startWith(true))
      .subscribe(async (continueRoutine) => {
        if (!continueRoutine) {
          this.kill()
          return
        }

        // @TODO: Use a generator to enable killing the process
        while (continueRoutine) {
          const mnemonic = MnemonicPassPhrase.createRandom()
          const extendedKey = ExtendedKey.createFromSeed(mnemonic.toSeed().toString('hex'), Network.SYMBOL)
          this.extendedKeys$.next({ mnemonic, extendedKey })
        }
      })
  }
}
