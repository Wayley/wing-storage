import { terser } from "rollup-plugin-terser";
export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/wing-storage.js",
      name: "wing-storage",
      format: "umd",
    },
    {
      file: "dist/wing-storage.es.js",
      format: "es",
    },
    {
      file: "dist/wing-storage.amd.js",
      format: "amd",
    },
    {
      file: "dist/wing-storage.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [terser()],
};
