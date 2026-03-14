import path from "node:path";
import { defineConfig } from "@rspress/core";

export default defineConfig({
  root: "docs",
  base: "/release-playground/",
  title: "release-playground",
  description: "Multi-channel release workflow for Rust CLI + NAPI packages",
  globalStyles: path.join(__dirname, "docs/v0.1/styles/index.css"),
  multiVersion: {
    default: "v0.2",
    versions: ["v0.1", "v0.2"],
  },
});
