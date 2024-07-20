// Purpose: DAO for Coin Data.
interface ICoinData {
  id?: string;
  name: string;
  symbol: string;
  price: number;
  timestamp?: Date;
}

export default ICoinData;
