// Purpose: Interface for the Coin Data Sources.

import ICoinData from '../models/ICoinData';

interface ICoinDataSource {
  getCoinData(): Promise<ICoinData[]>;
}

export default ICoinDataSource;
