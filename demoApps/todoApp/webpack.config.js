const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const COVERAGE_MODE = process.argv.indexOf('--env.coverage') !== -1
const PROD_MODE = process.argv.indexOf('--env.prod') !== -1

if (COVERAGE_MODE) {
  module.exports = {
    entry: {
      'todo': './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/'
    },
    module: {
      rules: [{
      //   test: /\.js$/,
      //   use: {
      //     loader: 'istanbul-instrumenter-loader'
      //   },
      //   // TODO: enforce is suggested but I don't see why
      //   enforce: 'post',
      //   exclude: /node_modules/
      // }, {
        test: /\.js$/,
        use: ['istanbul-instrumenter-loader', 'babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
    }
  }
}
else if (PROD_MODE) {
  module.exports = {
    entry: {
      'todo': './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/'
    },
    plugins: [
      new UglifyJsPlugin()
    ],
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
    }
  }
}
else {
  module.exports = {
    entry: {
      'todo': './src/app.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
    }
  }
}
