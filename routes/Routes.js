const express = require('express');
const routes = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("../Models/User");
const jwt = require("jsonwebtoken")
const jwt_token = require('../middleware/jwt_token');
const { token } = require('morgan');


routes.get("/", jwt_token, async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'server Error'
        })
        next();

    }
})


routes.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        let user_exist = await userModel.findOne({ email: email });
        if (user_exist) {
            res.json({
                success: false,
                msg: "user already exist"
            });
            return;
        }
        const user = new userModel();
        user.username = username;
        user.email = email;
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        let size = 200;
        user.avatar = "https://gravatar.com/avatar/?s=" + size + "&d=retro";

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwt_secret_token, {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                token: token
            })
        })



    } catch (error) {
        console.log(error)
    }
});

routes.post("/login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await userModel.findOne({
            email: email
        });
        if (!user) {
            res.status(400).json({
                success: false,
                msg: 'user not exist ,please Register'
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                sucess: false,
                msg: 'invalid password'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, process.env.jwt_secret_token,
            {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    msg: 'user login sucessful',
                    token: token,
                    user: user

                });
            }
        )


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'server error'
        })
    }
})
module.exports = routes;