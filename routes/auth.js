const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

// router.post("/register",async(req,res)=>{
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.username,
//     });
//     try{
//         const user = await newUser.save();
//         res.status(200).json(user);
//     }catch(err){
//         console.log(err);
//     }
// });
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login",async (req,res)=>{
    try{
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassowrd =  await bcrypt.compare(req.body.password,user.password);
        !validPassowrd && res.status(400).json("wrong password");

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
});
module.exports = router;
