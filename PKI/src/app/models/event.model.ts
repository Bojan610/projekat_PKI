import { Review } from "./review.model";

export interface EventModel {
    id: string,
    image: string,
    title: string,
    price: number,
    description: string,
    reviews: Review[]
}