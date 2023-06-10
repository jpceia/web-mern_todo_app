import { EntitySchema } from "typeorm"

export default new EntitySchema({
    name: "Post",
    tableName: "post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        action: {
            type: "varchar"
        },
        date: {
            type: "datetime"
        }
    }
});
