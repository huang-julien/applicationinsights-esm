import { defineBuildConfig } from "unbuild";
import type { Plugin } from "rollup";
export default defineBuildConfig({
  declaration: false,
  hooks: {
    'rollup:options': (_, options) => {
        (options.plugins as Plugin[]).push(
            {
                name: 'replace',
                generateBundle(_options, outputBundle) {
                    // @ts-expect-error
                    outputBundle['index.mjs'].code = outputBundle['index.mjs'].code.replaceAll('string_decoder/', 'node:string_decoder')
             }
            } as Plugin 
        )
    }
  },
  rollup: {
    
    emitCJS: false,
    inlineDependencies: true,
    output: {
      chunkFileNames: "_shared.js",
    },
    esbuild: {
      target: "ES2020",
      tsconfigRaw: {
        compilerOptions: {
          useDefineForClassFields: false,
        },
      },
    }
  }
});