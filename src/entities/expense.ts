import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm"

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    date: Date;

    @Column()
    category: string;

    @Column()
    value: number;

    @Column({ nullable: true })
    description: string;
}
