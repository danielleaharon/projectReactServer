const User = require('../models/user');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
require('dotenv').config();


const createUser = async (email,name,password) => {
    console.log("createUser")
    // User.findOne(email).exec((err,user)=>{
    //     if(user){
    //         return null;
    //     }
    // })
    const user = new User({
        email : email,
        name: name,
        password:password

    });

    return await user.save();
};
const Signin= async (email) => {

    const user= await User.findOne({email});
    // .exec((err,user)=>{
    //     console.log("in:"+user);

    //     if(user) return   user;
    //     else return   null;
    // });
    console.log(user);
    return await user;
     
};
const Signup= async (email,name,password) => {

     const user= await User.findOne({email});
        if(user){
            console.log(user)

            return await null;
        }
        else{
            let username=email;
            let profile= `${process.env.CLIENT_URL}/profile/${username}`;
            const newUser = new User({
                email : email,
                name: name,
                password:password,
                profile:profile,
                username:username
        
        
            });
        //    let newUser= new User({name,email,password,profile,username});
           return await newUser.save();
        }
    
  
//        (err,success)=>{
//     if(err){
//         return res.status(400).json({
//             error:err
//         })
//     }else{
//         res.json({
//             message:'Signup success!' + success
//         })
//     }
// });
  
};
const getUserById = async (id) => {
  
    return await User.findById(id);
};


const getUsers = async () => {
    return await User.find({});
};

const updateUser = async (id, email,name,password) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    user.email = email;
    user.name=name;
    user.password=password
    await user.save();
    return user;
};

const deleteUser= async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    await user.remove();
    return user;
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    Signup,
    Signin
}