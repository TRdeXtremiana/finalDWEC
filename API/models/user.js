import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    pass: {
        type: String,
        require: true,
        minlength: 6
    }
})

export default model('User', userSchema)