import { EntitySchema } from "typeorm"

export default new EntitySchema({
    name: "Expense",
    tableName: "expenses",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
            type: "uuid"
        },
        userId: {
            type: "uuid"
        },
        date: {
            type: "datetime"
        },
        category: {
            type: "varchar"
        },
        value: {
            type: "decimal",
        },
        description: {
            type: "varchar",
            nullable: true
        }
    }
});
