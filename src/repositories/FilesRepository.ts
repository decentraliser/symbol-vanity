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
import fs from 'fs'
import path from 'path'
import { Folder } from '../model/Folder'

const homedir = require('os').homedir()

const filesdir = 'symbol-vanity-files'

export class FilesRepository {
  public static save(folder: Folder, content: string, fileName?: string): void {
    this.testFolder(folder)
    const fullPath = fileName ? `${folder.path}/${fileName}` : `${folder.path}/${folder.name}`
    fs.writeFileSync(FilesRepository.getFilePath(fullPath), content)
  }

  public static read(folder: Folder, fileName?: string): any | false {
    try {
      this.testFolder(folder)
      const fullPath = fileName
        ? `${folder.path}/${fileName}`
        : `${folder.path}/${folder.name}`

      const fileContent = fs.readFileSync(FilesRepository.getFilePath(fullPath)).toString()
      return JSON.parse(fileContent)
    } catch (error) {
      return false
    }
  }

  public static readFiles(folder: Folder): string[] | false {
    try {
      this.testFolder(folder)
      return fs.readdirSync(this.getPath(folder.path))
    } catch (error) {
      return false
    }
  }

  public static getFilePath(pathSuffix: string): string {
    return `${this.getPath(pathSuffix)}.json`
  }

  public static getPath(pathSuffix?: string): string {
    return path.join(homedir, filesdir, `${pathSuffix || ''}`)
  }

  public static delete(folder: Folder, fileName?: string): void {
    const fullPath = fileName ? `${folder.path}/${fileName}` : `${folder.path}/${folder.name}`
    fs.unlinkSync(FilesRepository.getFilePath(fullPath))
  }

  public static testFolder(folder: Folder): void {
    this.existsOrCreate()
    this.existsOrCreate(folder.path)
  }

  public static existsOrCreate(pathSuffix?: string): void {
    const folderPath = this.getPath(pathSuffix)
    if (fs.existsSync(folderPath)) return
    fs.mkdirSync(folderPath)
  }
}
