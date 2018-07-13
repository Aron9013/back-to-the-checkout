import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    public items: Array<Item> = [];
    public cart: Array<Item> = [];
    public cartTotal: number = 0;

    public totalA: number = 0;
    public totalB: number = 0;
    public totalC: number = 0;
    public totalD: number = 0;

    public cartContentTotal: number = 0;

    public showCartContents: boolean;

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                id: 'A',
                name: 'Grapefruit Quarter',
                price: 0.5,
                offer: '3 for £1.30',
                offerPrice: 1.30
            },
            {
                id: 'B',
                name: 'Supreme Mushroom',
                price: 0.3,
                offer: '2 for £0.45',
                offerPrice: 0.45
            },
            {
                id: 'C',
                name: 'Cube of Bison',
                price: 3.2
            },
            {
                id: 'D',
                name: 'Delectable Cheese',
                price: 1.15
            },
        ]
    }

    public addToCart(id, price): void {
        this.cart = this.cart.concat({ id, name, price });
        this.cartTotal += this.cart[this.cart.length - 1].price;

        switch (id) {
            case 'A':
                this.totalA++;
                break;
            case 'B':
                this.totalB++;
                break;
            case 'C':
                this.totalC++;
                break;
            case 'D':
                this.totalD++;
                break;
        }

        if (this.totalA % 3 === 0 && id === 'A') {
            this.cartTotal = this.cartTotal - (this.items[0].price * this.totalA) + (this.items[0].offerPrice * (this.totalA / 3));
        }

        if (this.totalB % 2 === 0 && id === 'B') {
            this.cartTotal = this.cartTotal - (this.items[1].price * this.totalB) + (this.items[1].offerPrice * (this.totalB / 2));
        }

        this.cartContentTotal = this.totalA + this.totalB + this.totalC + this.totalD
    }

    public resetCart(): void {
        this.totalA = 0;
        this.totalB = 0;
        this.totalC = 0;
        this.totalD = 0;
        this.cartContentTotal = 0;
        this.cartTotal = 0;
    }

    public showCart(): void {
        this.showCartContents = true;
    }

    public closeCart(): void {
        this.showCartContents = false;
    }

}
