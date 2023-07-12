import { DataSource } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from './constants';

const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    //port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [__dirname + "/entities/**/*.ts"],
    migrations: [__dirname + "/migrations/**/*.ts"],
    subscribers: [],
    extra: {
        ssl: {"rejectUnauthorized":true}
    }
});

export { AppDataSource }
