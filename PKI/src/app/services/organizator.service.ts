import { Injectable } from "@angular/core";
import { Promotion } from "../models/promotion.model";
import { Event } from "../models/event.model";

@Injectable()
export class OrganizatorService {
    private promotions: Promotion[] = [];
    private events: Event[] = [];

    constructor() {
        this.promotions = [
            { id: '0', image: 'first_birthday_2.png', title: 'Prvi rođendan', description: 'Organizujte prvi rođendan sa nama!' },
            { id: '1', image: '18ti_rodjendan_2.jpg', title: 'Punoletstvo', description: 'Uz nas je svaki događaj za pamćenje!' },
            { id: '2', image: 'placeholder_img.jpg', title: '', description: '' }
        ];
        this.events = [
            { id: '0', image: 'first_birthday_2.png', title: 'Prvi rođendan', price: 10000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' },
            { id: '1', image: '18ti_rodjendan_2.jpg', title: 'Punoletstvo', price: 20000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' },
            { id: '2', image: 'vencanja_2.jpg', title: 'Venčanje', price: 100000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' },
            { id: '3', image: 'privatne_zurke.jpg', title: 'Privatna žurka', price: 20000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' },
            { id: '4', image: 'godisnjica.jpg', title: 'Godišnjica', price: 12000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' },
            { id: '5', image: 'happy_hour.jpg', title: 'Happy Hour', price: 5000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.' }
        ]
    }

   getPromotions() {
    return [...this.promotions];
   }

   getPromotionById(promotionId: string) {
    return this.promotions.find((promotion) => promotion.id === promotionId);
   }

   getEvents() {
    return [...this.events];
   } 

   getEventById(eventId: string) {
        return this.events.find((event) => event.id === eventId);
   }

   updatePromotion(promotionId: string, eventId: string, description: string):boolean {
        let event = this.getEventById(eventId);
        let promotion = this.getPromotionById(promotionId);

        if (event && promotion) {
            promotion.image = event.image;
            promotion.title = event.title;
            promotion.description = description;

            return true;
        } else {
            return false;
        }
   }
}
