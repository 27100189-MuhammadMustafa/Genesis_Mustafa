const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect('mongodb+srv://javedmustafa557:Mustafa123456789@mustafa.ixs2atb.mongodb.net/Mustafa?retryWrites=true&w=majority&appName=Mustafa',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

const newUser = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 25
})
newUser.save()
.then(user => console.log('User created:', user))
.catch(err => console.error('Error creating user', err));
//for task3