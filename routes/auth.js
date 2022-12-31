const router = require("express").Router();
const User = require("../models/User");

//REGISTER
// router.get("/register", async (req,res)=> {
//     const user = await new User({
//        username:"jon" ,
//        email:"john@gmail.com",
//        password:"12345"
//     })
//     await user.save();
//     res.send("ok");
// });

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.username,
    });
    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
