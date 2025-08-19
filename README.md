# semantic-release-gh-pages

[![npm](https://img.shields.io/npm/v/@aghap/semantic-release-gh-pages.svg)][npm]
[![license](https://img.shields.io/github/license/AGHAP/semantic-release-gh-pages.svg)][license]
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)][semantic-release]

A GitHub Pages release plugin for [Semantic Release][semantic-release].

Automate publishing your static files to GitHub Pages with Semantic Release.

## Requirements

- Your repository must be hosted on GitHub
- GitHub Pages must be enabled in your repository settings
- The configured source directory must exist and contain the files you want to publish

## Installation

```bash
npm install --save-dev @aghap/semantic-release-gh-pages
# or
yarn add --dev @aghap/semantic-release-gh-pages
# or
pnpm add --save-dev @aghap/semantic-release-gh-pages
```

## Usage

Add the plugin to your Semantic Release configuration:

### Basic Configuration

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@aghap/semantic-release-gh-pages"
  ]
}
```

### Advanced Configuration

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@aghap/semantic-release-gh-pages",
      {
        "src": "dist",
        "ghpBranch": "gh-pages",
        "ghpPath": "/",
        "message": "chore: release ${nextRelease.version} [skip ci]",
        "cleanupGlob": ["./**/*", "!.github", "!.git*"]
      }
    ]
  ]
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `src` | `string` | - | **Required**. The path to the directory containing files to publish |
| `ghpBranch` | `string` | `'gh-pages'` | The branch to publish to |
| `ghpPath` | `string` | `'/'` | The path within the branch to publish to. Can be `/` or `/docs` |
| `message` | `string` | `'chore: GitHub Pages release'` | The commit message template |
| `cleanupGlob` | `string \| string[]` | `['./**/*', '!.github', '!.git*']` | Globs to clean up before publishing |

## License

MIT

<!-- LINKS -->

[npm]: https://www.npmjs.com/package/@aghap/semantic-release-gh-pages
[license]: LICENSE
[semantic-release]: https://github.com/semantic-release/semantic-release
