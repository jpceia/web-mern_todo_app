import { DataSource } from "typeorm";
import Todo from "./entities/todo.js";
import { config } from 'dotenv';
config();


const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    //port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: true,
    entities: [Todo],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {"rejectUnauthorized":true}
    }
})

export { AppDataSource }
