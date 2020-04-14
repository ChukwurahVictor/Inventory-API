const mongoose = require('mongoose')
const schema = mongoose.Schema

const ItemSchema = new schema({
    name: {
        type: String,
        require: true
    },
    unitPrice: {
        type: String,
        require: true
    },
    bulkPrice: {
        type: String,
        require: true
    },
    category: {
        type: String
    }
})

//export module
Item = mongoose.model('item', ItemSchema)
module.exports = Item