# release-playground

Test repo for validating the multi-channel release workflow before applying it to production repos.

## Project Structure

```
crates/
  playground/              CLI binary
    npm/                   CLI npm distribution (@jpwesselink/release-playground)
  playground-core/         Shared Rust library
  playground-napi/         NAPI-RS native Node.js bindings
    npm/                   Core npm distribution (@jpwesselink/release-playground-core)
```

## npm Packages

| Package | Type | Description |
|---|---|---|
| `@jpwesselink/release-playground` | CLI | Platform-specific binary, installed via `npx` |
| `@jpwesselink/release-playground-core` | NAPI | Native Node.js bindings (ESM) |

Both use the optionalDependencies pattern with platform-specific sub-packages for native binary distribution.

## Setup

### Required Secrets

Add these in **Settings → Secrets and variables → Actions** on the GitHub repo:

| Secret | Purpose | How to create |
|---|---|---|
| `CARGO_REGISTRY_TOKEN` | Publish crates to crates.io | [crates.io/settings/tokens](https://crates.io/settings/tokens) → New token with publish scope |
| `NPM_TOKEN` | Publish packages to npm | [npmjs.com/settings/tokens](https://www.npmjs.com/settings/~/tokens) → New Automation token |
| `RELEASE_TOKEN` | GitHub PAT for release-plz | GitHub → Settings → Developer settings → Fine-grained tokens (see below) |

### Creating the GitHub PAT (`RELEASE_TOKEN`)

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Click **Generate new token**
3. Set the token name (e.g. `release-plz`)
4. Set an expiration
5. Under **Repository access**, select only the repos that need it
6. Under **Repository permissions**, grant:
   - **Contents**: Read and write
   - **Pull requests**: Read and write
7. Click **Generate token** and copy the value
8. Add it as the `RELEASE_TOKEN` secret on the repo

## Release Workflow

| Channel | Trigger | npm tag | crates.io | Version format |
|---|---|---|---|---|
| **beta** | Push to `main` | `beta` | Yes (via release-plz) | `{version}-beta.{sha}` |
| **pr** | PR commit | `pr-{N}` | No | `{version}-pr-{N}.{sha}` |
| **stable** | release-plz release (or manual dispatch) | `latest` | Yes (via release-plz) | `{version}` |

Version is read from `Cargo.toml` (managed by release-plz via conventional commits).

### CI Workflows

| Workflow | Description |
|---|---|
| **Publish CLI npm package** | Builds CLI binary for 6 platforms, publishes `@jpwesselink/release-playground` |
| **Publish Core npm package** | Builds NAPI native module for 6 platforms, publishes `@jpwesselink/release-playground-core` |
| **Release-plz** | Analyzes conventional commits, creates release PRs, publishes to crates.io |

### Stable release flow

1. Conventional commits land on `main`
2. release-plz opens a "chore: release" PR with bumped versions
3. You merge the PR
4. release-plz publishes to crates.io and creates a GitHub release
5. The GitHub release automatically triggers the npm stable publish (`latest` tag)

### Why no crates.io for PRs?

crates.io versions are permanent — you can't delete them, only yank. Publishing a crate for every PR commit would pollute the version history. npm has dist-tags so pre-releases are only visible when explicitly requested.
