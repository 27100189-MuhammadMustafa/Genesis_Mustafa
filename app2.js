const express = require('express');
const mongoose = require('mongoose');
const User = require('./user2');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://javedmustafa557:Mustafa123456789@mustafa.ixs2atb.mongodb.net/Mustafa?retryWrites=true&w=majority&appName=Mustafa',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.post('/users', async (req,res) => {
    try {
        const users = new User(req.body);
        const savedUser = await users.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.put('/users/:id', async (req,res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updateUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updateUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
app.delete('/users/:id', async (req,res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
//for task4