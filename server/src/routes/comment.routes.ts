import comments from "@/model/comments"
import express, { Request, Response } from "express"
const router = express.Router()

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const commentDb = await comments.find({ to: id })
  return res.json({ comments: commentDb })
})

router.post("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const content = req.body?.content;
  if (!content) return res.status(400).json({ message: "content not found" })
  const myComment = new comments({ content, to: id })
  await myComment.save()
  return res.json({ message: "success", myComment })
})

router.patch("/like/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const dbRes = await comments.updateOne({ _id: id }, { $inc: { likes: 1 } })
  if (dbRes.modifiedCount > 0) return res.json({ message: "success", id })
  res.status(400).json({ message: "falied", id })
})


export default router
