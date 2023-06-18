
import { Schema, model } from 'mongoose'

const characterSchema = Schema({
    characterId: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    itemId: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    quantity: {
        type: Number,
        require: true,
        min: 1,
    },
})

export default model('Character', characterSchema)