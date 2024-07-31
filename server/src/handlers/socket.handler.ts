import { Server, Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { Database } from "../data/database";
import { ReorderService } from "../services/reorder.service";
import ReorderServiceProxy from "../patterns/proxyPattern";
import { ConsoleLogger, FileLogger, LoggerPublisher, publisher } from "../patterns/observer";

abstract class SocketHandler {
  protected db: Database;

  protected reorderService: any;

  protected io: Server;

  public publisher

  public constructor(io: Server, db: Database, reorderService: ReorderService) {
    this.io = io;
    this.db = db;
    //! todo
    this.publisher = publisher

    this.reorderService = new ReorderServiceProxy();
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
