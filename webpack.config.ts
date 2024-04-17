import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const SRC_DIR = path.resolve(__dirname, 'src')

const HTML_TEMPLATE = 'index.html'
const ENTRY_PATH = 'index.ts'
const OUTPUT_JS_FILENAME = 'index.js'
const OUTPUT_CSS_FILENAME = 'index.css'

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: OUTPUT_CSS_FILENAME
})

const base: webpack.Configuration = {
  entry: path.join(SRC_DIR, ENTRY_PATH),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
  plugins: [
    miniCssExtractPlugin,
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, HTML_TEMPLATE),
      inject: false
    })
  ],
  output: {
    filename: OUTPUT_JS_FILENAME,
  }
}

const custom: Record<string, webpack.Configuration> = {
  'production': {},
  'development': { devtool: 'source-map' }
};

const { NODE_ENV } = process.env;

const config: webpack.Configuration = {
  ...base,
  ...(NODE_ENV ? custom[NODE_ENV] : {})
};

export default config
