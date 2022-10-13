const router = require('express').Router()
const User = require('../models/User')
const CryptoJs = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
    });

    try {
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        // console.log(error);
        res.status(500).json(error)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(401).json("Wrong email is provided") }

        const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET)
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

        if (originalPassword !== req.body.password) { return res.status(401).json("Invalid Credential") }

        const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET,{expiresIn:"5d"});

        const {password, ...info} = user._doc;
        res.status(200).json({info,accessToken}) //send things without password

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router