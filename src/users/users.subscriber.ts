import { Connection, EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { ReviewsService } from "src/reviews/reviews.service";
import { User } from "src/users/entities/user.entity";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        private readonly connection: Connection,
        private reviewsService: ReviewsService
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async afterLoad(user: User): Promise<void> {
        user.avgRating = await this.reviewsService.computeUserAvgRating(user.id);        
    }
}