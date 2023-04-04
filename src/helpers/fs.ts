import path from "path";
import fs from "fs-extra";
import { globby } from "globby";
import type { Options } from "globby";
import { temporaryDirectory } from "tempy";

export async function resolve(...paths: string[]): Promise<string> {
  return path.resolve(...paths);
}

export async function existFile(filePath: string): Promise<boolean> {
  return fs.pathExistsSync(filePath);
}

export async function removeFile(filePath: string): Promise<void> {
  fs.removeSync(filePath);
}

export async function deleteFile(filePath: string): Promise<void> {
  fs.removeSync(filePath);
}

export async function copyFile(src: string, dest: string): Promise<void> {
  fs.copySync(src, dest, { overwrite: true });
}

export async function moveFile(src: string, dest: string): Promise<void> {
  fs.moveSync(src, dest, { overwrite: true });
}

export async function emptyDir(dir: string) {
  fs.emptyDirSync(dir);
}

export async function globMatch(
  pattern: string | string[],
  opts?: Options
): Promise<string[]> {
  return await globby(pattern, opts);
}

export async function tempDir(): Promise<string> {
  return temporaryDirectory();
}
