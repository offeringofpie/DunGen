const path = require('path');
const clip = require('clipboardy');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stats = {
  all: false,
  assets: true,
  cachedAssets: true,
  children: false,
  chunks: false,
  entrypoints: true,
  errorDetails: true,
  errors: true,
  hash: true,
  modules: false,
  performance: true,
  publicPath: true,
  timings: true,
  warnings: false,
  exclude: [
    'node_modules'
  ]
};

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: ['./src/main.js'],
    output: {
      filename: 'dist/script.min.js',
      chunkFilename: '[id].js',
      path: path.resolve(__dirname, 'docs')
    },
    resolve: {
      extensions: ['.ts','.js', '.json', '.css'],
      alias: {
        js: path.resolve(__dirname, 'src/js'),
        css: path.resolve(__dirname, 'src/css'),
        img: path.resolve(__dirname, 'src/img'),
        services: path.resolve(__dirname, 'src/js/services')
			},
      modules: ['node_modules']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      },{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        },
        {
          test: /\.(?:png|jpg|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new WebpackBar(),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'dist/css/style.min.css'
      })
    ],
    performance: { hints: false },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            },
            discardEmpty: true,
            discardOverridden: true
          }
        }),
        new TerserPlugin({
          parallel: true,
          cache: true,
          terserOptions: {
            ecma: 6,
          },
        })
      ],
			splitChunks: {
        chunks: 'all',
				automaticNameDelimiter: '/',
				cacheGroups: {
          default: false,
					dist: {
						test: /[\\/]node_modules[\\/]/,
            priority: -10,
            enforce: true
					}
				}
			}
    },
    stats: stats,
    devServer: {
      stats: stats,
      port: 4000,
      historyApiFallback: true,
      after: function(app, server) {
        clip.writeSync('http://localhost:4000/');
      }
    },
    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  };
};
