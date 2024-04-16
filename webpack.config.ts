import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const SRC_DIR = path.resolve(__dirname, 'src')

const ENTRY_PATH = 'index.ts'
const OUTPUT_JS_FILENAME = 'index.js'
const OUTPUT_CSS_FILENAME = 'index.css'

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: OUTPUT_CSS_FILENAME
})

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: path.join(SRC_DIR, ENTRY_PATH),
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: '@teamsupercell/typings-for-css-modules-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64]',
              },
            },
          },
          { loader: 'postcss-loader' },
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [SRC_DIR, 'node_modules']
  },
  plugins: [miniCssExtractPlugin],
  output: {
    filename: OUTPUT_JS_FILENAME,
  }
}

export default config
