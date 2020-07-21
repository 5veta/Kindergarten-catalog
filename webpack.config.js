var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var path = require("path");

process.noDeprecation = true;

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist/assets"),
        filename: "bundle.js",
        publicPath: "assets",
        sourceMapFilename: "bundle.map"
    },
    devtool: "#source-map",
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-env",  "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            /*{
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["style-loader", "css-loader",{
                        loader: "postcss-loader",
                        options: {
                          plugins: () => [require('precss'), require("autoprefixer")]
                        }}, "sass-loader"]
                })
            },*/
            {    
                test: /\.scss$/,     
                use: [
                  'style-loader', // creates style nodes from JS strings      
                  'css-loader', // translates CSS into CommonJS
                  'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ],
              },
            {
                test: /\.(jpg|png|svg)$/,
                //include: path.resolve(__dirname, "src/images"),
                loader:'url-loader?limit=1024&name=/[name].[ext]'
                /*use: {
                    loader: 'url-loader',
                    options: {
                        //fallback: require.resolve('file-loader'),
                        limit: 25000
                    }
                }*/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
};
