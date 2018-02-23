var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name : String,
    status :{
        type:Boolean,
        default:false,
    },
    userId : {type: Schema.Types.ObjectId, ref: 'User'}
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo