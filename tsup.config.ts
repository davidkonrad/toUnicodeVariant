import { defineConfig } from "tsup";

export default defineConfig([
  {
    // Non-minified IIFE configuration
    entry: { "toUnicodeVariant": "src/index.ts" }, // Explicit name for output
    format: ["iife"], // Only IIFE
    globalName: "UnicodeUtils", // Expose an object globally
    clean: true, // Clean output directory before building
    minify: false, // No minification for this build
    sourcemap: true, // Generate sourcemaps
    esbuildOptions: (options) => {
      options.footer = {
        js: `
          // Attach functions to global scope
          if (typeof window !== "undefined") {
            window.toUnicodeVariant = UnicodeUtils.toUnicodeVariant;
            window.detectUnicodeVariant = UnicodeUtils.detectUnicodeVariant;
            window.string_to_unicode_variant = UnicodeUtils.string_to_unicode_variant;
          }
        `,
      };
    },
    outExtension: ({ format }) => {
      if (format === "iife") {
        return { js: ".js" }; // Non-minified IIFE file
      }
      return { js: ".js" };
    },
  },
  {
    // Minified IIFE configuration
    entry: { "toUnicodeVariant": "src/index.ts" }, // Explicit name for output
    format: ["iife"], // Only IIFE
    globalName: "UnicodeUtils", // Expose an object globally
    clean: false, // Do not clean to retain non-minified files
    minify: true, // Minify the output
    sourcemap: true, // Generate sourcemap for the minified file
    esbuildOptions: (options) => {
      options.footer = {
        js: `
          // Attach functions to global scope
          if (typeof window !== "undefined") {
            window.toUnicodeVariant = UnicodeUtils.toUnicodeVariant;
            window.detectUnicodeVariant = UnicodeUtils.detectUnicodeVariant;
            window.string_to_unicode_variant = UnicodeUtils.string_to_unicode_variant;
          }
        `,
      };
    },
    outExtension: ({ format }) => {
      if (format === "iife") {
        return { js: ".min.js" }; // Minified IIFE file
      }
      return { js: ".js" };
    },
  },
  {
    // CJS and ESM configuration
    entry: ["src/index.ts"],
    format: ["cjs", "esm"], // Generate CommonJS and ESM
    dts: true, // Generate TypeScript declaration files
    sourcemap: true, // Generate sourcemaps
    clean: false, // Do not clean to retain IIFE outputs
    minify: false, // No minification
    esbuildOptions: (options) => {
      options.charset = "utf8"; // Preserve Unicode characters
    },
  },
]);
