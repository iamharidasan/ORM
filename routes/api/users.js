const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../../middleware/auth")

const User = require("../../models/User")

// Get User
// GET /api/users
// @private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// Create User
// POST /api/users
// @public
router.post(
  "/",
  [
    check("email", "Email is Required").isEmail(),
    check("name", "Username is Required").not().isEmpty(),
    check("password", "Please enter a password of minimum length 8").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email: email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] })
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err
          }
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

//Login User
//POST /api/users/login
//@Public
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atlest 8 characters").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err
          } else {
            res.json({ token })
          }
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
