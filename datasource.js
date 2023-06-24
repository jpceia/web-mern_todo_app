import { DataSource } from "typeorm";
import Todo from "./entities/todo.js";
import User from "./entities/user.js";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE} from './constants.js';

const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    //port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    synchronize: false,
    logging: true,
    entities: [Todo, User],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {"rejectUnauthorized":true}
    }
})

export { AppDataSource }
