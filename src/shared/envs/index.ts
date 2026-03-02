import { cleanEnv, num, str } from 'envalid'
import * as dotenv from 'dotenv'

dotenv.config()

export const ENV = cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development', choices: ['development', 'production', 'test'] }),
    SWAGGER_USERNAME: str(),
    SWAGGER_PASSWORD: str(),
    PORT: num({ default: 3000 }),
    // DB_CONNECTION: str(),
    // DB_USERNAME: str(),
    // DB_PASSWORD: str(),
    // DB_URI: str(),
})