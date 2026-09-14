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



app.get("/users", async (req: Request, res: Response) => {
  const id = req.query.id
  const flag = req.query.flag
  const limit = 5
  if (!flag) {
    let hasNext = false
    const users = await user.aggregate([
      {
        $sort: {
          redFlags: -1,
          id: -1
        }
      },
      {
        $limit: limit + 1
      }
    ])
    if (users[limit]) {
      hasNext = true
      users.pop()
    }
    return res.json({ users, hasNext })
  }
  if (typeof id != "string") return res.status(400).json({ message: "id not found" })
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "invalid id" })
  const redFlag = Number(flag)
  if (Number.isNaN(redFlag)) return res.status(400).json({ message: "invalid flag" })
  let hasNext = false
  const users = await user.aggregate([
    {
      $match: { $or: [{ id: { $lt: new mongoose.Types.ObjectId(id) }, redFlags: redFlag }, { redFlags: { $lt: redFlag } }] },
    },
    {
      $sort: {
        redFlags: -1,
        id: -1
      }
    },
    {
      $limit: limit + 1
    }
  ])
  if (users[limit]) {
    hasNext = true
    users.pop()
  }
  return res.json({ users, hasNext })
})




app.post("/user/add", async (req: Request, res: Response) => {
  const username = req.body?.username;
  const name = req.body?.name;
  if (!username || !name) return res.status(400).json({ message: "invalid body" })
  const oldUser = await user.findOne({ username })
  if (oldUser) return res.status(400).json({ message: "user already exits", username })
  const url = `https://www.instagram.com/${username}/`
  cluster.queue(async ({ page }: { page: Page }) => {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const imageUrl = await page.evaluate(() => {
      const image = document.querySelector("img")
      return image?.src
    })
    if (!imageUrl) return res.status(404).json({ message: "instagram profile not found" })
    const newUser = new user({ name, username, imageUrl })
    await newUser.save()
    res.json({ message: "success", newUser })
  });
})

app.get("/user/:username", async (req: Request, res: Response) => {
  const username = req.params.username
  const oldUser = await user.findOne({ username })
  res.json({ user: oldUser })
})


app.get("/user/search/:name", async (req: Request, res: Response) => {
  const name = req.params.name
  const users = await user.aggregate([
    {
      $search: {
        index: "default",
        autocomplete: {
          query: name,
          path: "name",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 2,
          }
        }
      }
    },
    {
      $addFields: {
        searchScore: { $meta: "searchScore" }
      }
    },
    {
      $sort: {
        searchScore: -1,
        redFlags: -1
      }
    },
    {
      $limit: 10
    }
  ])
  res.json({ users })
})


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




app.use(errHandler)

app.listen(3000, () => console.log("Server on port 3000"))
