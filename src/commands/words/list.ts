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
import { command, metadata, Command } from 'clime'

// internal
import { FilesRepository } from '../../repositories/FilesRepository'
import { folders } from '../../config/folders'

const words = FilesRepository.read(folders.wordList)


const wordList = words && words.wordList ? words.wordList : []

@command({
  description: 'List the searched words',
})
export default class extends Command {
 @metadata
  execute() {
    if (!wordList.length) {
      console.info('Nothing to show here!')
      console.info('run "symbol-cli words add" to add a word')
      return
    }
    console.table(wordList)
  }
}
