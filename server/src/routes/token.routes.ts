import anonymus from "@/model/anonymus"
import express, { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import env from "../config/env"
const router = express.Router()

router.get("/new", async (req: Request, res: Response) => {
  const newAnonymus = new anonymus({})
  await newAnonymus.save()
  const id = newAnonymus.id
  const token = jwt.sign({ id }, env.TOKEN_SECRET)
  res.cookie("token", token, { httpOnly: true })
  return res.json({ message: "new token saved" })
})

router.get("/data", async (req: Request, res: Response) => {
  const token = req.cookies.token
  if (!token) return res.status(400).json({ message: "access token not found" })
  try {
    const decode = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload
    const id = decode.id
    const myAnonymus = await anonymus.findById(id)
    if (!myAnonymus) {
      res.clearCookie("token")
      return res.status(400).json({ message: "Something went wrong in token" })
    }
    return res.json({ redFlags: myAnonymus?.redFlags, greenFlags: myAnonymus?.greenFlags, likedComments: myAnonymus?.likedComments })
  } catch (error) {
    res.clearCookie("token")
    return res.status(400).json({ message: "Something went wrong in token" })
  }
})

export default router
