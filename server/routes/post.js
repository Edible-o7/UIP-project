//import needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in post model file
const router = express.Router();

//create all routes to access dataase
router
    .post('/createPost', async (req, res) => {
        try {
            const { userId, content } = req.body;
            const post = await createPost(userId, content);
            res.send(post)
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .post('/GetUserPosts', async (req, res) => {
        try {
            const { userId } = req.body;
            const post = await GetUserPosts(userId);
            res.send(post);
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .put('/updatePost', async (req, res) => {
        try {
            const { postId, userId, content } = req.body;
            const updatePost = await updatePost(postId, userId, content);
            res.send(updatePost)
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .delete('/deletePost', async (req, res) => {
        try {
            const {postId, userId } = req.body
            await deletePost( postId, userId);
            res.send({ success: "Post deleted "});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    //export router for use in index.js
    module.exports = router;