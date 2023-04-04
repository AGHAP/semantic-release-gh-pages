import AggregateError from "aggregate-error";
import type { Config, Context } from "semantic-release";
import * as fs from "./helpers/fs.js";
import {
  GitHubPagesOptions,
  getSrc,
  validateGhpPath,
} from "./helpers/config.js";

export async function verifyConditions(
  pluginConfig: GitHubPagesOptions,
  context: Context & Config
): Promise<void> {
  const errors: string[] = [];

  const currDir = context?.cwd;
  const srcFullPath = await getSrc(pluginConfig, currDir);

  if (!fs.existFile(srcFullPath)) {
    errors.push("config entry `src` does not refer to a valid directory");
  }
  if (!validateGhpPath(pluginConfig)) {
    errors.push("config entry `ghpPath` should be either `/` or `/docs`");
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
}
