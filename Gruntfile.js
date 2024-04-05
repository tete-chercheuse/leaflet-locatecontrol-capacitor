module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        preserveComments: false,
        sourceMap: true
      },
      build: {
        src: "src/L.Control.Locate.js",
        dest: "dist/L.Control.Locate.js"
      }
    },
    sass: {
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "dist/L.Control.Locate.css": "src/L.Control.Locate.scss",
          "dist/L.Control.Locate.mapbox.css": "src/L.Control.Locate.mapbox.scss"
        }
      }
    },
    bump: {
      options: {
        files: ["package.json", "bower.json"],
        commitFiles: [
          "package.json",
          "bower.json",
          "dist/L.Control.Locate.css",
          "dist/L.Control.Locate.css.map",
          "dist/L.Control.Locate.mapbox.css",
          "dist/L.Control.Locate.mapbox.css.map",
          "dist/L.Control.Locate.js",
          "dist/L.Control.Locate.js.map"
        ],
        push: false
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          protocol: "https",
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-bump");
  grunt.loadNpmTasks("grunt-contrib-connect");

  // Default task(s).
  grunt.registerTask("default", ["uglify", "sass"]);
};
