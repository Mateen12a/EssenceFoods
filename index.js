const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const flash = require("connect-flash");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');


const createPost = require('./controllers/createPost');
const Home = require('./controllers/home');

const createUser = require("./controllers/createUser");
const storeUser = require('./controllers/storeUser');
const login = require("./controllers/login");
const loginUser = require('./controllers/loginUser');
const app = new express();
const auth = require("./middleware/auth");
const storePostController = require('./controllers/storePost');
const getPost = require('./controllers/getPost');
const logout = require('./controllers/logOut');
const storePost = require('./middleware/storePost');



new mongoose.connect('mongodb://Ajidagba:Marinestar@blog0-shard-00-00-rna9n.mongodb.net:27017,blog0-shard-00-01-rna9n.mongodb.net:27017,blog0-shard-00-02-rna9n.mongodb.net:27017/node-blog?ssl=true&replicaSet=Blog0-shard-0&authSource=admin&retryWrites=true', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

app.use(flash());

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(express.static("public"));
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId);
    next();
});
mongoose.connect('mongodb://localhost:27017/node-blog', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));


app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    uploadDir: './public/posts'
}));
app.get("/", Home);

app.get("/post/new", auth, createPost);
app.get("/auth/login", redirectIfAuthenticated, login);
app.post("/users/login", redirectIfAuthenticated, loginUser);
app.get("/auth/register", redirectIfAuthenticated, createUser);
app.post("/users/register", redirectIfAuthenticated, storeUser);
app.get("/post/:id", getPost);
app.get('/auth/logout', logout);
app.post("/posts/store", auth, storePostController,storePost);


app.listen(4000, () => {
    console.log('Server Started On Port 4000');
});


