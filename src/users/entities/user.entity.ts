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
        nullable: false
    })
    email: string;

    @Column({
        length: 256,
        nullable: false
    })
    password: string;
}
