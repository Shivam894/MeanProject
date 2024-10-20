const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://mailshivamsr:eHKjq7dK3G7677na@cluster0.gowde.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Connected to database!');
}).catch(()=>{
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) =>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers","Origin, x-Requested-with,Content-Type,Accept");
res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
);
next();
});

app.post("/api/posts",(req,res,next)=>{
    // const post = req.body;
    const post = new Post ({
        title: req.body.title,
          content: req.body.content 
    })
post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.put("/api/posts/:id" ,(req, res, next) =>{
    const post = new Post({
        _ID: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    post.updateOne({_id: req.params.id}, post).then(result =>{
        console.log(result);
        res.status(200).json({message : "Update Successfully !"})
    })
})


app.get("/api/posts",(req,res,next)=>
    {
        // const posts =[
        //     {id :'fa',title:'first server-side post', content:'This is coming'},
        //     {id :'fa',title:'first server-side post', content:'This is coming'}
        // ]; 
    Post.find().then(document=>{
console.log(document);
    });
        res.status(200).json({
            message: 'Post fetched Successfully',
            posts: posts
        });
console.log('First middleware');
// next();
    });

    // app.post("/api/posts",(req,res,next)=>{
    //     console.log();
    // })

//     app.use((req,res,next)=>
//     {
// res.send('Hello from Express');
//     });

    module.exports = app;