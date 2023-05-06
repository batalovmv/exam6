import * as readlineSync from "readline-sync"
import { trucksLog, trucksLogId, products, StateData } from "./mainData"


for (let i: boolean = false; i === false;) {
  const menu = Number(readlineSync.question('1.Показать все товары\n2.Показать данные товара по id\n3.Произвести манипуляции с товаром\n4.Завершить программу\n '))
  switch (menu) {
    case 1:
      trucksLog()
      break
    case 2:
      const idNumber = Number(readlineSync.question('Введите id товара\n '))
      trucksLogId(idNumber)
      break
    case 3:
      const changeState = readlineSync.question('Введите id  и желаемый статус ( raise , up , off , winner ) через пробел\n ')
      const newWords = changeState.trim().replace(/\s+/g, ' ').split(' ')
      if (Number(newWords[0]) > 0 && Number(newWords[0]) <= products.length && typeof Number(newWords[0]) as 'number') {
        let a = new StateData(Number(newWords[0]))


        if (newWords[1] === 'raise') {
          const changePrice = Number(readlineSync.question('Введите цену\n '))
          if (changePrice > 0) {
            a.raise(changePrice)
            console.log('Цена повышена на ' + changePrice)

          } else {
            console.log('Введено меньше нуля или не число')

          }
          console.log('Вы выбрали raise')

        } else if (newWords[1] === 'up') {
          console.log('Вы выбрали up')
          a.up()
        } else if (newWords[1] === 'off') {
          console.log('Вы выбрали off')
          a.off()
        } else if (newWords[1] === 'winner') {
          console.log('Вы выбрали winner')
          a.winner()
        } else {

          console.log('Некорректный ввод действия')
        }
        break
      } else {
        console.log('Некорректный ввод')
        break
      }
    case 4:
      i = true
      break
    default:
      console.log('Введеное число не найдено в меню')
      break

  }
}