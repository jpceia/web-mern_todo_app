import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum ActivityType {
    REGISTER = 'register',
    LOGIN = 'login',
    LOGOUT = 'logout',
    CREATE_ITEM = 'create_item',
    UPDATE_ITEM = 'update_item',
    DELETE_ITEM = 'delete_item'
}

@Entity('usershistory')
export class UserHistory {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    userId: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column({
        type: 'enum',
        enum: ActivityType,
    })
    activity: ActivityType;
}
