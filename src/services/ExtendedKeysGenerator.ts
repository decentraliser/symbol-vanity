// external
import { Subject } from 'rxjs'
import { startWith } from 'rxjs/operators'

// internal
import { MnemonicPassPhrase, ExtendedKey } from 'symbol-hd-wallets'
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
          const extendedKey = ExtendedKey.createFromSeed(mnemonic.toSeed().toString('hex'))
          this.extendedKeys$.next({ mnemonic, extendedKey })
        }
      })
  }
}
