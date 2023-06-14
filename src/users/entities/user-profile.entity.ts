import { AfterLoad, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import type User from './user.entity';
import type Image from 'src/images/entities/image.entity';
import type Review from 'src/reviews/entities/review.entity';
import { CreateUpdateMixin } from '../../mixins/create-update.mixin';

@Entity({
    name: 'users_profiles'
})
export class UserProfile extends CreateUpdateMixin {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @OneToOne('User', 'profile', {
        nullable: false,
        onDelete: "CASCADE"
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

    @Column({
        length: 64,
        nullable: true,
    })
    phone: string;

    @OneToOne('Image', 'userProfile', {
        nullable: true,
        onDelete: "SET NULL"
    })
    image: Image;

    avgRating: number;
}

export default UserProfile;
