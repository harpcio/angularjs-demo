module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            source: {
                files: [
                    'Gruntfile.js',
                    'app/*.js',
                    'app/**/*.js',
                    'app/**/**/*.js',
                    'app/**/**/**/*.js',
                    'app/**/*.html',
                    'app/**/**/*.html',
                    'app/**/**/**/*.html'
                ],
                tasks: ['clean:build', 'build']
            }
        },
        jshint: {
            options: {
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'es3': false,
                'forin': true,
                'freeze': true,
                'immed': true,
                'indent': 4,
                'latedef': 'nofunc',
                'newcap': true,
                'noarg': true,
                'noempty': true,
                'nonbsp': true,
                'nonew': true,
                'plusplus': false,
                'quotmark': 'single',
                'undef': true,
                'unused': false,
                'strict': false,
                'maxparams': 10,
                'maxdepth': 5,
                'maxstatements': 40,
                'maxcomplexity': 8,
                'maxlen': 120,

                'asi': false,
                'boss': false,
                'debug': false,
                'eqnull': true,
                'esnext': false,
                'evil': false,
                'expr': false,
                'funcscope': false,
                'globalstrict': false,
                'iterator': false,
                'lastsemic': false,
                'laxbreak': false,
                'laxcomma': false,
                'loopfunc': true,
                'maxerr': false,
                'moz': false,
                'multistr': false,
                'notypeof': false,
                'proto': false,
                'scripturl': false,
                'shadow': false,
                'sub': true,
                'supernew': false,
                'validthis': false,
                'noyield': false,

                'browser': true,
                'node': true,

                'globals': {
                    'angular': false,
                    '$': false
                }
            },
            all: ['Gruntfile.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/**/**/*.js']
        },
        bower: {
            options: {
                'targetDir': './bower_components',
                install: true,
                copy: false
            },
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        html2js: {
            templates: {
                src: ['app/**/*.html', 'app/**/**/*.html', 'app/**/**/**/*.html'],
                dest: '.tmp/templates/frontend.js'
            }
        },
        concat: {
            //css
            mainCss: {
               src: [
                   './assets/css/game.css',
                   './assets/css/layout.css'
               ],
               dest: 'dist/css/main.css'
            },
            // js
            main: {
                src: [
                    './bower_components/jquery/dist/jquery.min.js',
                    './bower_components/bootstrap/dist/js/bootstrap.min.js',
                ],
                dest: 'dist/js/main.js'
            },
            angular: {
                src: [
                    './bower_components/angular/angular.js',
                    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    './bower_components/angular-cookies/angular-cookies.min.js',
                    './bower_components/angularLocalStorage/dist/angularLocalStorage.min.js'
                ],
                dest: 'dist/js/angular.js'
            },
            // angular apps
            app: {
                src: [
                    'app/app.js',
                    'app/app.routes.js',
                    'app/**/*.js',
                    'app/**/**/*.js',
                    'app/**/**/**/*.js'
                ],
                dest: 'dist/js/app.js'
            }
        },
        clean: {
            build: [
                '.tmp/',
                'dist/css',
                'dist/js'
            ],
            prod: [
                'dist/js',
                'build'
            ]
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js',
                        src: ['*'],
                        dest: './dist/js/'
                    }
                ]
            }
        },
        uglify: {
            app: {
                files: {
                    'dist/js/main.js': [
                        'dist/js/main.js'
                    ],
                    'dist/js/angular.js': [
                        'dist/js/angular.js'
                    ],
                    'dist/js/app.js': [
                        'dist/js/app.js'
                    ]
                }
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js',
                        src: ['**'],
                        dest: './build/js/'
                    }
                ]
            },
            json: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/data',
                        src: ['**'],
                        dest: './build/data/'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css',
                        src: '**',
                        dest: './build/css/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: './assets/images',
                        src: '**',
                        dest: './build/images/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('build', [
        'jshint:all',
        'concat',
        'copy:js',
        'copy:css',
        'copy:json',
    ]);

    grunt.registerTask('build:prod', [
        'clean:prod',
        'bower:install',
        'concat',
        'ngAnnotate:all',
        'uglify',
        'copy:js',
        'copy:css',
        'copy:json',
        'copy:images'
    ]);

    grunt.registerTask('default', ['watch:source']);
};