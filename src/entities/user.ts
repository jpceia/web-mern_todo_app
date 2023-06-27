import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm"

export enum ProviderType {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    DEFAULT = ''
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ProviderType,
        default: ProviderType.DEFAULT
    })
    provider: ProviderType;

    @Column()
    providerId: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    profileImg: string;
}
