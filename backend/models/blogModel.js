import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
       title:{
        type:String,
        required:[true,'Title is required']
    },
    description:{
        type:String,
        required:[true,'Description is True']
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        require:[true,'User is required']
    }
},{timestamps:true})


export default mongoose.model('Blogs',blogSchema)