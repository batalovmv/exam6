
import { Product,StateData } from "./mainData";
import MD5 from "./MD5"
export class Generator {
  constructor() {

  }
  public calculateMD5Hash(input: string): string {

    const md5: string = MD5(input)

    return md5

  }

}
export let b = new Generator()
export function goldStrategy(product: Product) {
 return b.calculateMD5Hash("Gold-" + product.id)
}
export function silverStrategy(product: Product) {
return  b.calculateMD5Hash("Silver-" + product.id)
}
export function bronzeStrategy(product: Product) {
  return b.calculateMD5Hash("Bronze-" + product.id)
}




export class ProductStatus {
  public strategy: any
  public product: Product
  constructor(strategy: any, Product: Product) {

    this.strategy = strategy
    this.product = Product
  }
  setAnimal(product: Product) {
    this.product = product
  }
  changing() {
    return this.strategy(this.product)
  }
}


export function newCode(id:number) {
  let a = new StateData(Number(id))
  let strategy
  if (a.price > 0, a.price < 500) {
    strategy = bronzeStrategy
  } else if (a.price >= 500, a.price < 1000) {
    strategy = silverStrategy
  } else if (a.price >= 1000) {
    strategy = goldStrategy
  }
  const productLlv = new ProductStatus(strategy, a)
 return  productLlv.changing()
}
