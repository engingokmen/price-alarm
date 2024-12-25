export interface IAlarm {
  _id?: string;
  price: number;
  type: "above" | "below";
  isDone: boolean;
}

export interface ICoin {
  symbol: string;
  price: number;
}
