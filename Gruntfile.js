module.exports = function (aGrunt) {
  aGrunt.loadNpmTasks('grunt-bower-task');
  aGrunt.loadNpmTasks('grunt-contrib-concat');
  aGrunt.loadNpmTasks('grunt-contrib-copy');
  aGrunt.loadNpmTasks('grunt-contrib-clean');
  aGrunt.loadNpmTasks('grunt-contrib-cssmin');
  aGrunt.loadNpmTasks('grunt-contrib-less');
  aGrunt.loadNpmTasks('grunt-contrib-jshint');
  aGrunt.loadNpmTasks('grunt-contrib-requirejs');
  aGrunt.loadNpmTasks('grunt-contrib-uglify');
  aGrunt.loadNpmTasks('grunt-contrib-watch');
  aGrunt.loadNpmTasks('grunt-htmlhint');
  aGrunt.loadNpmTasks('grunt-testem');

  aGrunt.initConfig({
    pkg: aGrunt.file.readJSON('package.json'),
    bower: {},
    concat: {},
    copy: {},
    clean: {},
    cssmin: {},
    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          'build/public/stylesheets/style.css':
            'app/less/style.less'
        }
      }
    },
    jshint: {
      use_defaults: [
        '*.js',
        'app/javascripts/**/*.js',
        'public/javascripts/**/*.js',
        'spec/javascripts/**/*.js'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        trailing: true,
        multistr: true,
        scripturl: true,
        loopfunc: true,
        proto: true,

        browser: true,
        node: true,
        jquery: true,

        globals: {
          alert: true,
          console: true,
          define: true,
          log: true,
          jasmine: true,
          describe: true,
          it: true,
          expect: true,
          spyOn: true,
          runs: true,
          waits: true,
          waitsFor: true,
          beforeEach: true,
          afterEach: true,
          xdescribe: true,
          xit: true,
          Backbone: true,
          _: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'public',
          baseUrl: 'javascripts',
          dir: 'build/public',
          mainConfigFile: 'public/javascripts/mainConfig.js',
          modules: [
            {
              name: 'app',
              include: []
            }
          ],

          fileExclusionRegExp: /^\.|^Gruntfile.js$|^\*.md$|^spec$|^assets$|^build$|^less$|vendors|node_modules|package.json/,
          removeCombined: true
        }
      }
    },
    uglify: {},
    watch: {
      jshint: {
        files: '<%= jshint.use_defaults %>',
        tasks: [ 'jshint' ]
      }
    },
    testem: {
      options: {
        launch_in_ci: [
          'Chrome',
          'Firefox',
          'Safari'
        ]
      },
      app: {
        src: [
          'spec/specRunner.html'
        ],
        dest: 'tests.tap'
      }
    }
  });

  aGrunt.registerTask('default', [ 'jshint' ]);
};