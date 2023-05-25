import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { UserProfile } from './user-profile.entity';
import type { Product } from '../../products/entities/product.entity';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';

@Entity({
    name: 'users'
})
export class User {

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

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
    @Exclude()
    passwordHash: string;

    @Column({
        length: 256,
        nullable: false
    })
    @Exclude()
    salt: string;

    @OneToOne('UserProfile', 'user', {
        nullable: false,
        onDelete: "CASCADE"
    })
    profile: UserProfile;

    @OneToMany('Product', 'user', {
        onDelete: "CASCADE"
    })
    products: Product[];
}

export default User;
