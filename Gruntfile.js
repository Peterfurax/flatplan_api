"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // dist/<%= pkg.srcfile %>./js
    jshint: {
      files: ['Gruntfile.js', '<%= pkg.main %>'],
      options: {
        // options here to override JSHint defaults
        node: true,
        esversion: 6,
        globals: {
          console: true,
          module: true,
          document: true,
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */',
        screwIE8 : true,
        compress: {
          drop_console: true
        }
      },
      build: {
        src: 'build/server.js',
        dest: 'dist/server.min.js'
      }
    },
    watch: {
      files: ['src/server.js'],
      tasks: ['default']
    },
    babel: {
      "options": {
        "presets": ['es2015'],
        "sourceMap": false
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "src/",
          "src": ["**/*.js"],
          "dest": "build/",
          "ext": ".js"
        }]
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'babel', 'uglify']);
};
