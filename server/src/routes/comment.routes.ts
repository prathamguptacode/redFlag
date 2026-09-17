import comments from "@/model/comments"
import express, { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import env from "../config/env"
import anonymus from "@/model/anonymus"

const router = express.Router()

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const commentDb = await comments.find({ to: id }).sort({ likes: "desc" })
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
  const token = req.cookies.token
  if (!token) return res.status(400).json({ message: "access token not found" })
  let id = ""
  try {
    const decode = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload
    id = decode.id
  } catch (error) {
    res.clearCookie("token")
    return res.status(400).json({ message: "Something went wrong in token" })
  }
  const idC = req.params.id;
  if (typeof idC != "string") return res.status(400).json({ message: "Invalid" })
  const likedComments = await anonymus.findById(id).select("likedComments")
  if (likedComments?.likedComments.includes(idC)) return res.status(403).json({ message: "already liked" })
  const dbRes = await comments.updateOne({ _id: idC }, { $inc: { likes: 1 } })
  if (dbRes.modifiedCount > 0) {
    await anonymus.updateOne({ _id: id }, { $push: { likedComments: idC } })
    return res.json({ message: "success", id })
  }
  res.status(400).json({ message: "falied", id })
})


export default router
