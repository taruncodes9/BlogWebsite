const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const username = 'tarunchhabra763';
const password = 'ePPfUGL8CdVOjO6I';

async function connectToMongoDB() {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.wgw0tfl.mongodb.net/blogwebsitedb`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

connectToMongoDB();

// Use 'ejs' as the view engine
app.set('view engine', 'ejs');

// Correct the views path
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/articles');
});

app.get('/articles', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
});



app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});