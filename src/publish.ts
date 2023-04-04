import { GitHubPagesOptions, GitHubPagesPathEnum } from "./helpers/shared.js";
import * as git from "./helpers/git.js";
import * as fs from "./helpers/fs.js";

export async function publish(pluginConfig: GitHubPagesOptions): Promise<void> {
  const tempDir = await fs.tempDir();

  // Copy source to temporary directory
  const srcFiles = await fs.globMatch("./**/*", {
    cwd: pluginConfig.srcFullPath,
  });
  for (const srcFile of srcFiles) {
    const srcFilePath = await fs.resolve(pluginConfig.srcFullPath, srcFile);
    const tmpFilePath = await fs.resolve(tempDir, srcFile);
    await fs.copyFile(srcFilePath, tmpFilePath);
  }

  // Switch to target branch
  await git.resetBranch();
  await git.checkoutBranch(pluginConfig.ghpBranch);

  // Cleanup target branch
  await git.resetWorkspace();
  if (pluginConfig.ghpPath === GitHubPagesPathEnum.ROOT) {
    const cleanupFiles = await fs.globMatch(pluginConfig.cleanupGlob, {
      cwd: pluginConfig.ghpFullPath,
    });
    for (const cleanupFile of cleanupFiles) {
      const cleanupFilePath = await fs.resolve(
        pluginConfig.ghpFullPath,
        cleanupFile
      );
      await fs.removeFile(cleanupFilePath);
    }
  } else {
    await fs.emptyDir(pluginConfig.ghpFullPath);
  }

  // Copy temporaryfiles back
  for (const srcFile of srcFiles) {
    const tmpFilePath = await fs.resolve(tempDir, srcFile);
    const destFilePath = await fs.resolve(pluginConfig.ghpFullPath, srcFile);
    await fs.copyFile(tmpFilePath, destFilePath);
  }

  // Commit and push to git
  await git.stage(["."]);
  await git.commit(pluginConfig.message);
  await git.push();
}
