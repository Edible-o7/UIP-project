const mongoose = require("mongoose");

//Schema for entity
const postSchema = new mongoose.Schema({
    content: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}

})

//Model of schema
const Post = mongoose.model("Post", postSchema);

//CRUD Functions

//Create a post
async function createPost(userId, content) {
    const newPost = await Post.create({
        userId: userId, 
        content: content
    })
    return newPost
}

//READ - Read a post by ID
async function getPost(postId) {
    return await Post.findById(postId)
}

//UPDATE - Updating an existing post's content

async function updatePost(postId, newContent) {
    const updatedPost = await Post.updateOne({"_id": postId }, { $set: {content: newContent }, });
    return updatedPost;
}

//DELETE - Deleting a post
async function deletePost(postId) {
    await Post.deleteOne({"_id": postId});
};

//export all functions we want to access in route file
module.exports = {createPost, getPost, updatePost, deletePost};