import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateUpdateMixin } from "../../mixins/create-update.mixin";
import { Max, Min } from "class-validator";
import type User from "src/users/entities/user.entity";

@Entity({
    name: 'reviews'
})
export class Review extends CreateUpdateMixin {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({
        length: 256,
        nullable: false
    })
    body: string;

    @Column({
        nullable: false
    })
    @Min(0)
    @Max(5)
    rating: number;

    @ManyToOne('Product', {
        nullable: false,
        onDelete: "CASCADE"
    })
    fromUser: User;

    @ManyToOne('Product', {
        nullable: false,
        onDelete: "CASCADE"
    })
    toUser: User;
}

export default Review;