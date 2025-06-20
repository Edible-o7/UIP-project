//import needed libraries
const express = require("express");
const Comment = require('../models/comment'); //accesses functions in comment model file
const router = express.Router();

//create all routes to access database
router
    .post('/createComment', async (req, res) => {
        try {
            const comment = await Comment.createComment(req.body.userId, req.body.postId, req.body.content);
            res.send(comment)
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .post('/getComment', async (req, res) => {
        try {
            const comment = await Comment.getComment(req.body.commentId)
            res.send(comment);
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .put('/updateComment', async (req, res) => {
        try {
            const comment = await Comment.updateComment(req.body.commentId, req.body.content);
            res.send(comment);
      } catch(error) {
        res.status(401).send({ message: error.message});
      }
    })

    .delete('/deleteComment', async (req, res) => {
        try {
            await Comment.deleteComment(req.body.commentId);
            res.send({ success: "Comment deleted "});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    //export router for use in index.js
    module.exports = router;