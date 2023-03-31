import type UserProfile from "src/users/entities/user-profile.entity";
import type Product from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'images'
})
export class Image {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({
        length: 256,
        nullable: false
    })
    filename: String;

    @Column({
        length: 256,
        nullable: false
    })
    path: String;

    @OneToOne('User', 'image', {
        nullable: true,
        onDelete: "SET NULL"
    })
    @JoinColumn()
    userProfile: UserProfile;

    @ManyToOne('Product', 'images', {
        nullable: true,
        onDelete: "SET NULL"
    })
    product: Product;
}

export default Image;