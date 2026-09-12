import "dotenv/config"
import express, { Request, Response } from "express"
import mongoose from "mongoose"
import env from "./config/env"
import errHandler from "./middleware/errorMiddleware"
import cors from "cors"
import { Cluster } from "puppeteer-cluster"
import { Page } from "puppeteer"
import user from "./model/user"


const cluster = await Cluster.launch({
  concurrency: Cluster.CONCURRENCY_PAGE,
  maxConcurrency: 10,
  monitor: false,
  retryLimit: 2,
  retryDelay: 1000,
  puppeteerOptions: {
    headless: true,
    defaultViewport: null
  }
})

mongoose.connect(env.DB_URL).then(() => console.log("Connected to DB")).catch(() => console.log("Cannot connect to DB"))



const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (_req: Request, res: Response) => res.json({ message: "hello world! welcome to red flag" }))

app.post("/user/add", async (req: Request, res: Response) => {
  const username = req.body?.username;
  const name = req.body?.name;
  if (!username || !name) return res.status(400).json({ message: "invalid body" })
  const oldUser = await user.findOne({ username })
  if (oldUser) return res.status(400).json({ message: "user already exits", username })
  const url = `https://www.instagram.com/${username}/`
  cluster.queue(async ({ page }: { page: Page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const imageUrl = await page.evaluate(() => {
      const image = document.querySelector("img")
      return image?.src
    })
    if (!imageUrl) return res.status(404).json({ message: "instagram profile not found" })
    const newUser = new user({ name, username, imageUrl })
    await newUser.save()
  });
  res.json({ message: "success", })
})

app.get("/user/:username", async (req: Request, res: Response) => {
  const username = req.params.username
  const oldUser = await user.findOne({ username })
  res.json({ user: oldUser })
})


// app.get("/user/search/:name", (req: Request, res: Response) => {
//   const name = req.params.name
// })
//

app.patch("/user/redflag/:username", async (req: Request, res: Response) => {
  const username = req.params.username
  const myUserUpdate = await user.updateOne({ username }, { $inc: { redFlags: 1 } })
  if (myUserUpdate.modifiedCount == 0) return res.status(404).json({ message: "user not found" })
  return res.json({ message: "updated", username })
})

app.patch("/user/greenFlag/:username", async (req: Request, res: Response) => {
  const username = req.params.username
  const myUserUpdate = await user.updateOne({ username }, { $inc: { greenFlags: 1 } })
  if (myUserUpdate.modifiedCount == 0) return res.status(404).json({ message: "user not found" })
  return res.json({ message: "updated", username })
})



app.get("/users", async (req: Request, res: Response) => {
  const cursor = req.query.cursor
  if (!cursor) {
    let hasNext = false
    const users = await user.aggregate([
      {
        $sort: { "createdAt": 1 }
      },
      {
        $limit: 11
      }
    ])
    if (users[10]) {
      hasNext = true
      users.pop()
    }
    return res.json({ users, hasNext })
  } else {
    let hasNext = false
    const users = await user.aggregate([
      {
        $match: { _id: { $gt: cursor } }
      },
      {
        $sort: { "createdAt": 1 }
      },
      {
        $limit: 11
      }
    ])
    if (users[10]) {
      hasNext = true
      users.pop()
    }
    return res.json({ users, hasNext })
  }
})


app.use(errHandler)

app.listen(3000, () => console.log("Server on port 3000"))
