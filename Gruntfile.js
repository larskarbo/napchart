module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: [
		'public/js/helpers.js',
		'public/js/statistics.js',
		'public/js/draw.js',
		'public/js/server.js',
		'public/js/animate.js',
		'public/js/settings.js',
		'public/js/history.js',
		'public/js/interactCanvas.js',
		'public/js/forminput.js',
		'public/js/dom.js',
		'public/js/barhandler.js',
		'public/js/feedback.js',
		'public/js/textSerialize.js',
		'public/js/napchartCore.js',
		'public/js/application.js'],
        dest: 'public/js/dest/napchart.js'
      }
    },
    uglify: {
    my_target: {
      files: {
        'public/js/dest/napchart.min.js': [
		'public/js/helpers.js',
		'public/js/statistics.js',
		'public/js/draw.js',
		'public/js/server.js',
		'public/js/animate.js',
		'public/js/settings.js',
		'public/js/history.js',
		'public/js/interactCanvas.js',
		'public/js/forminput.js',
		'public/js/dom.js',
		'public/js/barhandler.js',
		'public/js/feedback.js',
		'public/js/textSerialize.js',
		'public/js/napchartCore.js',
		'public/js/application.js']
      }
     }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    beautify: {
      files: {
         src: 'public/js/*.js',
		 dest: './'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/draw.js',
		'public/js/napchartCore.js',
		'public/js/helpers.js',
		'public/js/directInput.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: [ 'beautify','jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-beautify');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['uglify']);

};