import AggregateError from "aggregate-error";
import type { Config, Context } from "semantic-release";
import * as fs from "./helpers/fs.js";
import { GitHubPagesPathEnum, GitHubPagesOptions } from "./helpers/shared.js";

export async function verifyConditions(
  pluginConfig: GitHubPagesOptions,
  context: Context & Config
): Promise<void> {
  const errors: string[] = [];

  const { message } = pluginConfig;
  let { src, ghpBranch, ghpPath } = pluginConfig;

  src = src || ".";
  ghpBranch = ghpBranch || context.branch?.name || "";
  ghpPath = ghpPath || GitHubPagesPathEnum.docs;

  const srcFullPath: string = await fs.resolve(
    context?.cwd || process.cwd(),
    src
  );
  const ghpFullPath: string = await fs.resolve(
    context?.cwd || process.cwd(),
    `.${ghpPath}`
  );

  if (!message) {
    errors.push("config entry `message` cannot be empty");
  }
  if (!ghpBranch) {
    errors.push("config entry `ghpBranch` is required");
  }
  if (!fs.existFile(srcFullPath)) {
    errors.push("config entry `src` does not refer to a valid directory");
  }
  if (!(ghpPath in GitHubPagesPathEnum)) {
    errors.push("config entry `ghpPath` should be either `root` or `docs`");
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  pluginConfig.src = src;
  pluginConfig.srcFullPath = srcFullPath;
  pluginConfig.ghpBranch = ghpBranch;
  pluginConfig.ghpPath = ghpPath;
  pluginConfig.ghpFullPath = ghpFullPath;
}
