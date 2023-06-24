import { EntitySchema } from "typeorm"

export default new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
            type: "uuid"
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
        },
        profileImg: {
            type: "varchar"
        }
    }
});
