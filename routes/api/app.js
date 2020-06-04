const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const App = require("../../models/App")
const auth = require("../../middleware/auth")

// Get Apps
// GET /api/app/
// @Private
router.get("/", auth, async (req, res) => {
  try {
    const app = await App.find({ user: req.user.id }).select("-privateKey")
    if (!app) {
      return res.json({ msg: "Error No such app registered" })
    }
    res.json(app)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// Get App details by ID
// GET /api/app/:id
// @Private
router.get("/:id", auth, async (req, res) => {
  try {
    const app = await App.findById(req.params.id)
    if (!app) {
      return res.json({ msg: "Error No such app registered" })
    }
    res.json(app)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

//Post App details
//POST /api/app/
// @Private
router.post(
  "/",
  [
    auth,
    [
      check("appName", "App Name is required").not().isEmpty(),
      check("clientEmail", "Client Email is required").isEmail(),
      check("privateKey", "Private Key is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { appName, clientEmail, packageName, privateKey } = req.body
    const newKey = privateKey.replace(/\\n/g, "\n")
    try {
      const app = await App.findOne({ clientEmail: clientEmail })
      if (!app) {
        const appData = new App({
          user: req.user.id,
          appName: appName,
          packageName: packageName,
          clientEmail: clientEmail,
          privateKey: newKey,
        })
        await appData.save()
        res.json(appData)
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
