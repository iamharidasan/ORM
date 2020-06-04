const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const auth = require("../../middleware/auth")
const Reply = require("../../models/Reply")

// Get All Replies
// GET /api/replies
// @Private
router.get("/", auth, async (req, res) => {
  try {
    const replies = await Reply.find({ user: req.user.id })
    res.json(replies)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})
// Get Single Reply
// GET /api/replies/:id
// @Private
router.get("/:id", auth, async (req, res) => {
  try {
    const replies = await Reply.findById(req.params.id)
    res.json(replies)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

// Post Reply
// POST /api/replies
// @Private
router.post(
  "/",
  [
    auth,
    [
      check("reply", "Reply is required").not().isEmpty(),
      check("review", "Review needs atleast one match").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    try {
      const { reply, review } = req.body
      const replyData = new Reply({
        user: req.user.id,
        reply: reply,
        review: review,
      })
      await replyData.save()
      res.json(replyData)
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

// Edit Reply
// PUT /api/replies/:id
// @Private
router.put(
  "/:id",
  [
    auth,
    [
      check("reply", "Reply is required").not().isEmpty(),
      check("review", "Review needs atleast one match").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { reply, review } = req.body
      const replyData = await Reply.findOneAndUpdate(
        { id: req.params.id },
        { $set: { reply: reply, review: review } },
        { new: true }
      )
      reply.json(replyData)
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
