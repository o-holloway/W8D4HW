import { v4 as uuidv4 } from 'uuid';

class Item {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string, id?: string) {
        this._id = id ? id : uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];

    constructor(name: string, age: number, cart?: Item[], id?: string) {
        this._id = id || uuidv4();
        this._name = name;
        this._age = age;
        this._cart = cart || [];
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get cart(): Item[] {
        return this._cart;
    }

    set cart(value: Item[]) {
        this._cart = value;
    }

    addToCart(item: Item): void {
        this._cart.push(item);
    }

    removeFromCart(item: Item): void {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
    }

    removeQuantityFromCart(item: Item, quantity: number): void {
        let count = 0;
        this._cart = this._cart.filter(cartItem => {
            if (cartItem.id === item.id && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }

    cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }
}
class Shop {
    private _items: Item[];

    constructor() {
        this._items = [];
        this.addItem(new Item("Fork", 10, "Stainless-steel fork"));
        this.addItem(new Item("Hatchet", 84, "Best quality hatchet"));
        this.addItem(new Item("Water Jug", 33, "Insulated water jug"));
    }

    get items(): Item[] {
        return this._items;
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    removeItem(item: Item): void {
        this._items = this._items.filter(shopItem => shopItem.id !== item.id);
    }
}

function printCart(user: User): void {
    if (user.cart.length === 0) {
        console.log("The cart is empty.");
        return;
    }

    console.log("Cart Contents:");
    user.cart.forEach((item, index) => {
        console.log(`${index + 1}. Name: ${item.name}, Price: ${item.price}, Description: ${item.description}`);
    });
}

const shop = new Shop();

const axel = new User('Axel Robles', 30);

//add 2 forks, 1 hatchet and 1 jug
axel.addToCart(shop.items[0]);
axel.addToCart(shop.items[0]);
axel.addToCart(shop.items[1]);
axel.addToCart(shop.items[2]);
printCart(axel);

//remove the hatchet
axel.removeFromCart(shop.items[1]);
printCart(axel);

//remove 1 of the 2 forks
axel.removeQuantityFromCart(shop.items[0], 1);
printCart(axel);