# Release Workflow

## Channels

| Channel | Trigger | npm tag | crates.io | Version format |
|---|---|---|---|---|
| **beta** | Push to `main` | `beta` | No | `{version}-beta.{sha}` |
| **pr** | PR commit | `pr-{N}` | No | `{version}-pr-{N}.{sha}` |
| **stable** | release-plz release | `latest` | Yes | `{version}` |

Version is read from `Cargo.toml` (managed by release-plz via conventional commits).

## CI Workflows

| Workflow | Description |
|---|---|
| **Publish CLI npm package** | Builds CLI binary for 6 platforms, publishes `@jpwesselink/release-playground` |
| **Publish Core npm package** | Builds NAPI native module for 6 platforms, publishes `@jpwesselink/release-playground-core` |
| **Release-plz** | Analyzes conventional commits, creates release PRs, publishes to crates.io |

## Stable Release Flow

1. Conventional commits land on `main`
2. release-plz opens a "chore: release" PR with bumped versions
3. You merge the PR
4. release-plz publishes to crates.io and creates a GitHub release
5. The GitHub release automatically triggers the npm stable publish (`latest` tag)

## Why no crates.io for PRs?

crates.io versions are permanent — you can't delete them, only yank. Publishing a crate for every PR commit would pollute the version history. npm has dist-tags so pre-releases are only visible when explicitly requested.
