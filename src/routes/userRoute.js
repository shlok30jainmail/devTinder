const {signUp, login, getProfile, getUserByEmail,getUserById, deleteUser , updateUserbyId, updateUserByEmail, feed} = require("../controllers/userController");
const express = require('express');
const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login)
router.get("/profile", getProfile)

// get user by email
router.get("/user", getUserByEmail)


// get user by user id
router.get("/userId", getUserById)


// Delete the user with their id
router.delete("/user",deleteUser)

// update user by their id
router.patch("/user/:userId", updateUserbyId)

// update user by their email id
router.patch("/user1", updateUserByEmail)
// Feed API - Get/Feed -- get all the users from the database
router.get("/feed", feed)

module.exports = router;