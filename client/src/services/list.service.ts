import { ListEvent } from "../common/enums/list-event.enum"
import { socket } from "../context/socket"

export const listService = {
    create (name: string) {
        socket.emit(ListEvent.CREATE, name)
    }
}