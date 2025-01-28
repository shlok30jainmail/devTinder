const validator = require('validator');

const validateSignUpData = (req)=>{
 const {firstName, lastName, emailId, password} = req.body;
 if(!firstName || !lastName){
    throw new Error("Name is not valid - write proper First & Last Name");
 }else if(firstName.length <4 || firstName.length >50){
    throw new Error("Name is not valid First Name should be 4 - 50 character");
 }else if(!validator.isEmail(emailId)){
    throw new Error("You Enter a wrong email ID");
 }else if(!validator.isStrongPassword(password)){
    throw new Error("Your password is not a strong password please enter a strong password");
 }
};

module.exports = {
    validateSignUpData,
}