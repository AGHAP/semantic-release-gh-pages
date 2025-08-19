import { execa } from 'execa'

export async function resetWorkspace(): Promise<void> {
  await execa('git', ['clean', '-f', '-d', '-x', '-q'])
}

export async function resetBranch(): Promise<void> {
  await execa('git', ['checkout', '-f'])
}

export async function checkoutBranch(branch: string): Promise<void> {
  await execa('git', ['checkout', branch])
}

export async function stashDir(src: string): Promise<void> {
  await execa('git', ['stash', 'clear'])
  await execa('git', ['stash', 'push', '-u', src])
}

export async function restoreDir(): Promise<void> {
  await execa('git', ['stash', 'pop'])
  await execa('git', ['stash', 'clear'])
}

export async function stage(globs: string[]): Promise<void> {
  for (const glob of globs) {
    await execa('git', ['add', '-f', glob])
  }
}

export async function commit(message: string): Promise<void> {
  await execa('git', ['commit', '-m', message])
}

export async function push(): Promise<void> {
  await execa('git', ['pull', '-r', '--autostash'])
  await execa('git', ['push'])
}
