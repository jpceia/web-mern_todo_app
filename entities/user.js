import { EntitySchema } from "typeorm"

export default new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        provider: {
            type: "enum",
            enum: ["google", ""],
            default: ""
        },
        providerId: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: "varchar"
        }
    }
});
