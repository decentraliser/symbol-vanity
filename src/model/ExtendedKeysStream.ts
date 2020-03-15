import { Subject } from 'rxjs'
import { MnemonicPassPhrase, ExtendedKey } from 'symbol-hd-wallets'

export type ExtendedKeysStream = Subject<{
  mnemonic: MnemonicPassPhrase,
  extendedKey: ExtendedKey,
}>
