import {Config,} from '@stencil/core';
import {sass} from '@stencil/sass';
import {patternLabOutputTarget} from "@netlogix/stencil-styleguide-output-target";
import postcss from "rollup-plugin-postcss";
import crypto from "crypto";


export const config: Config = {
  namespace: 'probetag',
  srcDir: 'src/script',
  watchIgnoredRegex: /dependencyGraph.json|readme.md/,
  outputTargets: [
    {
      type: 'www',
      dir: 'public/script',
      buildDir: '.',
      baseUrl: 'https://localhost:3000',
      prerenderConfig: './prerender.config.ts',
      serviceWorker: null,
      copy: [
        {
          src: '../styleguide/css/styleguide-specific.css',
          dest: '../css/styleguide-specific.css',
        }
      ],
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender'
    },
    patternLabOutputTarget({
      rollupOptions: [
        {
          input: [
            'src/scss/style.scss',
          ],
          plugins: [
            postcss({
              modules: false,
              extract: true,
              to: 'public/css/style.css',
              plugins: [
                require('postcss-url')({
                  url: 'copy',
                  assetsPath: '../fonts',
                  useHash: true,
                  hashOptions: {
                    method: function (fileContent) {
                      return crypto.createHash('sha256').update(fileContent).digest('hex');
                    }
                  },
                  filter: function (test) {
                    return test.url.endsWith("woff") || test.url.endsWith("woff2");
                  }
                }),
                require('postcss-inline-svg')(
                ),
              ]
            }),
          ],
        }
      ],
      rollupOutputOptions: [
        {
          name: 'style',
          dir: './public/css',
          format: 'es',
        }
      ]
    }),
  ],
  devServer: {
    reloadStrategy: "pageReload",
    root: 'public',
  },
  testing: {
    browserHeadless: "new",
  },
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/scss/functions.scss',
        'src/scss/variables.scss',
        'src/scss/mixins.scss',
      ]
    }),
  ],
};
