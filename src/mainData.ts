abstract class IProduct {
  id: number;
  name: string;
  price: number;
  honoraryСode?: any;
  state?: State;
}

class Product extends IProduct {
  constructor(id: number, name: string, price: number) {
    super()
    this.id = id
    this.name = name
    this.price = price
    this.state.name = 'base'

  }
}

abstract class State {
  public name: string
  protected stateData: StateData;
  public setDocument(document: StateData): void {
    this.stateData = document;
  }
  public abstract raisePrice(): void;
  public abstract setUp(): void;
  public abstract setOff(): void;
  public abstract giveToTheWinner(): void;
}

class StateData extends IProduct {
  constructor(id: number) {
    super()
    this.id = id
    this.name = products[id - 1].name
    this.price = products[id - 1].price
    if (this.state.name === 'sold') {
      this.state = new SoldState();
    } else if (this.state.name === 'forSale') { this.state = new ForSaleState() }
    else if (this.state.name === 'inStock') { this.state = new InStockState() }
    else { this.state = new InStockState() }
    products[id - 1].state = this.state
    this.changeState(this.state)


  }
  public changeState(state: State): void {
    this.state = state;
    this.state.setDocument(this);
  }
  // public changeStringState(state: string): void {
  //   this.stringState = state
  //   products[this.id - 1].stringState = this.stringState
  // }
  public raise(): void {
    this.state.raisePrice();
  }
  public up(): void {
    this.state.setUp();
  }
  public off(): void {
    this.state.setOff();
  }
  public winner(): void {
    this.state.giveToTheWinner();
  }
}

class InStockState extends State {
  public raisePrice(): void {
    console.log("Ошибка, товар еще не учавствует в торгах");

  }
  public setUp(): void {
    console.log('Успех, статус изменен на НА ТОРГАХ');
    this.stateData.changeState(new ForSaleState());


  }

  public giveToTheWinner(): void {
    console.log('Ошибка, нельзя отдаль победителю со склада');
  }
  public setOff(): void {
    console.log("Ошибка , нельзя снять с торгов продукт, который в них не участвует");
  }
}
class ForSaleState extends State {
  public raisePrice(): void {
    console.log("успешное повышение цены на продукт, поднять цену на продукт.");
  }
  public setUp(): void {
    console.log('ошибка, продукт не может быть повторно выставлен на торги.');
     }

  public giveToTheWinner(): void {
    if(this.stateData.price=== 0)console.log('Нельзя отдать продукт бесплатно');
    else this.stateData.changeState(new SoldState());
    
    
  }
  public setOff(): void {
    this.stateData.price = 0
    this.stateData.changeState(new InStockState());
  }
}
class SoldState extends State {
  public raisePrice(): void {
    console.log("Ошибка,  уже продан.");

  }
  public setUp(): void {
    console.log("Ошибка,  уже продан.");


  }

  public giveToTheWinner(): void {
    console.log("Ошибка,  уже продан.");
  }
  public setOff(): void {
    console.log("Ошибка , нельзя снять с торгов проданный продукт.");
  }
}





const apple = new Product(1, "Renault Magnum", 22);
const apple2 = new Product(2, "Volvo FH12", 11);
const apple3 = new Product(3, "DAF XF", 18);
const products: Product[] = [apple, apple2, apple3];




