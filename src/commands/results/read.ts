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
import prompts from 'prompts'

// internal
import { ResultsRepository } from '../../repositories/ResultsRepository'
import { FilesRepository } from '../../repositories/FilesRepository'
import { folders } from '../../config/folders'

@command({
  description: 'List all the vanity addresses files',
})
export default class extends Command {
  @metadata
  async execute() {
    const wordChoices = [
      { title: 'Show all', value: 'all' },
      ...ResultsRepository.listFoundWords()
        .map((word) => ({ title: word, value: word })),
    ]

    const questions1: any = [
      {
        type: 'select',
        name: 'chosenWord',
        message: 'chose a word or all to see the available vanity addresses',
        choices: wordChoices,
      },
    ]

    const responses1 = await prompts(questions1)

    const availableFiles = responses1.chosenWord === 'all'
      ? ResultsRepository.listResultFiles()
      : ResultsRepository.listResultsFilesByWord(responses1.chosenWord)

    const filesChoices = availableFiles.map(
      (fileName) => ({ title: fileName, value: fileName }),
    )

    const questions2: any = [
      {
        type: 'select',
        name: 'chosenFile',
        message: 'chose a file',
        choices: filesChoices,
      },
    ]

    const responses2 = await prompts(questions2)

    const fileContent = FilesRepository.read(folders.results, responses2.chosenFile)
    console.info('mnemonic', fileContent.mnemonic)
    console.table(fileContent.addresses)

    const questions3: any = [
      {
        type: 'confirm',
        name: 'delete',
        message: 'Do you want to delete this file?',
        initial: false,
      },
    ]

    const responses3 = await prompts(questions3)
    if (responses3.delete) FilesRepository.delete(folders.results, responses2.chosenFile)
  }
}
