
var fs = require('fs');
module.exports = function(grunt){
    'use strict';

//Building a configuration
    grunt.initConfig({
        prop:'some property',
        pkg: grunt.file.readJSON('package.json'), //package.json file as a data source for template data
        running:{
            taskOwner: 'Akash Banginwar',
            src:'js/somefile.js',    //file compact format
            dest:'somefile.js',
            options:{
                comment:'/* <%= pkg.author %> */'
            }
        },
        multi:{
            config1:{
                message:'This is config1',
                files:{         //file object format
                    'someotherfile.js':'js/somefile.js'
                }
            },
            config2:{
                message:'this is config2',
                files : [           //files array format
                    {
                        src:'js/somefile.js',
                        dest:'someotherfile.js'
                    }
                ]
            }
        }

    });

//using callback function
    grunt.registerTask('running', function(arg1){  

        var done = this.async(),
        comment = this.options().comment;


        grunt.config.requires('running.taskOwner');
        grunt.log.writeln('grunt running...'+ this.name, grunt.config.get('running.taskOwner'));
        grunt.log.writeln(grunt.config.get('running.src'));             //file call

        fs.readFile(grunt.config.get('running.src'), function(error, data){
            fs.writeFile(grunt.config.get('running.dest'), comment+ '\n' + data);
            done();
        })

    });

    grunt.registerMultiTask('multi', 'An example multi task', function(arg1){
        grunt.log.writeln(this.data.message, arg1);

//each file object in files array have an src and dest properties which shows mapping between files
        this.files.forEach(function(file){
            grunt.log.writeln(file.src[0]+ ' ' +file.dest) 
        });
    });
    grunt.registerTask('run', 'run all the task', ['running']);
}