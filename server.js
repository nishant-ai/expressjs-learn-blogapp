// Express SetUp
const express = require('express');
const app = express()

// Mongoose SetUp
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog'); //, {useNewUrlParser: true, useUnifiedTopology: true} - earlier version

// View Engine SetUp
app.set('view engine', 'ejs');

// GET/POST method override functionality
const methodOverrride = require('method-override');

// Routers Import
const articleRouter = require('./routes/articles');

// MODELS
const Article = require('./models/article');

// ---------------- ROUTERS ---------------- \\

// home - articles
app.use(express.urlencoded({extended: false})); // for easy access of POST data

// method override for GET/POST in forms
app.use(methodOverrride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles: articles});
})

// articles-router
app.use('/articles', articleRouter);

// App Port
app.listen(3000)