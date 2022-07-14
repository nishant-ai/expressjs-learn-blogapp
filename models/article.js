const mongoose = require('mongoose');
const { marked } = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const slugify = require('slugify');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // takes a function TF gave without call=()
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
})

articleSchema.pre('validate', function (next) { // WHILE CRUD req, this func will run for Article.
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true});
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
})

module.exports = mongoose.model('Article', articleSchema);