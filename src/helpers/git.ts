import { $ } from "execa";

export async function resetBranch(): Promise<void> {
  await $`git checkout -f`;
}

export async function checkoutBranch(branch: string): Promise<void> {
  await $`git checkout -f ${branch}`;
}

export async function stashDir(src: string): Promise<void> {
  await $`git stash clear`;
  await $`git stash push -u ${src}`;
}

export async function restoreDir(): Promise<void> {
  await $`git stash pop`;
  await $`git stash clear`;
}

export async function stage(globs: string[]): Promise<void> {
  for (const glob of globs) {
    await $`git add -f ${glob}`;
  }
}

export async function commit(message: string): Promise<void> {
  await $`git commit -m "${message}"`;
}

export async function push(): Promise<void> {
  await $`git pull -r --autostash`;
  await $`git push`;
}
