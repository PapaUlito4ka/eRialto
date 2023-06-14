import { Connection, EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { ReviewsService } from "src/reviews/reviews.service";
import UserProfile from "src/users/entities/user-profile.entity";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
@EventSubscriber()
export class UserProfileSubscriber implements EntitySubscriberInterface<UserProfile> {
    constructor(
        private readonly connection: Connection,
        private reviewsService: ReviewsService
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return UserProfile;
    }

    async afterLoad(userProfile: UserProfile): Promise<void> {
        userProfile.avgRating = await this.reviewsService.computeUserAvgRating(userProfile.id);        
    }
}