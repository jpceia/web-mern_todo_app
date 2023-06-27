import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    createDate: Date;

    @Column()
    date: Date;

    @Column()
    category: string;

    @Column()
    value: number;

    @Column({ nullable: true })
    description: string;
}
