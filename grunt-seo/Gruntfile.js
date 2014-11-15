'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

	// custom script to name files according to source
	var cssSrc = [
	    'cformnkp.js',
	    'AC_RunActiveContent.js',
	    'js/moo_12.js',
	    'js/sl_slider.js',
	    'js/swfobject.js',
	    'scripts/*.js',
	    'pro_dropdown_2/*js'
	];

	// returns full list of .js files that matches your *.js
	var complete_csssrc = grunt.file.expand(cssSrc);

	var final_cssname = '';

	// some string manipulations to get your the format you want

	for (var i = 0; i < complete_csssrc.length; i++) {
	    complete_csssrc[i] = complete_csssrc[i].substring(complete_csssrc[i].lastIndexOf('/') + 1, complete_csssrc[i].length - 3);
	}

	var final_cssname = complete_csssrc.join('-');

	// custom script to name files according to source

	var jsSrc = [
	    'cformnkp.js',
	    'AC_RunActiveContent.js',
	    'js/moo_12.js',
	    'js/sl_slider.js',
	    'js/swfobject.js',
	    'scripts/*.js',
	    'pro_dropdown_2/*js'
	];

	// returns full list of .js files that matches your *.js
	var complete_jssrc = grunt.file.expand(jsSrc);

	var final_jsname = '';

	// some string manipulations to get your the format you want

	for (var i = 0; i < complete_jssrc.length; i++) {
	    complete_jssrc[i] = complete_jssrc[i].substring(complete_jssrc[i].lastIndexOf('/') + 1, complete_jssrc[i].length - 3);
	}

	var final_jsname = complete_jssrc.join('-');

	// end custom naming script


    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        meta: {
            banner: "/*! <%= pkg.title || pkg.name %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
        },

        // watch for changes and trigger tasks
        watch: {
        	options: {
              livereload: true,
            },
            css: {
                files: [
                    '<%= csslint.src %>',
                    '<%= concat:css.dest %>'
                ],
                tasks: ['csslint']
            },
            js: {
                files: [
                    '<%= jshint.files.src %>',
                    '<%= concat:js.dest %>'
                ],
                tasks: ['jshint']
            }
        },

        // css linting
        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            src: cssSrc
        },

        // concatenation
        concat: {
            css: {
				options: {
					 process: function(src, filepath) {
					   return '/*!' + filepath + <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> + '\n' + cssSrc;
					 }
					 footer: '/*! At <%= grunt.template.today("dd-mm-yyyy-h:MM:ss") %> */\n',
		        },
                src: cssSrc ,
                dest: 'css/'+final_cssname+'combined.<%= grunt.template.today("ddmmyyyyhMMss") %>.css'
            },

            js: {
                options: {
					 process: function(src, filepath) {
					   return '/*!' + filepath + <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> + '\n' + jsSrc;
					 }
					 footer: '/*! At <%= grunt.template.today("dd-mm-yyyy-h:MM:ss") %> */\n',
		        },
		        src: jsSrc ,
                dest: 'js/'+final_jsname+'concat.<%= grunt.template.today("ddmmyyyyhMMss") %>.js',
                separator: ";"
            }
        },

        // css minification
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    report: 'min'
                },
                files: {
                   ' '+final_cssname+'min.<%= grunt.template.today("ddmmyyyyhMMss") %>.css': ['<%= concat.css.dest %>']
                }
            }
        },

        htmlmin: {
            dev: {
              options: {
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeCommentsFromCDATA: true,
                removeCDATASectionsFromCDATA: true,
                lint:'lint'
              },
              files: {
                'dist/index.html': 'src/index.html',
                'dist/contact.html': 'src/contact.html'
              }
            }
          },


        // javascript linting with jshint
        jshint: {
        	options: {
	            jshintrc: '.jshintrc',
	            "force": true
	        },
	        files: {
		        src: jsSrc
		    }
        },

        // fix my js as per jshint
        fixmyjs: {
        	dry: {
			    options: {
			    	jshintrc: '.jshintrc',
			        "dry": true
			    },
			    files: {
		        	src: jsSrc
		    	}
			},
			force: {
			    options: {
			    	jshintrc: '.jshintrc'
			    },
			    files: {
		        	src: jsSrc
		    	}
			}

		},

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'assets/js/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2,
                    mangle: false
                },
                files: {
                    'assets/js/plugins.min.js': [
                        'assets/js/gumby/libs/gumby.js',
                        'assets/js/gumby/plugins.js',
                        'assets/js/gumby/libs/ui/gumby.retina.js',
                        'assets/js/gumby/libs/ui/gumby.fixed.js',
                        'assets/js/gumby/libs/ui/gumby.skiplink.js',
                        'assets/js/gumby/libs/ui/gumby.toggleswitch.js',
                        'assets/js/gumby/libs/ui/gumby.checkbox.js',
                        'assets/js/gumby/libs/ui/gumby.radiobtn.js',
                        'assets/js/gumby/libs/ui/gumby.tabs.js',
                        'assets/js/gumby/libs/ui/gumby.navbar.js',
                        'assets/js/gumby/libs/ui/gumby.fittext.js',
                        'assets/js/gumby/libs/ui/jquery.validation.js',
                        'assets/js/vendor/gumby-images/gumby.images.js',
                        'assets/js/gumby/libs/gumby.init.js'
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'assets/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2,
                    mangle: false
                },
                files: {
                    'assets/js/main.min.js': [
                        'assets/js/source/plugins.js',
                        'assets/js/gumby/main.js',
                        'assets/js/source/main.js',
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            options: {
                optimizationLevel: 5,
                pngquant: true
            },
            files: [{
                expand: true,
                cwd: '.',
                src: '**/*.{png,jp?g,gif}',
                dest: './opt'
            }]
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
		    src: ['**/*'],
		    dest: 'gzip/'
		  },
		  tar: {
		    options: {
		      archive: 'archive<%= grunt.template.today("ddmmyyyyhMMss") %>.tar'
		      mode: 'tar',
		      pretty: true
		    },
		    expand: true,
		    cwd: 'gzip/',
		    src: ['**/*'],
		    // or perhaps ['path/**']
		    dest: 'gzip/tar/'
		  }
		},

        // file size reports
        size_report: {
            images: {
                files: {
                    list: ['path/to/images/*.jpg']
                },
            },
            css: {
                files: {
                    list: ['path/to/css/*.css']
                },
            },
            fonts: {
                files: {
                    list: ['path/to/fonts/*.woff', 'path/to/fonts/*.ttf']
                },
            },
            js: {
                files: {
                    list: ['path/to/js/*.js']
                },
            },
        },

    });
