# symbol-vanity

# introduction
Symbol Vanity will try to generate an address with words of your choice.

# environment
node 12

# installation
npm i

# usage
1. put the words you look for in `src/commands/generator/start.ts/searchedWords`
2. run `tsc`
3. run `./bin/symbol-vanity generator start`
4. found vanity addresses will appear in the `./results` folder
5. import the mnemonic in `symbol-desktop-wallet` to use your address

## Concept of Vanity Type
As a word could be in any position in an address, I introduced a "Vanity Type" classification
### Left
The world starts at the first or second character of the address
#### examples:
Searched word: `TOOL`
address: `TOOLCH-QVTCDN-42YROV-WLMAPB-LD55ZS-756IPJ-PB67`
Searched word: `COOL`
address: `TCOOLC-QVTCDN-42YROV-WLMAPB-LD55ZS-756IPJ-PB67`

### Right
The word is in the last characters of an address
#### example:
Searched word: `SYMBOL`
address: `TCOOLC-QVTCDN-42YROV-WLMAPB-LD55ZS-756ISY-MBOL`

### Chunk number
The first letter of the word matches the first letter of a pretty address chunk

#### example of chunk 2:
Searched word: `THIS`
address: `TCOOLC-THISI-AWESOM-EEOMEA-LD55ZS-756ISY-MBOL`

#### example of chunk 3:
Searched word: `AWESOME`
address: `TCOOLC-THISI-AWESOM-EEOMEA-LD55ZS-756ISY-MBOL`

### Free
Any word match that does not fit one of the above category
Searched word: `VANITY`
address: `TALBSJ-E7WK5S-QL5VAN-ITYGYG-RX67AZ-V7GZX2-M7TJ`

# development
`npm run dev`
