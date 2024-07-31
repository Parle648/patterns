import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { lists } from "./assets/mock-data";
import { Database } from "./data/database";
import { CardHandler, ListHandler } from "./handlers/handlers";
import { ReorderService } from "./services/reorder.service";
import { MemoEvent } from "./common/enums/memo-event.enum";
import { ListEvent } from "./common/enums/list-event.enum";
import { memoService } from "./patterns/memento";

const PORT = 3005;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = Database.Instance;
const reorderService = new ReorderService();

if (process.env.NODE_ENV !== "production") {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db, reorderService).handleConnection(socket);
  new CardHandler(io, db, reorderService).handleConnection(socket);

  socket.on(MemoEvent.BACK, () => {
    // const memo = memoService.memoBack();

    socket.emit(ListEvent.UPDATE, memoService.memoBack())
  });
};

io.on("connection", onConnection);


httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

export { httpServer };
