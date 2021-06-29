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
        res.render('home', {posts: posts});
    });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const {title, description, location} = req.body;

    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err;

        const posts = JSON.parse(data);

        posts.push({
            id: id(),
            title,
            description,
            location,
            published_at: new Date()
        });

        fs.writeFile('./data/posts.json', JSON.stringify(posts), err => {
            if (err) throw err;

            res.render('home', {posts: posts})
        })
    });
});

app.get('/posts/view/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./data/posts.json', (error, data) => {
        if (error) throw error;

        const posts = JSON.parse(data);
        const post = posts.filter(post => post.id === id)[0] ;
        res.render('view', {post});
    });

})

app.listen(8000, err => {
    if (err) {
        console.log(err);
    }

    console.log('Server is running on port 8000...');
});

function id() {
    return '_' + Math.random().toString(36).substr(2,9);
}