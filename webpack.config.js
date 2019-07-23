const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
    return {
        mode: env.NODE_ENV,
        entry: {
            'js/main.js': getSourcePath('js/main.js'),
            'js/docs.js': getSourcePath('js/docs.js')
        },
        output: {
            path: getPublicPath(),
            filename: '[name]'
        },
        module: {
            rules: [
                {
                  test: /\.scss$/,
                  use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                  ]
                },
                {
                    test: /\.css$/,
                    use: 'css-loader'
                },
                {
                    test: /\.font\.js/,
                    use: [
                        'css-loader',
                        'webfonts-loader'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                Vue: ['vue/dist/vue.esm.js', 'default']
            }),
            new MiniCssExtractPlugin({
                filename: 'css/main.css'
            }),
            new CopyPlugin([
                {
                    from: getSourcePath('img'),
                    to: getPublicPath('img')
                },
                {
                    from: getSourcePath('docs'),
                    to: getPublicPath('docs')
                },
                // {
                //     from: getSourcePath('fonts'),
                //     to: getPublicPath('fonts')
                // }
            ]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i
                })
            ]
        }
    };
};

function getSourcePath() {
    return path.resolve(process.env.npm_package_config_path_src, ...arguments);
}

function getPublicPath() {
    return path.resolve(process.env.npm_package_config_path_public, ...arguments);
}
