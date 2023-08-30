const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requires: true
    }
});

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {throw Error('Please fill in all fields.')}
    if (!validator.isEmail(email)) {throw Error('Please enter a valid email.')}
    if (!validator.isStrongPassword(password)) {throw Error('Passwords must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol.')}

    const exists = await this.findOne({email})
    if (exists) {throw Error('Email alrady in use')}

    const salt = await bcrypt.genSalt(11)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
};

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {throw Error('Please fill in all fields.')}
    
    const user = await this.findOne({email})
    if (!user) {throw Error('One or more of the fields is incorrect.')}

    const match = await bcrypt.compare(password, user.password)
    if (!match) {throw Error('One or more of the fields is incorrect.')}

    return user;
};

module.exports = mongoose.model('User', userSchema);