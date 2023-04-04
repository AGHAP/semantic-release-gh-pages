export enum GitHubPagesPathEnum {
  ROOT = "/",
  DOCS = "/docs",
}

export type GitHubPagesPathValue =
  | GitHubPagesPathEnum.ROOT
  | GitHubPagesPathEnum.DOCS;

export interface GitHubPagesOptions {
  src: string;
  srcFullPath: string;
  ghpBranch: string;
  ghpPath: GitHubPagesPathValue;
  ghpFullPath: string;
  message: string;
  cleanupGlob: string | string[];
}
