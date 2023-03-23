import { Min } from "class-validator";
import User from "src/users/entities/user-profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class Product {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    user: User;

    @Column({
        length: 128,
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    description: string;

    @Column({
        nullable: false,
    })
    @Min(1)
    price: Number;
}
