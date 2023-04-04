import _ from "lodash";
import * as fs from "./fs.js";

export enum GitHubPagesPathEnum {
  ROOT = "/",
  DOCS = "/docs",
}

export type GitHubPagesPathValue =
  | GitHubPagesPathEnum.ROOT
  | GitHubPagesPathEnum.DOCS;

export interface GitHubPagesOptions {
  src: string;
  ghpBranch: string;
  ghpPath: GitHubPagesPathValue;
  message: string;
  cleanupGlob: string | string[];
}

function getBase(cwd?: string): string {
  return cwd || process.cwd();
}

export async function getSrc(
  opts: GitHubPagesOptions,
  cwd?: string
): Promise<string> {
  const src = opts.src;
  const base = getBase(cwd);
  return await fs.resolve(base, src);
}

export function getGhpBranch(opts: GitHubPagesOptions): string {
  return opts.ghpBranch || "gh-pages";
}

export function validateGhpPath(opts: GitHubPagesOptions): boolean {
  const ghpPath = opts.ghpPath;
  return (
    ghpPath === GitHubPagesPathEnum.ROOT || ghpPath === GitHubPagesPathEnum.DOCS
  );
}

export async function getGhpPath(
  opts: GitHubPagesOptions,
  cwd?: string
): Promise<string> {
  const ghpPath = opts.ghpPath;
  const base = getBase(cwd);
  return await fs.resolve(base, `.${ghpPath}`);
}

export function getMessage(opts: GitHubPagesOptions): string {
  return opts.message || "chore: GitHub Pages release";
}

export function getCleanupGlob(opts: GitHubPagesOptions): string[] {
  const cleanupGlob = opts.cleanupGlob;
  if (_.isNil(cleanupGlob)) {
    return ["./**/*", "!.github", "!.git*", "!./node_modules"];
  }

  return _.castArray(cleanupGlob);
}
