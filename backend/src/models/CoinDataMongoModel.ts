import { Schema, model, Document } from 'mongoose';

interface CoinData extends Document {
  name: string;
  symbol: string;
  price: number;
}

const coinDataSchema = new Schema<CoinData>(
  {
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model definition
const CoinDataMongoModel = model<CoinData>('CoinData', coinDataSchema);

export default CoinDataMongoModel;
