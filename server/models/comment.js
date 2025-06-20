const mongoose = require("mongoose");

//Schema for entity
const postSchema = new mongoose.Schema({
    content: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true}

})

//Model of schema
const Comment = mongoose.model("Comment", postSchema);

//CRUD Functions

//Create a comment
async function createComment(userId, postId, content) {
    const newComment = await Comment.create({
        userId: userId, 
        postId: postId,
        content: content
    })
    return newComment
}

//READ - Read a comment by ID
async function getComment(commentId) {
    return await Comment.findById(commentId)
}

//UPDATE - Updating an existing comment's content

async function updateComment(commentId, newContent) {
    const updatedComment = await Comment.updateOne({"_id": commentId }, { $set: {content: newContent }, });
    return updatedComment;
}

//DELETE - Deleting a comment
async function deleteComment(commentId) {
    await Comment.deleteOne({"_id": commentId});
};

//export all functions we want to access in route file
module.exports = {createComment, getComment, updateComment, deleteComment};