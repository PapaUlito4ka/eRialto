import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type User from './user.entity';

@Entity({
    name: 'users_profiles'
})
export class UserProfile {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @OneToOne('User', 'profile', {
        nullable: false
    })
    @JoinColumn()
    user: User;

    @Column({
        length: 64,
        nullable: false
    })
    firstname: string;

    @Column({
        length: 64,
        nullable: false,
    })
    lastname: string;
}

export default UserProfile;
