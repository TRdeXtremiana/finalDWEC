
import { Schema, model } from 'mongoose'

const monsterSchema = Schema({
    id: {
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
    health: {
        type: Number,
        require: true,
        min: 1,
    },
    attack: {
        type: Number,
        require: true,
        min: 1,
    },
    defense: {
        type: Number,
        require: true,
        min: 1,
    },
})

export default model('monster', monsterSchema)