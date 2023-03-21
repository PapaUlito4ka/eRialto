import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({
        length: 64,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        length: 256,
        nullable: false,
    })
    passwordHash: string;

    @Column({
        length: 256,
        nullable: false
    })
    salt: string;
}

export default User;
