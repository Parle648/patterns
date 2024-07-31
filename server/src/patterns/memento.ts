import { Database } from "../data/database";
import { List } from "../data/models/list";

const db = Database.Instance;

class Memento {
  public memo: string[] = [];
  public index: number = -1;

  public createMemo(lists: string) {
    this.memo.push(lists);
    
    this.index = this.memo.length - 1;
    console.log(this.index);
  }

  public memoBack() {
    if (this.index > 0) {
        this.index = this.index - 1;
    }
    JSON.parse(this.memo[this.index]).forEach(element => {
      console.log(element.cards)
    });
    db.setData(JSON.parse(this.memo[this.index]))
    this.memo.push(this.memo[this.index])
    // this.index = this.index + 1;
    return JSON.parse(this.memo[this.index]);
  }

  public memoAhead() {
    if (this.index < this.memo.length - 1) {
      this.index += 1;
    }
    return this.memo[this.index];
  }
}

const memoService = new Memento();
export { memoService };
