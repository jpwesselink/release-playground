const path = require("path");

const PLATFORMS = {
  "darwin-arm64": "@jpwesselink/playground-core-darwin-arm64",
  "darwin-x64": "@jpwesselink/playground-core-darwin-x64",
  "linux-x64": "@jpwesselink/playground-core-linux-x64-gnu",
  "linux-arm64": "@jpwesselink/playground-core-linux-arm64-gnu",
  "win32-x64": "@jpwesselink/playground-core-win32-x64-msvc",
  "win32-arm64": "@jpwesselink/playground-core-win32-arm64-msvc",
};

const key = `${process.platform}-${process.arch}`;
const pkg = PLATFORMS[key];

if (!pkg) {
  throw new Error(
    `@jpwesselink/playground-core: unsupported platform ${process.platform}-${process.arch}\n` +
    `Supported: ${Object.keys(PLATFORMS).join(", ")}`
  );
}

let nativeModule;
try {
  nativeModule = require(pkg);
} catch {
  try {
    const pkgDir = path.dirname(require.resolve(`${pkg}/package.json`));
    nativeModule = require(path.join(pkgDir, "playground-core.node"));
  } catch {
    try {
      nativeModule = require(path.join(__dirname, "playground-core.node"));
    } catch {
      throw new Error(
        `@jpwesselink/playground-core: could not load native module "${pkg}"\n\n` +
        `This usually means the optional dependency was not installed.\n` +
        `Try reinstalling with: npm install @jpwesselink/playground-core`
      );
    }
  }
}

module.exports = { ...nativeModule };
