const router = require("express").Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const {verify} = require('../helper/helper')


//UPDATE
router.put("/:id",verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    } else {
        res.status(403).json("Sorry No Access for you")
    }
})

//DELETE
router.delete("/:id",verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user Has Been Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Sorry No Access for you")
    }
})

//GET
router.get("/find/:id", async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc
            res.status(200).json(info)
        } catch (error) {
            res.status(500).json(error)
        }    
})

//GET ALL
router.get("/",verify, async (req, res) => {
    const query = req.query?.new
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find() ;
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not Allowed")
    }
})

//GET USER STATES

router.get('/stats',async(req,res)=>{
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear() - 1)

    const mounthArray = [
        "January","February","March","April","May","June","July","August","September","October","November","December"
    ]

    try {
        const data = await User.aggregate([
            {
                $project : {
                    month : {$month : `$createdAt`}
                }
            },{
               $group : {
                _id : "$month",
                total : {$sum : 1}
               } 
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router