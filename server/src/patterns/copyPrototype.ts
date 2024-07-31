import { Card } from "../data/models/card";

export default class CardPrototype {
    public name;
    public description;

    constructor (name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public clone () {
        let card = new Card('', '');

        card.name = this.name;
        card.description = this.description;

        return card;
    }
}