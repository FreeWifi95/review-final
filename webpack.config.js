module.exports = {
  "target": "node",
  entry: __dirname + '/client/src/index.jsx',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      },

      {
        loader: 'url-loader',
        test: /\.gif$/,
      },

      {
        loader: 'file-loader',
        test: /\.(ttf|eot|svg)$/,
      },

      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
  // resolve: {
  //   alias: {
  //     config$: './configs/app-config.js',
  //     react: './vendor/react-master',
  //   },
  //   extensions: ['js', 'jsx'],
  //   modules: [
  //     'node_modules',
  //     'bower_components',
  //     'shared',
  //     '/shared/vendor/modules',
  //   ],
  // },

  output: {
    filename: 'reviewBundle.js',
    path: __dirname + '/public'
  },
};
