// Purpose: Model for storing coin info in MongoDB.

import { Schema, model, Document } from 'mongoose';

export interface CoinInfo extends Document {
  name: string;
  symbol: string;
  rank: number;
  age: number; // in days
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number; // number exchanges on which the coin is listed
  markets: number; // number of markets on which the coin is listed
  pairs: number; // number of unique market coin is present
  allTimeHighUSD: number;
  circulatingSupply: number; // circulating supply of the coin
  totalSupply: number; // number of coins minted, including locked
  maxSupply: number; // maximum number of coins that can be minted
  categories: string[]; // array of category strings
  volume: number;
  cap: number;
}

const coinInfoSchema = new Schema<CoinInfo>(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    rank: { type: Number },
    age: { type: Number },
    png32: { type: String },
    png64: { type: String },
    webp32: { type: String },
    webp64: { type: String },
    exchanges: { type: Number },
    markets: { type: Number },
    pairs: { type: Number },
    allTimeHighUSD: { type: Number },
    circulatingSupply: { type: Number },
    totalSupply: { type: Number },
    maxSupply: { type: Number },
    categories: { type: [String] },
    volume: { type: Number },
    cap: { type: Number },
  },
  {
    timestamps: true,
  }
);

// model definition
const CoinInfoMongoModel = model<CoinInfo>('CoinInfo', coinInfoSchema);

export default CoinInfoMongoModel;
