const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article() });
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id); 
    res.render('articles/edit', {article: article});
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if (article == null) {
        console.log("Article is NOne")
        res.redirect('/');
    }
    res.render('articles/show', {article: article});
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try{
        article = await article.save(); // It is a async func
        res.redirect(`/articles/${article.slug}`);
    } catch(e){
        console.log(e);
        res.render(`articles/new`, {article: article});
    }
})

router.put('/:id', async (req, res) => { // Update Article Fucntionality Not Working!
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try{
        console.log(article);
        article = await article.save(); // It is a async func
        res.redirect(`/articles/${article.slug}`);
    } catch(e){
        console.log(e);
        res.render(`articles/edit`, {article: article});
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

// function saveArticleAndRedirect (path) {
//     return async (req, res) => {
//         let article = req.article
//         article.title = req.body.title
//         article.description = req.body.description
//         article.markdown = req.body.markdown
    
//         try{
//             article = await article.save(); // It is a async func
//             res.redirect(`/articles/${article.slug}`);
//         } catch(e){
//             console.log(e);
//             res.render(`articles/${path}`, {article: article});
//         }
//     }
// }

module.exports = router;