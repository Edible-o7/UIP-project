const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

//Schema for entity
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    followers: [String],
    following: [String]
})

//Model of schema
const User = mongoose.model("User", userSchema);

//CRUD functions

//Create a user
async function register(username, password, email) {
    const user = await getUser(username);
    if(user) throw Error('Username already in use');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashed,
        email: email,
    })
    return newUser._doc;
}

//READ a user
async function login(username, password) {
    const user = await getUser(username);
    if(!user) throw Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw Error('Wrong password');

    return user._doc;
}

//Update a user
async function updatePassword(id, password) {
    const user = await User.updateOne({"_id": id}, {$set: {password: password}});
    return user;
}

//Delete a user
async function deleteUser(id) {
    await User.deleteOne({"_id": id});
};

//utility functions
async function getUser(username) {
    return await User.findOne({"username": username});
}

//export all functions we want to access in route file
module.exports = {register, login, updatePassword, deleteUser};