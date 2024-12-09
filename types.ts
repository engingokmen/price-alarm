export interface IAlarm {
  id: number;
  price: number;
  type: "above" | "below";
  isDone: boolean;
}

export interface ICoin {
  symbol: string;
  price: number;
}
