const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const smp = new SpeedMeasurePlugin();
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');

module.exports = smp.wrap({
  entry: './src/index.tsx',
  mode: 'production',
  parallelism: 4,
  experiments: {
    topLevelAwait: true,
  },
  cache: { type: 'filesystem' },
  devtool: 'source-map',
  optimization: {
    concatenateModules: true,
    nodeEnv: 'production',
    usedExports: true,
    minimizer: [new OptimizeCSSAssetsPlugin(), new JsonMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      maxSize: 2000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        reactDom: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor.react-dom',
          priority: 20,
          enforce: true,
          maxSize: 4000,
        },
        otherLibraries: {
          test: /[\\/]node_modules[\\/](axios|react-quill)[\\/]/,
          name: 'vendor.other-libraries',
          priority: 15,
          enforce: true,
          maxSize: 3000,
        },
      },
    },
  },

  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  stats: {
    errorDetails: true,
    children: true,
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: './.env',
      systemvars: true,
      safe: true,
    }),
    new CompressionPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        include: /node_modules/,
        use: 'json-loader',
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },

      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: {
            caseSensitive: true,
            conservativeCollapse: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifySCSS: true,
            minifyJS: true,
            minifyTS: true,
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyURLs: true,
          },
        },
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      },
      {
        test: /\.(avif|png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
});
