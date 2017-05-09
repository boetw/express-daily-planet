//requires
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

//set/use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('static'))

//routes
///SITE
app.get("/", function(req, res) {
	res.render('site/index');
});
app.get("/about", function(req, res) {
	res.render('site/about');
});
app.get("/contact", function(req, res) {
	res.render('site/contact');
});
///ARTICLES
app.get("/articles", function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	var data = JSON.parse(fileContents);
	res.render("articles", {
		articles: data
	});
});
app.get("/articles/new", function(req, res) {
	res.render('articles/new');
});
app.get("/articles/:idx", function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	var data = JSON.parse(fileContents);
	var articleIndex = parseInt(req.params.idx);
	res.render("articles/show", {
		articles: data[articleIndex]
	});
});
////post
app.post("/articles/new", function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	var data = JSON.parse(fileContents);
	data.push(req.body);
	fs.writeFileSync('./data.json', JSON.stringify(data));
	res.redirect('/articles');
});


//listen
app.listen(3000);