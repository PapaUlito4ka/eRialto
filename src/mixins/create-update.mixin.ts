import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class CreateUpdateMixin {
    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;
}