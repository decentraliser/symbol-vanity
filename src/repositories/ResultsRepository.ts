import { FilesRepository } from './FilesRepository'
import { folders } from '../config/folders'

export class ResultsRepository {
  public static listResultFiles(): string[] {
    const files = FilesRepository.readFiles(folders.results)
    if (!files || !files.length) return []

    return files
      .filter((name) => name !== '.gitkeep')
      .map((name) => name.replace('.json', ''))
  }

  public static listFoundWords() {
    const results = ResultsRepository.listResultFiles()
    if (!results || !results.length) return []
    return [...new Set(results.map((word) => word.split('-').shift()))]
  }

  public static listResultsFilesByWord(word: string): string[] {
    const results = ResultsRepository.listResultFiles()
    if (!results || !results.length) return []
    return results
      .filter((fileName) => fileName.split('-').shift() === word)
      .map((name) => name.replace('.json', ''))
  }
}
