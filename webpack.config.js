const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = (env, argv) => {
  console.log("dev : ",argv.mode);
  const dev = argv.mode === 'development'

  return {

    entry: './js/game.js',
    devtool : dev ? 'eval-cheap-module-source-map' : false,
    watch : dev,
    output: {
      publicPath: '',
      path: path.resolve('./dist'),
      filename: 'bundle.js'
    },
  
    module: {
      rules : [
        {
          test: /\.js$/,
          exclude: /node_modules/,
        use : ['babel-loader']
      },
      {
        test: /\.css$/,
        use : [dev ? 'style-loader' : MiniCssExtractPlugin.loader , 'css-loader']
      },
      {
        test: /\.scss$/,
        use : [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader ,
          { loader : 'css-loader', options: {importLoaders: 1 } },
          { 
            loader : 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"]
                ]
              }              
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [  new HtmlWebpackPlugin({ title: 'Roll a dice!', template:'index.html', minify:true }),
              new MiniCssExtractPlugin({filename: "style.css", chunkFilename: '[id].css'}),
              new CopyWebpackPlugin(
                {
                  patterns : [
                    {from:'images', to: 'images'}
                  ] 
                })
            ],
  }
}

