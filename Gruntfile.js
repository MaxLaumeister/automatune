module.exports = function(grunt) {

  var srcFiles = ['src/*.js'];
  var libFiles = ['lib/*.js'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Copyright (c) <%= grunt.template.today("yyyy") %> Maximillian Laumeister, All Rights Reserved */\n'
      },
      build: {
        src: libFiles.concat(srcFiles),
        dest: 'dist/automatune.min.js'
      }
    },
    jshint: {
      all: srcFiles
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['jshint', 'uglify', 'jsdoc']);

};
