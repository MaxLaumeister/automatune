module.exports = function(grunt) {

  "use strict";

  var srcFiles = ['src/*.js'];
  var libFiles = ['lib/*.js'];
  var destFile = 'dist/automatune.js';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      all: {
        src: libFiles.concat(srcFiles),
        dest: destFile
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Copyright (c) <%= grunt.template.today("yyyy") %> Maximillian Laumeister, All Rights Reserved */\n'
      },
      build: {
        src: libFiles.concat(srcFiles),
        dest: destFile
      }
    },
    jshint: {
      all: {
        src: srcFiles.concat(['Gruntfile.js'])
      },
      options: {
        expr: true,
        strict: true
      }
    },
    jsdoc: {
      all: {
        src: srcFiles,
        options: {
          destination: 'doc',
          private: false
        }
      }
    },
    watch: {
      all: {
        files: libFiles.concat(srcFiles).concat(['Gruntfile.js']),
        tasks: ['newer:jshint:all', 'concat'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('min', ['jshint', 'uglify']);
  grunt.registerTask('doc', ['jsdoc']);
};

