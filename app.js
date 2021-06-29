const express = require('express');
const app = express();

const fs = require('fs');

app.set('view engine', 'pug');
app.use(express.urlencoded({extended: false}));

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('./data/posts.json', (error, data) => {
        if (error) throw error;

        const posts = JSON.parse(data);
        console.log(posts);
        res.render('home', {posts: posts});
    });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.listen(8000, err => {
    if (err) {
        console.log(err);
    }

    console.log('Server is running on port 8000...');
})