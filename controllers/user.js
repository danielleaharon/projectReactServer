const userService = require('../services/user');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const User=require('../models/user');
require('dotenv').config();


  
const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.email,req.body.name,req.body.password);
    res.json(newUser);
};
const Signup= async (req, res) => {
    return await userService.Signup(req.body.email,req.body.name,req.body.password).then((newUser)=>{
        console.log(newUser)
        if(newUser!=null)
        {
            res.json({
                message:'Signup success!' 
            })
        }
        else{
            res.json({ error: ['email is taken'] });
        }
    });
    
    // res.json(newUser);

};
const Signin=async (req, res) => {
   const {email,password}=req.body;
    return await userService.Signin(email).then((user)=>{
        if (!user) {
            return res.status(404).json({ error: ['User not found'] });
        }
        if(!user.authenticate(password))
        return res.status(400).json({error:'Email and password do not match'});
    
        const token =jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    
        console.log(process.env.JWT_SECRET);
        res.cookie('token',token,{expiresIn:'1d'});
        return  res.json({
            token,user
        });
    });
    
    // res.json(user);
};
  const Signout= (req, res) => {

  res.clearCookie("token")
  return res.json({
      message:'signout success'
  });
};

const getUsers = async (req, res) => {
    const articles = await userService.getUsers();
    console.log("ddddd"+articles)
    res.json(articles);
};
// console.log(expressJwt.JWT_SECRET)

// module.exports.requireSignin=expressJwt({
//     secret: process.env.JWT_SECRET
// });


const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    

    res.json(user);
};

const updateUser= async (req, res) => {
    if (!req.body.title) {
      res.status(400).json({
        message: "title is required",
      });
    }
  
    const article = await userService.updateUser(req.params.id, req.body.title);
    if (!article) {
      return res.status(404).json({ errors: ['Article not found'] });
    }
  
    res.json(article);
  };

  const deleteUser= async (req, res) => {
    const article = await userService.deleteUser(req.params.id);
    if (!article) {
      return res.status(404).json({ errors: ['Article not found'] });
    }
  
    res.send();
  };



  module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    Signin,
    Signout,
    Signup,
  };