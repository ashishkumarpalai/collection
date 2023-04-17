const express = require("express")
const { userModel } = require("../model/user.model")
const { blacklistModel } = require("../model/blacklist.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userRouter = express.Router()

//...............registration..................
userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let alldata = await userModel.find({ email })
        if (alldata.length > 0) {
            res.send({ "msg": "email is alredy presend in database" })
        } else {
            bcrypt.hash(password, 5, async function (err, hash) {
                if (err) {
                    console.log(err)
                    res.send({ "msg": "something went wrong", "error": err.message })
                } else {
                    const user = new userModel({ username, email, password: hash })
                    await user.save()
                    res.send({ "msg": "New user has been registered" })
                }

            });
        }


    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }

})

//...........Login................
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id },  process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.send({ "msg": "Login successful", "token": token })
                } else {
                    res.send({"msg":"wrong credentials"})
                }
            });

        } else {
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }

})



//...............logout.............
userRouter.post('/logout', async (req, res) => {
    try {
      // Add token to blacklist collection
      const token = req.headers.authorization
      const blacklistedToken = new blacklistModel({ token });
      await blacklistedToken.save();
  
      res.status(200).send('Logged out successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


module.exports = { userRouter }