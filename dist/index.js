"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description, id) {
        this._id = id ? id : (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
class User {
    constructor(name, age, cart, id) {
        this._id = id || (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = cart || [];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
    addToCart(item) {
        this._cart.push(item);
    }
    removeFromCart(item) {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
    }
    removeQuantityFromCart(item, quantity) {
        let count = 0;
        this._cart = this._cart.filter(cartItem => {
            if (cartItem.id === item.id && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }
    cartTotal() {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }
}
class Shop {
    constructor() {
        this._items = [];
        this.addItem(new Item("Fork", 10, "Stainless-steel fork"));
        this.addItem(new Item("Hatchet", 84, "Best quality hatchet"));
        this.addItem(new Item("Water Jug", 33, "Insulated water jug"));
    }
    get items() {
        return this._items;
    }
    addItem(item) {
        this._items.push(item);
    }
    removeItem(item) {
        this._items = this._items.filter(shopItem => shopItem.id !== item.id);
    }
}
function printCart(user) {
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

axel.addToCart(shop.items[0]);
axel.addToCart(shop.items[0]);
axel.addToCart(shop.items[1]);
axel.addToCart(shop.items[2]);
printCart(axel);

axel.removeFromCart(shop.items[1]);
printCart(axel);

axel.removeQuantityFromCart(shop.items[0], 1);
printCart(axel);