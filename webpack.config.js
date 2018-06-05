const path = require('path');
const webpack = require('webpack');
/**
 * This is a server config which should be merged on top of common config
 */
module.exports = function (env) {
  return {
    externals: [/(node_modules|main\..*\.js)/],

    entry: {
      // This is our Express server for Dynamic universal
      server: (env.production? './server.ts' : './test-server.ts'),
      // This is an example of Static prerendering (generative)
      prerender: (env.production? './prerender.ts': './test-prerender.ts')
    },
    resolve: { extensions: [".js", ".ts"] },
    output: {
      // Puts the output at the root of the dist folder
      path: path.join(__dirname, env.production? 'dist': 'test-dist'),
      filename: '[name].js'
    },

    plugins: [
      new webpack.ContextReplacementPlugin(
        // fixes WARNING Critical dependency: the request of a dependency is an expression
        /(.+)?angular(\\|\/)core(.+)?/,
        path.join(__dirname, 'src'), // location of your src
        {} // a map of your routes
      ),
      new webpack.ContextReplacementPlugin(
        // fixes WARNING Critical dependency: the request of a dependency is an expression
        /(.+)?express(\\|\/)(.+)?/,
        path.join(__dirname, 'src'),
        {}
      ),
      new webpack.IgnorePlugin(/\/iconv-loader$/)
    ],
    target: 'node',
    node: {
      __dirname: false
    }
  }
};
