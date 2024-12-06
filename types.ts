interface IAlarm {
  id: number;
  price: number;
  type: "above" | "below";
}

interface ICoin {
  symbol: string;
  price: number;
}
