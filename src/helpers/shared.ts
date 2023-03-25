export enum GitHubPagesPathEnum {
  root = "/",
  docs = "/docs",
}

export type GitHubPagesPath = GitHubPagesPathEnum;

export interface GitHubPagesOptions {
  src: string;
  srcFullPath: string;
  ghpBranch: string;
  ghpPath: GitHubPagesPath;
  ghpFullPath: string;
  message: string;
}
