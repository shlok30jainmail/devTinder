const User = require("../models/user")
const {validateSignUpData} = require("../utils/validator")
const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require("cookie-parser");



exports.signUp = async (req,res)=>{
    try{
        // validation of data
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;
        // encryption

        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        // now we insert our data with validatio
    //    const user  = new User(req.body);
    const user  = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });

  

    await user.save();
    res.send("User created successfully");
 }catch(err){
      res.send("User is not created due to some issue - "+ err);
 }

}

exports.login = async(req,res)=>{
try {
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        // res.status(404).send("Email Id is not present in DB");
        throw new Error("Email is not present in DB");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){

        // Create a JWT Token

        // Add the token to cookie
         res.cookie("token", "gshfjksdflllllllllllllllgdfd");
        // send status
        res.status(200).send("Login Successfully");
    }else{
        throw new Error("Password not correct");
    }
} catch (error) {
    // res.status(400).send("Error : " + error.message);
        res.status(400).json({
            success: false,
            message: "User is not created due to some issue",
            error: error.message
        });
}
}

exports.getProfile = async(req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.status(200).json({
        success:true,
        message:"Cookies get successfully",
        // data:cookies
    });
}

// get user by email
exports.getUserByEmail = async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        // here user is an array ok because find gives an array
        const users  = await User.find({emailId: userEmail}); 
        // if array is empty means there is no user such mail then
        if(users.length ===0){
            res.status(404).send("No user of this email");
        }else{
            res.send(users);
        }
       
    }catch(err){
      res.send("Something went wrong");
    }

}


// get user by user id
exports.getUserById = async (req,res)=>{
    const userId = req.body._id;
    console.log(userId);
    try{
        // here user is an array ok because find gives an array
        const user  = await User.findById({_id: userId}); 
        // if array is empty means there is no user such mail then
        if(user.length ===0){
            res.status(404).send("No user of this email");
        }else{
            res.send(user);
        }
       
    }catch(err){
      res.send("Something went wrong");
    }

}


// Delete the user with their id
exports.deleteUser = async (req,res)=>{
    const userId = req.body._id;
    try{
       const users = await User.findByIdAndDelete(userId);
       res.send("User deleted Successfully")
    }catch(err){
        res.status(501).send("Something went wrong");
    }
}

// update user by their id
exports.updateUserbyId = async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills", "age"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(! isUpdateAllowed){
            throw new Error("Update not allowed");
        }
       const users = await User.findByIdAndUpdate(userId, data, { runValidators: true, context: 'query' });
       res.send("User update Successfully")
    }catch(err){
        res.status(501).send("Update Failed " + err.message);
    }
}

// update user by their email id
exports.updateUserByEmail = async (req,res)=>{
    const userEmail = {emailId: "shlok30jain@gmail.com"};
    const data = req.body;
    try{
       const users = await User.findOneAndUpdate(userEmail, data);
       res.send("User update Successfully")
    }catch(err){
        res.status(501).send("Something went wrong");
    }
}

// Feed API - Get/Feed -- get all the users from the database
exports.feed = async (req,res)=>{
   try{
      const users = await User.find({});
      res.send(users);
   }catch(err){
       res.status(501).send("Something went wrong");
   }
}