import { CardEvent } from "../common/enums/card-event.enum"
import { socket } from "../context/socket"

export const taskService = {
    create (listId: string, taskName: string) {
        socket.emit(CardEvent.CREATE, listId, taskName)
    }
}