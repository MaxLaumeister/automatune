module.exports = function(grunt) {

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
      all: srcFiles,
      options: {
        expr: true
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['jshint', 'concat', 'jsdoc']);
  grunt.registerTask('min', ['jshint', 'uglify', 'jsdoc']);

};
