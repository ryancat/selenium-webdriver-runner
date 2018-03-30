module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.build.js',
    path: __dirname + '/dist/'
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'] 
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};