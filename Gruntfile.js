module.exports = function(grunt) {

  grunt.initConfig({
	 concat: {
	  options: {
		// define a string to put between each file in the concatenated output
		separator: ';'
	  },
	  dist: {
		// the files to concatenate
		src: ['js/**/*.js'],
		// the location of the resulting JS file
		dest: 'public/js/<%= pkg.name %>.js'
	  }
	},
	uglify: {
	  options: {
		// the banner is inserted at the top of the output
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
	  dist: {
		files: {
		  'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
		}
	  }
	},
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};