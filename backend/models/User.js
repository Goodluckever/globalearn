const mongoose =
require("mongoose");

const UserSchema =
new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        default:""
    },

    country:{
        type:String,
        default:""
    },

    gender:{
        type:String,
        default:""
    },

    role:{
        type:String,
        default:"user"
    },

    tier:{
        type:String,
        default:"Starter Plan"
    },

    accountBalance:{
        type:Number,
        default:0
    },

    accountStatus:{
        type:String,
        default:"active"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "User",
    UserSchema
);
