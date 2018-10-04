var config = {
             entry: './main.js',

             output: {
                       path:'/',
                       filename: 'index.js',
                     },

             devServer: {
                          inline: true,
                          port: 7777,
                          proxy: {
                            '/api': {
                                target: 'http://localhost:8091/rest/graphql',
                                secure: false,
                                changeOrigin: true,
                                pathRewrite: { '^/api': '' }
                            }
                        }
                        },
             module: {
                      rules: [
                      {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
			                  query: {
                              presets: ['es2015', 'react']
                        }
                      },
                      {
					              test: /\.css/,
					              loader: 'css-loader'
					            }
                      ]
                    }

            }

module.exports = config;
