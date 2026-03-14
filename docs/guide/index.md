# Getting Started

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

## Install

### CLI

```bash
npm install -g @jpwesselink/release-playground
```

### Core (NAPI)

```bash
npm install @jpwesselink/release-playground-core
```

```ts
import { greet } from "@jpwesselink/release-playground-core";

console.log(greet("World"));
```
