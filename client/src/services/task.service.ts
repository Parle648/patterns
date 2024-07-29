import { CardEvent } from "../common/enums/card-event.enum"
import { socket } from "../context/socket"

export const taskService = {
    create (listId: string, taskName: string): void {
        socket.emit(CardEvent.CREATE, listId, taskName)
    },
    delete (listId: string, cardId: string): void {
        socket.emit(CardEvent.DELETE, {listId, cardId})
    }
}