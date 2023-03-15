import path from "path";
import fs from "fs-extra";

export async function resolve(...paths: string[]): Promise<string> {
  return path.resolve(...paths);
}

export async function existFile(filePath: string): Promise<boolean> {
  return fs.pathExistsSync(filePath);
}

export async function removeFile(filePath: string): Promise<void> {
  fs.removeSync(filePath);
}

export async function moveFile(src: string, dest: string): Promise<void> {
  fs.moveSync(src, dest, { overwrite: true });
}
