const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const Blog = require('./modules/blogs');
const blogRoutes = require('./Router/blogRoutes');
const authRoutes = require('./Router/authRoutes');
const cookieParser = require('cookie-parser');
const User = require('./modules/user');
const jwt = require('jsonwebtoken')
const app = express();
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
require('dotenv').config()
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000
app.listen(`${port}`);


app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//middlware for storing temporatry data of json form and convert them in JS for our use
app.use(express.json());

//for taking any file from that folderwhich is mentioned in public without path here we are adding the css in header

const dburl = process.env.db;
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => {
    res.render('homepage');
});
app.get('/tree', requireAuth, (req, res) => {
    res.render('tree');
});
app.get('/DP', requireAuth, (req, res) => {
    res.render('DP');
});
app.get('/Arrays', requireAuth, (req, res) => {
    res.render('Arrays');
});
app.get('/Backtracking', requireAuth, (req, res) => {
    res.render('BackTracking');
});
app.get('/BitManipulation', requireAuth, (req, res) => {
    res.render('BitManipulation');
});
app.get('/Graphs', requireAuth, (req, res) => {
    res.render('Graphs');
});
app.get('/Greedy', requireAuth, (req, res) => {
    res.render('Greedy');
});
app.get('/Hashing', requireAuth, (req, res) => {
    res.render('Hashing');
});
app.get('/Linkedlist', requireAuth, (req, res) => {
    res.render('Linkedlist');
});
app.get('/TimeComplexity', requireAuth, (req, res) => {
    res.render('TimeComplexity');
});
app.get('/Queue', requireAuth, (req, res) => {
    res.render('Queue');
});
app.get('/Stacks', requireAuth, (req, res) => {
    res.render('Stacks');
});


app.get('/about', requireAuth, (req, res) => {
    res.render('about', { title: 'ABOUT' })
});


app.get('/createBlog', requireAuth, (req, res) => {
    res.render('createBlog', { title: 'Blog' });
});
app.get('/topics', requireAuth, (req, res) => {
    res.render('topics');
})
app.get('/homepage', requireAuth, (req, res) => {
    res.render('homepage');
})
app.get('/programming', requireAuth, (req, res) => {
    res.render('programming');
})
app.get('/aptitude', requireAuth, (req, res) => {
    res.render('aptitude');
})
app.get('/hr', requireAuth, (req, res) => {
    res.render('hr');
})

app.use(authRoutes);
app.use('/blogs', blogRoutes);
