const express = require("express")
const { google } = require("googleapis")
const androidpublisher = google.androidpublisher("v3")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")
const App = require("../../models/App")

// Get Reviews
// GET /api/rtr/:id
// @private
router.get("/:id", async (req, res) => {
  try {
    const app = await App.findById(req.params.id)
    if (!app) return res.status(400).json({ msg: "Bad Request" })

    var authClient = new google.auth.JWT(
      app.clientEmail,
      null,
      app.privateKey,
      ["https://www.googleapis.com/auth/androidpublisher"],
      null
    )
    await authClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err.message)
        return res.status(500).send("Server Err Auth")
      }
      androidpublisher.reviews.list(
        { auth: authClient, packageName: app.packageName },
        function (err, resp) {
          if (err) {
            console.log(err.message)
            return res.status(500).send("Package Error")
          }
          res.json(resp.data)
        }
      )
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// Get Review by ID
// GET /api/rtr/review/:id/:reviewid
// @private
router.get("/review/:id/:reviewid", async (req, res) => {
  try {
    const app = await App.findById(req.params.id)
    if (!app) return res.status(400).json({ msg: "Bad Request" })

    var authClient = new google.auth.JWT(
      app.clientEmail,
      null,
      app.privateKey,
      ["https://www.googleapis.com/auth/androidpublisher"],
      null
    )
    await authClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err.message)
        return res.status(500).send("Server Err Auth")
      }
      androidpublisher.reviews.get(
        {
          auth: authClient,
          packageName: app.packageName,
          reviewId: req.params.reviewid,
        },
        function (err, resp) {
          if (err) {
            console.log(err.message)
            return res.status(500).send("Package Error")
          }
          res.json(resp.data)
        }
      )
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// Post Review
// POST /api/rtr
// @private
router.post("/", auth, async (req, res) => {
  try {
    const { id, reviewid, reply } = req.body
    const app = await App.findById(id)
    if (!app) return res.status(400).json({ msg: "Bad Request" })

    var authClient = new google.auth.JWT(
      app.clientEmail,
      null,
      app.privateKey,
      ["https://www.googleapis.com/auth/androidpublisher"],
      null
    )
    await authClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err.message)
        return res.status(500).send("Server Err Auth")
      }
      androidpublisher.reviews.reply(
        {
          auth: authClient,
          packageName: app.packageName,
          reviewId: reviewid,
          requestBody: {
            replyText: reply,
          },
        },
        function (err, resp) {
          if (err) {
            console.log(err.message)
            return res.status(500).send("Package Error")
          }
          res.json(resp.data)
        }
      )
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
