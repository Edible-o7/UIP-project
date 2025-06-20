//import needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in post model file
const router = express.Router();

//create all routes to access database
router
    .post('/createPost', async (req, res) => {
        try {
            const post = await Post.createPost(req.body.userId, req.body.content);
            res.send(post)
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .post('/getPost', async (req, res) => {
        try {
            const post = await Post.getPost(req.body.postId)
            res.send(post);
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .put('/updatePost', async (req, res) => {
        try {
            const post = await Post.updatePost(req.body.postId, req.body.content);
            res.send(post);
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .delete('/deletePost', async (req, res) => {
        try {
            await Post.deletePost(req.body.postId);
            res.send({ success: "Post deleted "});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    //export router for use in index.js
    module.exports = router;