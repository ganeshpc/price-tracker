// Purpose: DAO for Coin Data.
interface ICoinData {
  id?: string;
  name: string;
  symbol: string;
  price: number;
  createdAt?: Date;
}

export default ICoinData;
