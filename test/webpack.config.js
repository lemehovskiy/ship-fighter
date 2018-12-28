module.exports = {
    watch: true,
    entry: './index.es6',
    output: {
        filename: './index.js',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};