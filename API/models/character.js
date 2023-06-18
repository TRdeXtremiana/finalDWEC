import { Schema, model } from 'mongoose'

const characterSchema = Schema({
    userId: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    name: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },

    level: {
        type: Number,
        require: true,
        min: 1,
    },
    lucky: {
        type: Number,
        require: true,
        min: 1,
    },
    attack: {
        type: Number,
        require: true,
        min: 1,
    },
    health: {
        type: Number,
        require: true,
        min: 1,
    },
})

export default model('Character', characterSchema)