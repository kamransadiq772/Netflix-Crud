const router = require("express").Router()
const Movie = require('../models/Movie')
const {verify} = require('../helper/helper')

//CREATE 

router.post("/",verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(200).json(savedMovie);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Only Admin Can create")
    }
})



//UPDATE
router.put("/:id",verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Sorry No Access for you")
    }
})



//DELETE
router.delete("/:id",verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie Has Been Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Sorry No Access for you")
    }
})

//GET
router.get("/:id", async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie)
        } catch (error) {
            res.status(500).json(error)
        }    
})



//GET Random
router.get("/random",verify, async (req, res) => {
    const type = req.query?.type
    let movie;
        try {
            if(type && type === "series" ){
                movie = await Movie.aggregate([
                    {$match : {isSeries : true}},
                    {$sample : {size : 1}},
                ])
            }else{
                movie = await Movie.aggregate([
                    {$match : {isSeries : false}},
                    {$sample : {size : 1}},
                ])
            }
            res.status(200).json(movie)
        } catch (error) {
            res.status(500).json(error)
        }
})




//GET USER STATES
// router.get('/stats',async(req,res)=>{
//     const today = new Date()
//     const lastYear = today.setFullYear(today.setFullYear() - 1)

//     const mounthArray = [
//         "January","February","March","April","May","June","July","August","September","October","November","December"
//     ]

//     try {
//         const data = await User.aggregate([
//             {
//                 $project : {
//                     month : {$month : `$createdAt`}
//                 }
//             },{
//                $group : {
//                 _id : "$month",
//                 total : {$sum : 1}
//                } 
//             }
//         ])
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

module.exports = router