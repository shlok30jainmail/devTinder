const mongoose = require("mongoose");
const validator = require("validator"); // for email we use this npm
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength:27,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        lowercase:true,
        trim:true,
        required: true,
        unique: true,
        validate:{
            validator:function(value){
                 if(!validator.isEmail(value)){
                     throw new Error("Email is not validate " + value);
                 }
            }
            
        }
    },
    password:{
        type: String,
        required: true,
        // validate:{
        //     validator:function(value){
        //          return value.length ==8;
        //     },
        //     message:"Password must be size 8",
        // }
    },
    age:{
        type: Number,
        min:18,
    },
    gender:{
        type: String,
        // validation(value){
        //     if(!["male", "female", "other"].includes(value)){
        //         throw new Error("Gender data is not valid"); 
        //     }
        // }
        type: String,
        validate: {
            validator: function (value) {
                return ["male", "female", "other"].includes(value);
            },
            message: "Gender data is not valid",
        },
    },
    photoUrl:{
      type:String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP44x_J2J0i-gBgLaQLUHyyOcIiznu2vEy-jD9zL8zT7UPlEHMBg_rdpnOsoh7nZa9D74&usqp=CAU",

    },
    about:{
     type:String,
     default:"This is default about for the user",
    },
    skills:{
        type:[String],
        validate: {
            validator: function (value) {
                return value.length <= 10; // Ensure the length is not more than 10
            },
            
        },
    },
    
},

{
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;