import { z } from "zod"

const envSchema = z.object({
  DB_URL: z.string()
})

const val = envSchema.safeParse(process.env)

if (!val.success) {
  console.error("ENV not valid")
  process.exit()
}

export default val.data
