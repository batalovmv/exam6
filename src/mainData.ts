import * as readlineSync from "readline-sync";
import MD5 from "./MD5";
import { goldStrategy, bronzeStrategy, silverStrategy, ProductStatus, newCode } from "./strategy";
abstract class IProduct {
  id: number
  name: string
  price: number
  honoraryСode: string
  state: State
  stringState: string
}

export class Product extends IProduct {

  constructor(id: number, name: string, price: number) {
    super()
    this.id = id
    this.name = name
    this.price = price
    this.stringState = 'on base'
    this.honoraryСode = 'none'

  }
}

abstract class State {

  public stateData!: StateData;
  public setDocument(document: StateData): void {
    this.stateData = document;
  }
  public abstract raisePrice(price: number): void;
  public abstract setUp(): void;
  public abstract setOff(): void;
  public abstract giveToTheWinner(): void;
}

export class StateData extends IProduct {
  constructor(id: number) {
    super()
    this.id = id
    this.name = products[id - 1].name
    this.price = products[id - 1].price
    this.stringState = products[id - 1].stringState
    this.honoraryСode = products[id - 1].honoraryСode
    if (this.stringState === 'sold') {
      this.state = new SoldState();
    } else if (this.stringState === 'sale') { this.state = new ForSaleState() }
    else if (this.stringState === 'stock') { this.state = new InStockState() }
    else { this.state = new InStockState() }
    products[id - 1] = this
    this.changeState(this.state)
    products[id - 1].honoraryСode = this.honoraryСode
  



  }
  public changeState(state: State): void {
    this.state = state;
    this.state.setDocument(this);
  }
  public changeStringState(state: string): void {
    this.stringState = state
    products[this.id - 1].stringState = this.stringState
  }
  public changeCode(code: string) {
    this.honoraryСode = code
    products[this.id - 1].honoraryСode = this.honoraryСode
  }
  public changePrice(price: number) {
    this.price = this.price + price
  }
  public raise(price?: number): void {
    this.state.raisePrice(price);
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
    this.stateData.changeStringState('sale')
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
  public raisePrice(price: number): void {
    console.log("успешное повышение цены на продукт, поднять цену на продукт.");
    this.stateData.changePrice(price)
  }
  public setUp(): void {
    console.log('ошибка, продукт не может быть повторно выставлен на торги.');
  }

  public giveToTheWinner(): void {
    if (this.stateData.price === 0) console.log('Нельзя отдать продукт бесплатно');
    else {
            this.stateData.changeStringState('sold')
      this.stateData.changeState(new SoldState())
      this.stateData.changeCode(newCode(this.stateData.id))
      console.log(this.stateData.honoraryСode);
  
    }
  }
  public setOff(): void {
    this.stateData.price = 0
    this.stateData.changeStringState('stock')
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

const apple = new Product(1, "Rapple", 500);
const apple2 = new Product(2, "samsung", 100);
const apple3 = new Product(3, "xiaomi", 999999);
const products: Product[] = [apple, apple2, apple3];
function trucksLog() {
  products.forEach(element => {
    console.log(`${element.id} | ${element.name} | ${element.price} | ${element.stringState} |  ${element.honoraryСode}`)
  });
}
function trucksLogId(id: number) {
  if (id <= products.length && id > 0) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        console.log(`${products[i].id} | ${products[i].name} | ${products[i].price} | ${products[i].stringState}`)
        break
      }
    }

  } else {
    console.log('Введено неправильное число');

  }
}











for (let i: boolean = false; i === false;) {
  const menu = Number(readlineSync.question('1.Показать все товары\n2.Показать данные товара по id\n3.Произвести манипуляции с товаром\n5.Завершить программу\n '))
  switch (menu) {
    case 1:
      trucksLog()
      break;
    case 2:
      const idNumber = Number(readlineSync.question('Введите id товара\n '))
      trucksLogId(idNumber)
      console.log(products[idNumber - 1]);
      break;
    case 3:
      const changeState = readlineSync.question('Введите id  и желаемый статус ( raise , up , off , winner ) через пробел\n ')
      const newWords = changeState.trim().replace(/\s+/g, ' ').split(' ')
      if (Number(newWords[0]) > 0 && Number(newWords[0]) <= products.length && typeof Number(newWords[0]) as 'number') {
        let a = new StateData(Number(newWords[0]))
        

        if (newWords[1] === 'raise') {
          const changePrice = Number(readlineSync.question('Введите цену\n '))
          if (changePrice > 0) {
            a.raise(changePrice)
            console.log('Цена повышена на '+changePrice);
            
          }else{
            console.log('Введено меньше нуля или не число');
            
          }
          console.log('Вы выбрали raise');

        } else if (newWords[1] === 'up') {
          console.log('Вы выбрали up');
          a.up()
        } else if (newWords[1] === 'off') {
          console.log('Вы выбрали off');
          a.off()
        } else if (newWords[1] === 'winner') {
          console.log('Вы выбрали winner');
          a.winner()
        } else {

          console.log('Некорректный ввод действия');
        }
        break
      } else {
        console.log('Некорректный ввод');
        break
      }
    // case 4:
    //   trucks.push(newTruck())
    //   console.log('Успешно сгенерирован новый водитель');

    //   break
    case 5:
      i = true
      break;
    default:
      console.log('Введеное число не найдено в меню');
      break

  }
}







