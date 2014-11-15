'use strict';

// wordpress starter theme

module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['csslint']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint']
            },
            livereload: {
                options: { livereload: true },
                files: ['css/*.css', 'js/*.js', '*.html', '*.php', '**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // css linting
        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            all: [
                'css/*.css'
            ]
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'js/*.js',
                '!js/jquery.js',
                '!js/html5.js',
                '!js/html5shiv-ie7.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'js/plugins.js.map',
                    sourceMappingURL: 'js/plugins.js.map',
                    sourceMapPrefix: 2,
                    mangle: false
                },
                files: {
                    'js/plugins.min.js': [
                        'js/bootstrap.min.js',
                        'js/respond.min.js'
                    ]
                }
            },
            typography: {
                options: {
                    sourceMap: 'assets/js/typography.js.map',
                    sourceMappingURL: 'js/typography.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/typography.min.js': [
                        'js/cufon-yui.js',
                        'js/cufon-replace.js',
                        'js/Caramella_400.font.js',
                        'js/Lane_-_Narrow_400.font.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'blog/wp-content/uploads/',
                    src: ['**/*.{png,jpg,jpeg,gif}', '!node_modules/*.*', '!node_modules', '!node_modules/', '!/node_modules/'],
                    dest: 'opt/blog/wp-content/uploads/'
                }]
            }
        },

        // compression
        compress: {
            gzip: {
                options: {
                    mode: 'gzip',
                    pretty: true
                },
                expand: true,
                cwd: '.',
                src: ['**/*', '!/node_modules/*.*', '!node_modules/*.*', '!node_modules', '!node_modules/', '!/node_modules/','!node_modules/**.*','!node_modules/*','!gzip/node_modules/*.*', '!/gzip/node_modules/*.*', '!gzip/node_modules', '!/gzip/node_modules/', '!gzip/node_modules/','!gzip/node_modules/**.*','!gzip/node_modules/*'],
                dest: 'gzip/'
            },
            tar: {
                options: {
                    archive: 'archive<%= grunt.template.today("ddmmyyyyhMMss") %>.tar',
                    mode: 'tar',
                    pretty: true
                },
                expand: true,
                cwd: 'gzip/',
                src: ['gzip/**/*'],
                // or perhaps ['path/**']
                dest: '/'
            }
        },

        // concatenation
        concat: {
            css: {
                options: {
                    process: function (src, filepath) {
                        return '\n/*!' + filepath + '*/\n' + src;
                    },
                    banner: '/*! At <%= grunt.template.today("dd-mm-yyyy-h:MM:ss") %> */\n',
                },
                src: ['css/styles.css',
                      'css/style2.css'
                ],
                dest: 'css/combined.<%= grunt.template.today("ddmmyyyyhMMss") %>.css'
            },

            js: {
                options: {
                    process: function (src, filepath) {
                        return '\n/*!' + filepath + '*/\n' + src;
                    },
                    banner: '/*! At <%= grunt.template.today("dd-mm-yyyy-h:MM:ss") %> */\n',
                },
                src: [
                    'js/bootstrap.min.js',
                    'js/respond.min.js'
                ],
                dest: 'js/plugins.concat.<%= grunt.template.today("ddmmyyyyhMMss") %>.js',
                separator: ';'
            },

            typography: {
                options: {
                    process: function (src, filepath) {
                        return '\n/*!' + filepath + '*/\n' + src;
                    },
                    banner: '/*! At <%= grunt.template.today("dd-mm-yyyy-h:MM:ss") %> */\n',
                },
                src: [
                    'js/cufon-yui.js',
                    'js/Euphemia_UCAS_400.font.js',
                    'js/Euphemia_UCAS_700.font.js',
                    'js/Juergen_italic_400.font.js'
                ],
                dest: 'js/typography.concat.<%= grunt.template.today("ddmmyyyyhMMss") %>.js',
                separator: ';'
            }
        }

    });


    // register task
    grunt.registerTask('default', ['watch']);

};

