const express = require("express");
const connectDB = require("./config/Database")
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validator")
const bcrypt = require('bcrypt');
// express.json() --> it is a middleware which is used to convert json data to js object
app.use(express.json());

app.post("/signup",async (req,res)=>{
    // creating a new instance for the user model
    // const user  = new User({
    //     firstName:"Shlok",
    //     lastName:"Jain",
    //     emailId:"shlok30jain@gmail.com",
    //     password:"Shlok30",
    // });
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

})




// get user by email
app.get("/user", async (req,res)=>{
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

})


// get user by user id
app.get("/userId", async (req,res)=>{
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

})


// Delete the user with their id
app.delete("/user", async (req,res)=>{
    const userId = req.body._id;
    try{
       const users = await User.findByIdAndDelete(userId);
       res.send("User deleted Successfully")
    }catch(err){
        res.status(501).send("Something went wrong");
    }
})

// update user by their id
app.patch("/user/:userId", async (req,res)=>{
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
})

// update user by their email id
app.patch("/user1", async (req,res)=>{
    const userEmail = {emailId: "shlok30jain@gmail.com"};
    const data = req.body;
    try{
       const users = await User.findOneAndUpdate(userEmail, data);
       res.send("User update Successfully")
    }catch(err){
        res.status(501).send("Something went wrong");
    }
})
// Feed API - Get/Feed -- get all the users from the database
app.get("/feed", async (req,res)=>{
   try{
      const users = await User.find({});
      res.send(users);
   }catch(err){
       res.status(501).send("Something went wrong");
   }
})
// Note always database must connect first then our server must be start
connectDB().then(()=>{
    console.log("Connection stabilished successfully");
    app.listen("7777", ()=>{
        console.log("Server is listening on 7777");
        });
}).catch((err)=>{
    console.log("Connection is not estabilished");
});

