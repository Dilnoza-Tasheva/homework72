export interface IPizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export type IPizzaMutation = Omit<IPizza, 'id'>

export interface PizzasList {
  [id: string]: IPizzaMutation
}

export interface PizzaCart {
  pizza: IPizza;
  amount: number;
}