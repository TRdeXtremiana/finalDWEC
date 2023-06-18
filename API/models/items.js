
import { Schema, model } from 'mongoose'

const itemsSchema = Schema({
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
})

export default model('items', itemsSchema)