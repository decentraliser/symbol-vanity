import {dummyFunction} from '../../src/services/dummy'

describe('dummy test', () => {
 it('dummy function', () => {
   expect(dummyFunction(true)).toBeTruthy()
 })
})
