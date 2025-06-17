const mongoose = require("mongoose");

//Schema for entity
const postSchema = new mongoose.Schema({
    content: { type: String, required: true},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}

})

//Model of schema
const Post = mongoose.model("Post", postSchema);

//CRUD Functions

//Create a post
async function createPost(content) {
    const user = await User.FindById(userId);
    if (!user) throw Error("User not found");

    const post = await Post.create({ userId, content});
    return post
}

//READ - Getting all posts by a user
async function GetUserPosts(userId) {
    return await Post.find({ userId }).populate("userId", "username");
}

//UPDATE - Updating an existing post

async function updatePost(postId, userId, newContent) {
    const post = await Post.updateOne({"_id": postId, userId: userId}, { content: newContent }, );
    return post;
}

//DELETE - Deleting a post
async function deletePost(postId) {
    await Post.deleteOne({"_id": postId});
};

//export all functions we want to access in route file
module.exports = {createPost, GetUserPosts, updatePost, deletePost};