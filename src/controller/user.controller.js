const express = require("express");
const userschema = require("../models/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    // grab all the needed fields
    const{name,email,password,phone,country, role} = req.body;
    const userName = req.username;
    console.log(name,email,password,phone,country)

    //verify the email and phone number not in use by another user
    const verifymail = await userschema.findOne({email: email});
    const verifyphone = await userschema.findOne({phone: phone})

    // register the user
    try{
        if(verifymail || verifyphone){
            return res.status(403).json({
                success: false,
                message: "email or phone number already in use",
            });
        } else {
          if (password) {
            bcrypt.hash(password, 10).then((hashresult) => {
             const user = new userschema ({
                name,
                email,
                password: hashresult,
                phone,
                country,
                userName
            });
            user
            .save()
            .then((response)=> {
                return res.status(201).json({
                    success: true,
                    data: response,
                    message:"user registeration successful",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
               });
            });
            console.log(hashresult);
          });
          }
        }
    } catch (e) {
        return res.status(412).send({
            success: false,
            message: e,
        });
    }
};

const login = async (req, res) => {
    //grab the login credentials/ data from the request body
    const {email,password} = req.body
    //use the email to lookup the user from the db
    let getUser;
    userschema
              .findOne({email: email})
              .then((user) => {
                //if no matching user with the give email resolve, return Auth Error
                if (!user) {
                    return res.status(401).json({
                        message: "Authorization failed",
                    });
                }
                getUser = user;
                //if there is a matching user with the given email, go ahead and login the person
                return bcrypt.compare(password, user.password);

              })
              .then ((response) => {
                //if the password is correct
                if (!response) {
                    return res.status(401).json ({
                        message: "Invalid password"
                    });
                } else {
                    //generate a JWT token 
                    let jwtToken = jwt.sign (
                        {
                            email: getUser.email,
                            userId: getUser._id,
                            name: getUser.name ,
                            username: getUser.userName,
                            phone: getUser.phone,

                        },
                        process.env.JWTSECRET,
                        {
                            expiresIn: "1d",
                        }
                    
                    );
                    return res.status(200).json({
                        accessToken: jwtToken,
                        userId: getUser. _id,
                        username: getUser.userName
                    });

                }
                
               })
              .catch ((err) => {
                //otherwise if anyb error
                return res.status(401).json({
                      message: err.message,
                    success: false,
                });
            });

};

module.exports = {register, login};