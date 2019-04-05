const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const router = express.Router();
var error='';
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        error=err.errors.email.message;
        console.log(err.errors.email.message);
        // res.status(201).json({
        //   message: "User created!",
        //   result: err.errors.email.message
        // });
      });
    // user.save(function (err) {
    //   console.log(err.errors); 
    // });
    if(error){
        res.status(201).json({
          message:error
        });
      }
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        fetchedUser = user;
       bcrypt.compare(req.body.password, user.password)
      .then(function(rese) {
          error= rese;
    })
    .catch(err => {
      console.log(err);
     });
    ;
      if (error) {
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "Auth success"
      });
    }else{
      res.status(200).json({
        message: error
      });
    }
      }else{
        res.status(200).json({
          message: 'efailure'
        });

      }
    })
    .catch(err => {
      res.status(200).json({
        
        message: error
      });
     });
    // .then(result => {
    //   if (!result) {
    //     throw new Error(res.status(402).json({
    //       message: "Auth failed error password"
    //     }));
    //   }
    //   const token = jwt.sign(
    //     { email: fetchedUser.email, userId: fetchedUser._id },
    //     "secret_this_should_be_longer",
    //     { expiresIn: "1h" }
    //   );
    //   res.status(200).json({
    //     token: token,
    //     expiresIn: 3600,
    //     message: "Auth success"
    //   });
    // })
 
});

module.exports = router;
