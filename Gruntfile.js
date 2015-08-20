// Generated on 2015-03-12 using
// generator-webapp 0.5.1
'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    watch: {
      styles: {
        files: ['app/**/*.styl'],
        tasks: ['stylus']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/**/*.js',
          'app/images/**/*',
          '.tmp/**/*.{css,html}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static('app')
            ];
          }
        }
      },
      dist: {
        options: {
          base: 'dist',
          livereload: false
        }
      }
    },

    stylus: {
      compile: {
        options: {
          import: ['nib']
        },
        files: [{
          cwd: 'app',
          dest: '.tmp',
          expand: true,
          ext: '.css',
          src: [
            '**/*.styl',
          ]
        }]
      }
    },

    jade: {
      options: {
        client: false,
        doctype: 'html',
        pretty: true
      },
      all: {
        files: [{
          cwd: 'app',
          dest: '.tmp',
          expand: true,
          ext: '.html',
          src: [
            '**/*.jade',
            '!**/_*.jade'
          ]
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '**/*.html',
          dest: 'dist'
        }]
      }
    },


    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '**/*.{js,ico,png,txt,jpg}'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '.tmp',
            dest: 'dist',
            src: [
              '**/*.css'
            ]
          },
          {
            expand: true,
            cwd: 'site',
            dest: 'dist',
            src: [ '*.*', 'CNAME' ]
          }
        ]
      }
    },


    buildcontrol: {
      dist: {
        options: {
          remote: 'git@github.com:eddiemonge/eddiemonge.github.com.git',
          branch: 'master',
          commit: true,
          push: true
        }
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['default', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'connect:livereload',
      'jade',
      'stylus',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'clean:dist',
    'jade',
    'stylus',
    'copy',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'default',
    'buildcontrol'
  ])
};
