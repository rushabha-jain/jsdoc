import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

let service: esbuild.Service;

interface IOutput {
  code: string;
  error: string;
}

export default async function bundler(rawCode: string): Promise<IOutput> {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.54/esbuild.wasm"
    });
  }
  try {
    const bundleResult: esbuild.BuildResult = await service.build({
      define: {
        // Set the variables which will be replaced while building
        "process.env.NODE_ENV": '"production"',
        global: "window"
      },
      entryPoints: ["index.js"],
      bundle: true, // By default bundling is disabled
      write: false, // By default, output will be written on fs, to get the in-memory buffer we use this
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)] // Intercepting the flow of build
    });

    if (bundleResult.outputFiles && bundleResult.outputFiles[0]) {
      return {
        code: bundleResult.outputFiles[0].text,
        error: ""
      };
    }
    return {
      code: "",
      error: ""
    };
  } catch (error) {
    return {
      code: "",
      error: error.message
    };
  }
}
