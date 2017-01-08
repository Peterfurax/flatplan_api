"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // dist/<%= pkg.srcfile %>./js
    jshint: {
      files: ['Gruntfile.js', 'src/server.js', 'src/provider/data.js', 'src/lib/lib.js', 'src/cluster.js'],
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
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
        screwIE8: true,
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: '**/*.js',
          dest: 'dist/'
        }]
      },
    },
    watch: {
      files: ['src/server.js'],
      tasks: ['default']
    },
    babel: {
      options: {
        presets: ['es2015'],
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["**/*.js"],
          dest: "build/",
          ext: ".js"
        }]
      }
    },
    clean: ["build/", "dist/", "docs/", "coverage/"]
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'babel', 'uglify']);
};
