import type { Config, Context } from 'semantic-release'
import type {
  GitHubPagesOptions,
} from './helpers/config'
import {
  getCleanupGlob,
  getGhpBranch,
  getGhpPath,
  getMessage,
  getSrc,
  GitHubPagesPathEnum,
} from './helpers/config'
import * as fs from './helpers/fs'
import * as git from './helpers/git'

export async function publish(
  pluginConfig: GitHubPagesOptions,
  context: Context & Config,
): Promise<void> {
  const tempDir = await fs.tempDir()
  const currDir = context?.cwd

  const ghpBranch = getGhpBranch(pluginConfig)
  const srcFullPath = await getSrc(pluginConfig, currDir)
  const ghpFullPath = await getGhpPath(pluginConfig, currDir)
  const message = getMessage(pluginConfig)
  const cleanupGlob = getCleanupGlob(pluginConfig)

  // Copy source to temporary directory
  const srcFiles = await fs.globMatch('./**/*', {
    cwd: srcFullPath,
  })
  for (const srcFile of srcFiles) {
    const srcFilePath = await fs.resolve(srcFullPath, srcFile)
    const tmpFilePath = await fs.resolve(tempDir, srcFile)
    await fs.copyFile(srcFilePath, tmpFilePath)
  }

  // Switch to target branch
  await git.resetBranch()
  await git.checkoutBranch(ghpBranch)

  // Cleanup target branch
  await git.resetWorkspace()
  if (pluginConfig.ghpPath === GitHubPagesPathEnum.ROOT) {
    const cleanupFiles = await fs.globMatch(cleanupGlob, {
      cwd: ghpFullPath,
    })
    for (const cleanupFile of cleanupFiles) {
      const cleanupFilePath = await fs.resolve(ghpFullPath, cleanupFile)
      await fs.removeFile(cleanupFilePath)
    }
  }
  else {
    await fs.emptyDir(ghpFullPath)
  }

  // Copy temporaryfiles back
  for (const srcFile of srcFiles) {
    const tmpFilePath = await fs.resolve(tempDir, srcFile)
    const destFilePath = await fs.resolve(ghpFullPath, srcFile)
    await fs.copyFile(tmpFilePath, destFilePath)
  }

  // Commit and push to git
  await git.stage(['.'])
  await git.commit(message)
  await git.push()
}
