import { Injectable } from "@angular/core";
import { Promotion } from "../models/promotion.model";
import { EventModel } from "../models/event.model";
import { CartItem } from "../models/cartItem.model";
import { Reservation } from "../models/reservation";
import { User } from "../models/user.model";
import { Review } from "../models/review.model";
import { Notification } from "../models/notification.model";
import { format } from "date-fns";

@Injectable({
    providedIn: 'root'
})
export class OrganizatorService {
    private promotions: Promotion[] = [];
    private events: EventModel[] = [];
    private cartItems: CartItem[] = []; 
    private aboutDescription = '';
    private reservations: Reservation[] = [];
    private notifications: Notification[] = [];

    constructor() {
        this.promotions = [
            { id: '0', image: 'first_birthday_2.png', title: 'Prvi rođendan', description: 'Organizujte prvi rođendan sa nama!' },
            { id: '1', image: '18ti_rodjendan_2.jpg', title: 'Punoletstvo', description: 'Uz nas je svaki događaj za pamćenje!' },
            { id: '2', image: 'placeholder_img.jpg', title: '', description: '' }
        ];

        this.events = [
            { id: '0', image: 'first_birthday_2.png', title: 'Prvi rođendan', price: 10000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [
                {
                    reviewId: '0', user: 'Pera P.', username: 'pera', rating: 4, comment: 'Proin mauris felis, interdum id tortor vel, feugiat dictum velit. Fusce commodo mi dolor, eget malesuada urna faucibus sed. Nullam tincidunt convallis porta. Sed facilisis ullamcorper dapibus.'
                },
                {
                    reviewId: '1', user: 'Zika Z.', username: 'zika', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada.'
                },
                {
                    reviewId: '2', user: 'Steva S.', username: 'steva', rating: 5, comment: 'Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.'
                },
                {
                    reviewId: '2', user: 'Bojan B.', username: 'steva', rating: 5, comment: 'Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla.'
                }   
                ] 
            },
            { id: '1', image: '18ti_rodjendan_2.jpg', title: 'Punoletstvo', price: 20000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [] },
            { id: '2', image: 'vencanja_2.jpg', title: 'Venčanje', price: 100000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [] },
            { id: '3', image: 'privatne_zurke.jpg', title: 'Privatna žurka', price: 20000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [] },
            { id: '4', image: 'godisnjica.jpg', title: 'Godišnjica', price: 12000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [] },
            { id: '5', image: 'happy_hour.jpg', title: 'Happy Hour', price: 5000, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.', reviews: [] }
        ];

        this.aboutDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate purus nec laoreet malesuada. Nam laoreet sagittis elit at volutpat. Ut leo urna, luctus et augue et, suscipit pulvinar sem. Nunc cursus arcu id fringilla fringilla. Cras ullamcorper ex ac nibh tincidunt, quis fringilla nibh molestie. Nam hendrerit quis odio fermentum consectetur. Vivamus vestibulum convallis felis, ut posuere velit mattis ut. Proin vel porttitor orci. Morbi aliquet blandit rhoncus. Morbi et tortor varius, rutrum odio vel, congue orci.';
    }

   getNotofications() {
    return this.notifications;
   }

   getPromotions() {
    return [...this.promotions];
   }

   getPromotionById(promotionId: string) {
    return this.promotions.find((promotion) => promotion.id === promotionId);
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

   getEvents() {
    return [...this.events];
   } 

   getEventById(eventId: string) {
        return this.events.find((event) => event.id === eventId);
   }

   removeEvent(eventId: string):boolean {
        this.events = this.events.filter(item => item.id !== eventId);
        return true;
   }

   updateEvent(eventToUpdate: EventModel) {
        if (eventToUpdate) {
            const index = this.events.findIndex(event => event.id === eventToUpdate.id);
            if (index !== -1) {
                this.events[index] = {...eventToUpdate};
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    getNextEventId(): string {
        const length = this.getEvents().length;
        return length.toString();
    }

    addEvent(event: EventModel):boolean {
        if (event) {
            this.events.push(event);
            return true;
        } else {
            return false;
        }
    }

    leaveReview(eventId:string, review: Review):boolean {
        const event = this.getEventById(eventId);
        if (event && review) {
            event.reviews.push(review);
            return true;
        } else {
            return false;
        }
    }

    getAboutDescription() {
        return this.aboutDescription;
    }

    addToCart(eventId: string): boolean {
        const event = this.getEventById(eventId);
        if (event) {
            const index = this.cartItems.length;
            this.cartItems.push({ itemId: index.toString(), eventId: event.id, eventImage: event.image, eventName: event.title, eventDate: undefined, numOfGuest: '' });
            return true;
        } else {
            return false;
        }
    }

    removeCartItem(cartItemId: string): boolean {
        this.cartItems = this.cartItems.filter(item => item.itemId !== cartItemId);
        return true;
    }

    getCartItems() {
        return [ ...this.cartItems ];
    }

    reserveEvent(cartItem: CartItem, user: User):boolean {
        if (cartItem && user) {
            const index = this.reservations.length;
            this.reservations.push({ reservationId: index.toString(), eventImage: cartItem.eventImage, eventName: cartItem.eventName, userReserved: user.firstName + ' ' + user.lastName, date: cartItem.eventDate!, numOfGuest: cartItem.numOfGuest, status: 'Na čekanju'});
            this.removeCartItem(cartItem.itemId);
            return true;
        } else {
            return false;
        }
    }

    getReservations() {
        return [ ... this.reservations ];
    }

    getReservationsOrg() {
        let retVal: Reservation[] = [];
        this.reservations.forEach((item) => {
           if (item.status === 'Na čekanju') {
            retVal.push(item);
           }
        });
        return retVal;
    }

    acceptReservation(user: User, res: Reservation): boolean {
        if (res && user) {
            res.status = "Odobreno";
            const index = this.notifications.length;
            this.notifications.push({ id: index!.toString(), user: user.firstName + ' ' + user.lastName, eventName: res.eventName, description: 'je prihvatio vašu rezervaciju za dogadjaj', date: format(new Date(), 'dd.MM.yyyy') + ' ⦁ ' + format(new Date(), 'HH:mm'), read: false });
            return true;
        } else {
            return false
        }
    }

    declineReseration(user:User, res: Reservation): boolean {
        if (res && user) {
            res.status = "Odbijeno";
            const index = this.notifications.length;
            this.notifications.push({ id: index!.toString(), user: user.firstName + ' ' + user.lastName, eventName: res.eventName, description: 'je odbio vašu rezervaciju za dogadjaj', date: format(new Date(), 'dd.MM.yyyy') + ' ⦁ ' + format(new Date(), 'HH:mm'), read: false });
            return true;
        } else {
            return false
        }
    }
}
