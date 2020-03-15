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
import { folders } from '../config/folders'
import { FilesRepository } from '../repositories/FilesRepository'

export class WordsRepository {
  public static add(newWord: string) {
    const oldWordFile = FilesRepository.read(folders.wordList)
    const oldWordList: string [] = oldWordFile && oldWordFile.wordList
      ? oldWordFile.wordList : []

    // Skip if duplicate
    if (oldWordList.some((word) => word === newWord)) return

    const newWordList = [...oldWordList, newWord.toString().toLowerCase()]
    const newFileContent = { wordList: newWordList }
    FilesRepository.save(folders.wordList, JSON.stringify(newFileContent))
  }

  public static wipe() {
    FilesRepository.save(folders.wordList, JSON.stringify({ wordList: [] }))
  }

  public static getWordList(): string[] {
    const file = FilesRepository.read(folders.wordList)
    return file && file.wordList ? file.wordList : []
  }

  public static deleteByValue(wordToDelete: string): void {
    const oldWordFile = FilesRepository.read(folders.wordList)
    const oldWordList = oldWordFile && oldWordFile.wordList ? oldWordFile.wordList : []
    const indexToDelete = oldWordList.indexOf(wordToDelete)
    if (indexToDelete === -1) return
    oldWordList.splice(indexToDelete, 1)
    const newFileContent = { wordList: oldWordList }
    FilesRepository.save(folders.wordList, JSON.stringify(newFileContent))
  }
}
