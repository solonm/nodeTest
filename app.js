//////// Start Build ////////////
var gulp = require('gulp');
var build = require('gulp-build');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulpIgnore = require('gulp-ignore');
var jshint = require('gulp-jshint');

gulp.task('build', function() {
  gulp.src('views/js/built/*.js')
      .pipe(build({ GA_ID: '0.0.1' }))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest('dest'))
});

gulp.task('task', function() {
  gulp.src('views/js/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function(){
  return gulp.src('views/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('lib', function(){
  return gulp.src('views/js/lib/*.js')
    .pipe(gulp.dest('build/js'))
});

gulp.task('css', function(){
  return gulp.src('views/css/*.css')
    .pipe(gulp.dest('build/css'))
});

gulp.task('images', function(){
  return gulp.src('views/images/*')
    .pipe(gulp.dest('build/images'))
});

gulp.task('fonts', function(){
  return gulp.src('views/fonts/*')
    .pipe(gulp.dest('build/fonts'))
});
gulp.start('build');
gulp.start('task');
gulp.start('html');
gulp.start('css');
gulp.start('lib');
gulp.start('images');
gulp.start('fonts');
//////// End Build ////////////

/* Push to GitHub */
var push = require('git-push');
 
push('./app', 'http://github.com/example/example.github.io', function() {
  console.log('Done!');
});
/* End push to GitHub */

var redisClient = require('./redis.js');
var encryption = require('./encryption.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');

var db = require('mysql-promise')();
db.configure({
  "host": "localhost",
  "user": "root",
  "password": "salamina",
  "database": "NODE_CMS"
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var path = require('path');
var compression = require('compression');

app.use(compression()); //use compression 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  console.log('Request received: ' + req.url);
    res.sendfile('build/index.html', {root: __dirname })
});
app.get('/generic', function(req, res) {
  console.log('Request received: ' + req.url);
    res.sendfile('build/generic.html', {root: __dirname })
});
app.get('/elements', function(req, res) {
  console.log('Request received: ' + req.url);
    res.sendfile('build/elements.html', {root: __dirname })
});
app.get('/login', function(req, res) {
  console.log('Request received: ' + req.url);
    res.sendfile('build/login.html', {root: __dirname })
});

app.get('/js*', function(req, res) {
	console.log('Request received: ' + req.url);
    res.sendfile('build'+req.url, {root: __dirname });
});

app.get('/css*', function(req, res) {
	console.log('Request received: ' + req.url);
    res.sendfile('build'+req.url, {root: __dirname });
});
app.get('/fonts*', function(req, res) {
	console.log('Request received: ' + req.url.split('?')[0]);
    res.sendfile('build'+req.url.split('?')[0], {root: __dirname });
});

app.get('/images*', function(req, res) {
	console.log('Request received: ' + req.url);
    res.sendfile('build'+req.url, {root: __dirname });
});

app.post('/loginUser', function(req, res) {
  console.log('Request received: ' + req.url);
  var username = req.body.username;
  var password = req.body.password;
  db.query('SELECT * FROM Users where username="'+username+'" and password="'+password+'"')
  .spread(function (users) {
    if(users.length > 0){
      var token = encryption.encrypt(users[0]).toString();
      redisClient.set(token, true, 10);
      var response = {"Code": 200, "Message": "logged In", "Token" : token};
      res.send(response);
    }
    console.log('Hello users', users);
  });
});

app.post('/logoutUser', function(req, res) {
  console.log('Request received: ' + req.url);
  var token = req.body.Token;
  console.log(token);
  var user = encryption.decrypt(token);
  console.log(user);
  redisClient.del(token);
  var response = {"Code": 200, "Message": "logged Out", "Token" : ""};
  res.send(response);
});

redisClient.notifier(function(key){
  io.emit('msg', "logged out");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  io.emit('msg', "test msg");
});

//app.listen('8080');
http.listen(8080, function(){
  console.log('listening on *:8080');
});
console.log('App started on port 8080');