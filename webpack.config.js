var config = {
             entry: './main.js',

             output: {
                       path:'/',
                       filename: 'index.js',
                     },

             devServer: {
                          inline: true,
		          HOST: 0.0.0.0,
                          port: 7777,
                          proxy: {
                            '/api': {
                                target: 'http://spring-boot-app:8091/rest/graphql',
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
