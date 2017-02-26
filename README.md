# Grunt-Project
Grunt Project using grunt command

Topic covered:

1. Create task
2. Configuring task
3. Working with files in task
4. Using tempting in grunt
5. Used multiple plugins
6. Convert any script into javaScript
7. Pr-processioning with SASS
8. Minifying code - uglify & cssmin
9. Running the site in a web server
10. Some advance workflow work


var fs = require('fs');
module.exports = function(grunt){
    'use strict';
    require('load-grunt-tasks')(grunt);

//Build configuration for task
    grunt.initConfig({
        jshint: {           //to test js file
            files: {
                src:['js/**/*.js']  //all javaScript file in js folder
            }
        },
        clean:['dist/**/*.js'],

        coffee:{            //convert coffee to js code
            dist:{
                files:{
                    'dist/js/package.js':'coffee/**/*.coffee'
                }
            },
            options:{
                sourceMap:true
            }
        },
        sass:{
            dist:{
                files:{
                    'dist/css/styles.css':'sass/**/*.scss'
                }

            },
            options:{
                sourceMap:true
            }
        },
        uglify:{
            dist:{
                files:{
                    'dist/js/package.min.js': 'dist/js/**/*.js'
                }
            },
            options:{
                sourceMap:true,
                sourceMapIn:'dist/js/package.js.map'
            }
        },
        cssmin:{
            dist:{
                files:{
                    'dist/css/styles.min.css': 'dist/css/**/*.css'
                }
            },
            options:{
                sourceMap:true
            }
        },
        htmlbuild: {
            dist: {
                src:'index.html',
                dist:'dist/index.html',
                options:{
                    prefix:'dist/',
                    relative: true,
                    scripts: {
                         'package':'dist/js/ppackage.min.js'
                    },
                    styles:{
                        css:'dist/css/styles.min.css'
                    }
                }
            }
        },
        dev:{
                src: 'index.html',
                dist: 'dist/index.html',
                options: {
                    prefix:'dist/',
                    relative: true,
                    scripts: {
                         'package': 'dist/js/package.js'
                    },
                    styles: {
                        css: 'dist/css/styles.css'
                    }
                }
            },
            connect:{
                server:{
                    options:{
                        base: './dist',
                        keepalive: true,
                        open:true
                    }
                }
            }
    });

//load task
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-coffee');
    // grunt.loadNpmTasks('grunt-sass');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['jshint', 'clean', 'coffee', 'sass', 'uglify', 'cssmin', 'htmlbuild:dist', 'connect']);
}
