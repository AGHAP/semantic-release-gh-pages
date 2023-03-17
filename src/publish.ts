import { GitHubPagesOptions } from "./helpers/shared";
import * as git from "./helpers/git";
import * as fs from "./helpers/fs";

export async function publish(pluginConfig: GitHubPagesOptions): Promise<void> {
  await git.stashDir(pluginConfig.srcFullPath);
  await git.checkoutBranch(pluginConfig.ghpBranch);
  await git.restoreDir();
  await fs.moveFile(pluginConfig.srcFullPath, pluginConfig.ghpFullPath);
  await fs.removeFile(pluginConfig.srcFullPath);
  await git.stage(["."]);
  await git.commit(pluginConfig.message);
  await git.push();
}
