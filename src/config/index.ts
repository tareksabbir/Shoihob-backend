import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') }) // cwd means current directory

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
  tokens: process.env.ACCESS_TOKEN_SECRET,
}
