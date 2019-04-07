const l = console.log
require('dotenv').config({ path: 'variables.env' })
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync')

const sync = () => {
  return browserSync.init({
    files: ['server.js', 'public/**/*.*'],
    proxy: 'localhost:' + process.env.PORT,
  }, () => l('Browser refreshed.'))
}

gulp.task('watch', () => {
  sync()
})

gulp.task('default', () => {
  let brow = sync()
  nodemon({
    script: 'server.js',
    ignore: ['gulpfile.js', 'package*.json', 'node_modules/', 'public/**/*.*'],
    env: {
      NODE_ENV: process.env.NODE_ENV
    }
  }).on('start', () => {
    l('server start, refresh browser!');
    brow.reload()
  })
})