const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = mongoose.Types.ObjectId()
const userTwoId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Wendy',
    email: 'wendy@example.com',
    password: 'Green123!',
    tokens: [{
        token: jwt.sign({_id: userOneId},  process.env.JWT_SECRET)
    }]
}
const userTwo = {
    _id: userTwoId,
    name: 'Heen',
    email: 'heen@example.com',
    password: 'Blue123!',
    tokens: [{
        token: jwt.sign({_id: userTwoId},  process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: 'My First Task',
    completed: false,
    owner: userOneId._id
}
const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: 'My Second Task',
    completed: true,
    owner: userOneId._id
}
const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: 'My Third Task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}