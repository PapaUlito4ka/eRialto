import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { UserProfile } from './user-profile.entity';
import type { Product } from '../../products/entities/product.entity';
import { IsEmail } from 'class-validator';

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
    @IsEmail()
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

    @OneToOne('UserProfile', 'user', {
        nullable: false,
        onDelete: "CASCADE"
    })
    profile: UserProfile;

    @OneToMany('Product', 'user')
    products: Product[];
}

export default User;
