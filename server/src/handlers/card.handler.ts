import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";
import CardPrototype from "../patterns/copyPrototype";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this))
    socket.on(CardEvent.RENAME, this.changeCardTitle.bind(this))
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeCardDescription.bind(this))
    socket.on(CardEvent.CREATE_COPY, this.copyCard.bind(this))
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  // todo prototype
  public copyCard({cardDTO, listId}: {cardDTO: {name: string, description: string}, listId: string}): void {
    // PATTERN: PROTOTYPE
    const newCard = new CardPrototype(cardDTO.name, cardDTO.description).clone();
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }

  public deleteCard({listId, cardId}: {listId: string, cardId: string}): void {
    const lists = this.db.getData();

    const updatedLists = lists.map((list: any) => {
      if (list.id === listId) {
        return {...list, cards: list.cards.filter((card: any) => card.id !== cardId)}
      }
      return list;
    })

    this.db.setData(updatedLists);
    this.updateLists();
  }

  public changeCardTitle({newTitle, listId, cardId}: {newTitle: string, listId: string, cardId: string}): void {
    const lists = this.db.getData();
    
    const updatedLists = lists.map((list: any) => {
      if (list.id === listId) {
        return {...list, cards: list.cards.map(card => {
          if (card.id === cardId) {
            return {...card, name: newTitle}
          };
          return card;
        })}
      }
      return list;
    })

    this.db.setData(updatedLists);
    this.updateLists();
  }

  public changeCardDescription({newDescription, listId, cardId}: {newDescription: string, listId: string, cardId: string}): void {
    const lists = this.db.getData();
    
    const updatedLists = lists.map((list: any) => {
      if (list.id === listId) {
        return {...list, cards: list.cards.map(card => {
          if (card.id === cardId) {
            return {...card, description: newDescription}
          };
          return card;
        })}
      }
      return list;
    })

    this.db.setData(updatedLists);
    this.updateLists();
  }
}

export { CardHandler };
