const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './public/js/main.js', // 显式定义入口名称为 main
        utils: './public/js/utils.js',
        tw_cn: './public/js/tw_cn.js',
        local_search: './public/js/search/local-search.js',
        comment_barrage: './public/js/anzhiyu/comment_barrage.js',
        people: './public/js/anzhiyu/people.js',
        index: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',  // 资源从服务器根目录开始加载
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset', // 自动选择 asset/resource 或 asset/inline
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024,  // 小于 5kb 的图片转换为 base64
                    },
                },
                generator: {
                    // filename: 'images/[name].[hash][ext]', // 输出文件路径和名称
                    filename: '[path][name][ext]', // 输出文件路径和名称
                },
            },
        ],
    },
    optimization: {
        usedExports: false,  // 启用 tree-shaking
        minimize: true,
        // splitChunks: {
        //     chunks: 'all',
        // },
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: true, // 启用压缩选项
                    mangle: {// 启用混淆，减少变量名称
                        reserved: ['Hexo', 'AnZhiYu', 'anzhiyuPopupManager'], // 替换为实际需要保留的变量名
                    }, 
                    format: {
                        comments: false, // 移除注释
                    },
                },
                extractComments: false, // 不生成单独的 LICENSE.txt
            }),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
};
