import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

localforage.createInstance({
  name: "packages"
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // Load the content of index.js
      build.onLoad({ filter: /^index\.js$/ }, (args: esbuild.OnLoadArgs) => {
        return {
          loader: "jsx",
          contents: inputCode
        };
      });

      // Caching logic
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cachedResult = await localforage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        return cachedResult; // if you don't return anything or if you return null|undefined it will run next onLoad
      });

      // Load the content of css
      build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
        // Load the content of package from unpkg.com
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/'/g, "\\'")
          .replace(/"/g, '\\"');
        const contents = `
      const style = document.createElement('style');
      style.innerText = '${escaped}';
      document.head.appendChild(style);
      `;
        const moduleData: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname
        };
        await localforage.setItem(args.path, moduleData);
        return moduleData;
      });

      // Load the content of packages
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        // Load the content of package from unpkg.com
        const { data, request } = await axios.get(args.path);
        const moduleData: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        };
        await localforage.setItem(args.path, moduleData);
        return moduleData;
      });
    }
  };
};
