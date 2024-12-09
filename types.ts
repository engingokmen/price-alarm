export interface IAlarm {
  id: number;
  price: number;
  type: "above" | "below";
}

export interface ICoin {
  symbol: string;
  price: number;
}
