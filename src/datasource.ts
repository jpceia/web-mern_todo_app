import { DataSource } from "typeorm";
import Expense from "./entities/expense.js";
import User from "./entities/user.js";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from './constants.js';

const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    //port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [Expense, User],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {"rejectUnauthorized":true}
    }
})

export { AppDataSource }
