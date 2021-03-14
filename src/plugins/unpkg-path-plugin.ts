import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Resolve index.js path
      build.onResolve({ filter: /^index\.js$/ }, async (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      // Resolve relative file of module
      build.onResolve({ filter: /^\.+\// }, async ({ path, resolveDir }) => {
        return {
          path: new URL(path, `https://unpkg.com${resolveDir}/`).href,
          namespace: "a"
        };
      });

      // Resolve main file of module
      build.onResolve({ filter: /.*/ }, async ({ path }) => {
        return { path: `https://unpkg.com/${path}`, namespace: "a" };
      });
    }
  };
};
