module.exports = function(grunt) {
    var staticPath = '../assets/';
    var devPath = 'assets/';

    grunt.util.linefeed = '\r\n';
    grunt.initConfig({
        staticPath: staticPath,
        devPath: devPath,
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    // outputStyle: 'compressed',
                    sourceMap: true
                },
                files: {
                    '<%= staticPath %>styles/style.css': [
                        '<%= devPath %>scss/main.scss'
                    ]
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                debounceDelay: 150,
                atBegin: true
            },
            sass: {
                files: ['<%= devPath %>scss/*.scss', '<%= devPath %>scss/*/*.scss'],
                tasks: 'buildSass'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');

    /*grunt.registerTask( 'buildJS', [
        'concat:app_unlogged',
        'concat:app_logged'
        //'uglify'
    ] );*/

    grunt.registerTask('buildSass', [
        'sass'
    ]);

    grunt.registerTask('watchSass', [
        'watch:sass'
    ]);

};