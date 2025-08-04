const {Schema,model} = require("mongoose")
const gameSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = model("Game",gameSchema)