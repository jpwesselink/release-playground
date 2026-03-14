import path from "node:path";
import { defineConfig } from "@rspress/core";

export default defineConfig({
  root: "docs",
  base: "/release-playground/",
  title: "release-playground",
  description: "Multi-channel release workflow for Rust CLI + NAPI packages",
  globalStyles: path.join(__dirname, "docs/styles/index.css"),
  head: [
    ['script', { src: '/release-playground/version-switcher.js', defer: '' }],
  ],
});
