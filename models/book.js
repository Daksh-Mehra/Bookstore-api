import mongoose from 'mongoose';

const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Book title is required'],
        trim:true,
        maxLength:[100,'Book title must be less than 100 characters']
    },
    author:{
        type:String,
        required:[true,'Book author is required'],
        trim:true,
    },
    year:{
        type:Number,
        required:[true,'Publication year is required'],
        min:[1000,'Publication year must be after 1000'],
        validate:{
            validator:function(value){
                return value <= new Date().getFullYear();
            },
            message:'Publication year cannot be in the future'
        }
    },
},{timestamps:true});

const Book=mongoose.model('Book',BookSchema);

export default Book;